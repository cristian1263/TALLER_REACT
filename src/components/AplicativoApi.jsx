import React, {useState, useEffect} from 'react'  

function AplicativoApi (){
    const [Datopokemon,setDatopokemon] = React.useState([])
    const [siguienteUrl, setsiguienteUrl] = React.useState('')
    const [anteriorUrl, setanteriorUrl] = React.useState('')
    const [carga, setcarga] = React.useState(true)
    const inicioUrl ='https://pokeapi.co/api/v2/pokemon'
  
    useEffect(() => {
       async function ObtenerDatos() {
        let respuesta = await recibirtodopokemon(inicioUrl);
         setsiguienteUrl(respuesta.next)
         setanteriorUrl(respuesta.previous)
         await cargaPokemon(respuesta.results)
         setcarga(false)
       }
       ObtenerDatos()
    }, [])
}

export default AplicativoApi;