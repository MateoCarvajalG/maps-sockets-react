import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'


mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FzcGVydGVvOSIsImEiOiJjbGNnYWZxYW01cG1yM3Ftc21reXFhazcwIn0.UFxYbh78gTEwImeFchwiJg';

const initialPoint={
  lat: 5.0671308,
  lng: -75.5200899,
  zoom: 15,
}

export const MapView = () => {
  const mapDiv = useRef()
  const [map,setMap]=useState()
  const [coords, setCoords] = useState(initialPoint)

  useEffect(()=>{
    const map = new mapboxgl.Map({
      container: mapDiv.current, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [initialPoint.lng,initialPoint.lat], // starting position [lng, lat]
      zoom: initialPoint.zoom, // starting zoom
    });

    setMap(map)
  },[])


  return (
    <>
      <div 
        ref={mapDiv}
        className='map-container'
      />
    </>
  )
}
