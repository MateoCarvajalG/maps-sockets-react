import React, { useEffect } from 'react'
import { useMapBox } from '../hooks/useMapBox';


const initialPoint={
  lat: 5.0671308,
  lng: -75.5200899,
  zoom: 15,
}

export const MapView = () => {
  const {coords,setRef,newMarker$,movementMarker$} = useMapBox(initialPoint)
  
  // * nuevo marcador
  useEffect(() => {
    newMarker$.subscribe(marker =>{
      //TODO: emitir el nuevo marcador (sockets)
    })
  }, [newMarker$])
  
  useEffect(() => {
    movementMarker$.subscribe(marker =>{
      //TODO: emitir el movimiento del marcador (sockets)
    })
  }, [movementMarker$])
  

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
