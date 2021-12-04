import React,{useState} from 'react'
import axios from 'axios'
import MapPic from "mapmyindia-react";
import Loader from "../Loader/Loader"
import "./Map.css"
function Map(){
    const [address,setAddress]=useState("");
    const [markers,setMarkers]=useState([]);
    const [show,setShow]=useState(false)
    const[loading,showLoading]=useState(false);
    let m=[];
    async function map(){ 
      showLoading(true);
      const headers = {
        'Authorization': 'bearer c5f7c37e-a515-4885-9fe1-487c6214422e',
        'Access-Control-Allow-Origin':'*'
      };
      // const url1=`https://cors-anywhere.herokuapp.com/https://atlas.mapmyindia.com/api/places/geocode?address=${address}&itemCount=1`;
      const url1=`https://www.mapquestapi.com/geocoding/v1/address?location=${address}&key=NcG27UZidqWrA2IF3KgfrprI0enJ34aK`;
      

      const res1= await axios.get(url1);
      // let lat=res1.data.copResults.latitude;
      // let long=res1.data.copResults.longitude;
      console.log(res1);
      let lat=res1.data.results[0].locations[0].latLng.lat;
      let long=res1.data.results[0].locations[0].latLng.lng; 

      // const url2=`https://cors-anywhere.herokuapp.com/https://atlas.mapmyindia.com/api/places/nearby/json?keywords=pharmacy&refLocation=${lat}%2C${long}&page=1&region=IND&radius=10000`;
      const url2=`https://api.tomtom.com/search/2/categorySearch/medical store.JSON?key=tOfdDcItmcJUqbRnmMAUjjzIAFXoWlZN&lat=${lat}&lon=${long}`;

      const res2= await axios.get(url2)
      // let shops= res2.data.suggestedLocations;
      let shops= res2.data.results;

      shops.forEach(shop => {
        const marker={
          position:[shop.position.lat,shop.position.lon],
          draggable:false,
          title:shop.poi.name+" -> "+shop.address.freeformAddress
        }
        m.push(marker)
      });
      setMarkers([...m])
      setShow(true)
      showLoading(false);

      
    }
   
        
  
    return(
        <div className="map">
        
          <div id="addSearch"> 
        <input id="searchBox" placeholder="Enter address" onChange={(event)=>{setAddress(event.target.value)}}></input>
        <div class="seachIcon" onClick={map}><i class="fas fa-search"></i></div>
        </div>
        <div className="mapBox">
        {loading?<Loader />:
      show?<MapPic markers={markers}/>:<img src="https://www.mapmyindia.com/api/img/demo1.png" style={{width:"100%",height:"100%"}} />
        }
                
      </div>

        </div>
        
    );
}

export default Map;