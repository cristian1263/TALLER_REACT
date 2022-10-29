import React from 'react'
import tiposdepokemons from '../../clases/tiposdepokemons';
import './style.css'

function Card({ pokemon }) {
  return (
      <div className="Card">
          <div className="Card_img">
              <img src={pokemon.sprites.front_default} alt="" />
          </div>
          <div className="Card_name">
              {pokemon.name}
          </div>
          <div className="Card_types">
              {
                  pokemon.types.map(type => {
                      return (
                          <div className="Card_type" style={{ backgroundColor: tiposdepokemons[type.type.name] }}>
                              {type.type.name}
                          </div>
                      )
                  })
              }
          </div>
          <div className="Card_info">
              <div className="Card_data Card_data--weight">
                  <p className="title">Peso</p>
                  <p>{pokemon.weight}</p>
              </div>
              <div className="Card_data Card_data--weight">
                  <p className="title">Altura</p>
                  <p>{pokemon.height}</p>
              </div>
              <div className="Card_data Card_data--ability">
                  <p className="title">Habilidad</p>
                  <p>{pokemon.abilities[0].ability.name}</p>
              </div>
          </div>
      </div>
  );
}

export default Card;