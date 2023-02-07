import { useCallback, useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import {v4} from 'uuid'
import { Subject } from 'rxjs';



mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FzcGVydGVvOSIsImEiOiJjbGNnYWZxYW01cG1yM3Ftc21reXFhazcwIn0.UFxYbh78gTEwImeFchwiJg';

export const useMapBox = (initialPoint) => {
  //referencia al div del mapa
  const mapDiv = useRef()
  const setRef = useCallback((node)=>{
    mapDiv.current = node
  },[])

  // referencia a los marcadores 
  const marcadores = useRef({})

  //observables de rxjs
  const movementMarker = useRef(new Subject());
  const newMarker=useRef(new Subject());

  // mapa y coordenadas
  const map = useRef()
  const [coords, setCoords] = useState(initialPoint)

  //funcion para agregar marcadores
  const addMarker = useCallback((ev,id)=>{
    const {lng,lat} = ev.lngLat || ev
    const marker = new mapboxgl.Marker()
    //establecer un id unico al marcador
    marker.id = id ?? v4() 

    marker
      .setLngLat([lng,lat])
      .addTo(map.current)
      .setDraggable(true)
    //asignamos al objeto de marcadores
    marcadores.current[marker.id] = marker

    if(!id){
      newMarker.current.next({
        id: marker.id,
        lng,
        lat,
      })
    }

    // escuchar movimiento del marcador
    marker.on('drag',(ev)=>{
      const{id} = ev.target
      const {lng,lat} = ev.target.getLngLat()
      movementMarker.current.next({
        id,lng,lat
      })
    })
  },[])

  // * funcion para actualizar la ubicacion del marcador
  const positionUpdate = useCallback((marker)=>{
    marcadores.current[marker.id].setLngLat([marker.lng,marker.lat])
  }) 

  useEffect(()=>{
    const mapa = new mapboxgl.Map({
      container: mapDiv.current, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [initialPoint.lng,initialPoint.lat], // starting position [lng, lat]
      zoom: initialPoint.zoom, // starting zoom
    });

    map.current = mapa
  },[initialPoint])

  //cuando se mueve el mapa
  useEffect(() => {
    map.current?.on('move',()=>{
      const {lng,lat} = map.current.getCenter()
      setCoords({
        lng: lng.toFixed(5),
        lat: lat.toFixed(4),
        zoom: map.current.getZoom().toFixed(2)
      })
    })
  
    return () => {
      map.current.off('move')
    }
  }, [])

  // agregar marcadores cuando se hace click
  useEffect(() => {
    map.current?.on('click',(ev)=>{
      addMarker(ev)
    })
  }, [addMarker])
  
  

  return {
    coords,
    marcadores,
    newMarker$ : newMarker.current,
    movementMarker$ : movementMarker.current,
    positionUpdate,
    addMarker,
    setRef,

  }
}
