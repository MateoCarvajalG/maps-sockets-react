import React, { useContext, useEffect } from 'react'
import { useMapBox } from '../hooks/useMapBox';
import { SocketContext } from '../context/SocketContext';


const initialPoint={
  lat: 5.0671308,
  lng: -75.5200899,
  zoom: 15,
}

export const MapView = () => {
  const {coords,setRef,newMarker$,movementMarker$,addMarker,positionUpdate} = useMapBox(initialPoint)

  const {socket} = useContext(SocketContext)
  // * escuchar los marcadores existentes 
  useEffect(() => {
    socket.on('marcadores-activos',markers=>{
      for(const key of Object.keys(markers)){
        addMarker(markers[key],key)
      }

    })
  }, [socket,addMarker])
  
  // * nuevo marcador
  useEffect(() => {
    newMarker$.subscribe(marker =>{
      socket.emit('marcador-nuevo',marker)
    })
  }, [newMarker$,socket])

  // * movimiento de cualquier marcador
  useEffect(() => {
    movementMarker$.subscribe(marker =>{
      socket.emit('marcador-actualizado',marker)
    })
  }, [socket,movementMarker$])

  //*mover marcador mediante sockets 
  useEffect(()=>{
    socket.on('marcador-actualizado',(marker)=>{
      positionUpdate(marker)
    })
  },[socket,positionUpdate])

  // * escuchar nuevos marcadores
  useEffect(() => {
    socket.on('marcador-nuevo',(marker)=>{
      addMarker(marker,marker.id)
    })
  }, [socket,addMarker])
  
  

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
