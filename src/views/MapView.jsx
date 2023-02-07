import React from 'react'
import { useMapBox } from '../hooks/useMapBox';


const initialPoint={
  lat: 5.0671308,
  lng: -75.5200899,
  zoom: 15,
}

export const MapView = () => {
  const {coords,setRef} = useMapBox(initialPoint)

  return (
    <>
      <div className='info-map'>
        Lng: {coords.lng} | Lat : {coords.lat} | zoom: {coords.zoom}
      </div>
      <div 
        ref={setRef}
        className='map-container'
      />
    </>
  )
}
