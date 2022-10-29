import React, {useState, useEffect} from 'react' 
import { recibirtodopokemon, recibirpokemon } from './servicios/Pokemon' 
import Card from  './components/Card/Card'
import Nbar from './components/Nbar/Nbar' 

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
    const siguiente = async () => {
        setcarga(true);
        let respuesta = await recibirtodopokemon(siguienteUrl)
        await cargaPokemon(respuesta.results)
        setsiguienteUrl(respuesta.next)
        setanteriorUrl(respuesta.previous)
        setcarga(false)
      }
      
      const Anterior = async () => {
        if (!anteriorUrl) return anteriorUrl;
        setcarga(true);
        let respuesta = await recibirtodopokemon (anteriorUrl)
        await cargaPokemon(respuesta.results)
        setsiguienteUrl(respuesta.next)
        setanteriorUrl(respuesta.previous)
        setcarga(false)
        }

    const cargaPokemon = async (data) => {
        let DatosPokemon = await Promise.all(data.map(async pokemon => {
         let Registropokemon = await recibirpokemon(pokemon.url)
          return Registropokemon
        }))
         setDatopokemon(DatosPokemon)
       }
    return (
        <>
          <Nbar/>
          <div > 
              {carga ? <h1 style={{ textAlign: 'center' }}>Cargando...</h1> : (
            <>
              <div className="boton">
                    <button onClick={Anterior}>Anterior</button>
                    <button onClick={siguiente}>Siguiente</button>
                  </div>
              <div className="contenedor-cuadricula">
              {Datopokemon.map((pokemonD, i) => {
                      return <Card key={i} pokemon={pokemonD} /> 
                    })}
      
                </div>
                <div className="boton">
                <button onClick={Anterior}>Anterior</button>
                <button onClick={siguiente}>Siguiente</button>
              </div>
            </>
            )}
           </div>
        </>
      )
      
}

export default AplicativoApi;