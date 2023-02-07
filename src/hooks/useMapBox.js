import mapboxgl from 'mapbox-gl'
import { useCallback, useEffect, useRef, useState } from 'react'

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FzcGVydGVvOSIsImEiOiJjbGNnYWZxYW01cG1yM3Ftc21reXFhazcwIn0.UFxYbh78gTEwImeFchwiJg';

export const useMapBox = (initialPoint) => {
  //referencia al div del mapa
  const mapDiv = useRef()
  const setRef = useCallback((node)=>{
    mapDiv.current = node
  },[])

  const map = useRef()
  const [coords, setCoords] = useState(initialPoint)

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
  

  return {
    coords,
    setRef
  }
}
