import { useMemo,useEffect,useState } from 'react'
import io from 'socket.io-client'


const useSocket = (serverPath) => {
  // si el atributo serverPath cambia, vuelve y ejecuta la funcion socket
  // de lo contrario utiliza el memo
  const socket = useMemo( ()=> io.connect(serverPath,{
    transports:['websocket']
  }),[serverPath])

  const [online, setOnline] = useState(false)

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
   socket.on('connect',()=>{
    setOnline(true)
   })
  }, [socket])


  useEffect(() => {
    socket.on('disconnect',()=>{
     setOnline(false)
    })
   }, [socket])

  return{
    socket,
    online
  }
}

export default useSocket