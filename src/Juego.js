import React, { useEffect, useState } from "react";
import { Row, Col, Input, Card, Button } from "antd";
import axios from "axios";

const Juego = () => {
  const { Search } = Input;
  const [pokemons, setPokemons] = useState([]);
  const [pokemonActive, setPokemonActive] = useState(null);
  const [photo, setPhoto] = useState(
    "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png"
  );
  const onSearch = () => {};

  const getData = async (url) => {
    const data = await axios.get(url);
    console.log(data.data);

    return data.data;
  };

  const loadPokemons = async () => {
    const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
    let specs = {};
    let tempArray = [];
    console.log(resp);
    const { results } = resp.data;
    results.map((pokemon) => {
      const url = pokemon.url;
      specs = getData(url);
      console.log(specs);
      tempArray.push(specs);
    });
    console.log(results);
    setPokemons(results);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  const activeCard = (card, key) => {
    console.log(card, key);

    setPokemonActive({ ...card, key });
    setPhoto(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${key}.png`
    );
  };

  return (
    <div>
      <h1>Listado de pokemon</h1>
      <Row type="flex">
        <Col>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </Col>
        <Col></Col>
      </Row>
      <Row type="flex">
        <Col span={4}>
          <div className="grid-poke">
            {pokemons.map(
              (pokemon, key) =>
                key !== 0 &&
                key <= 4 && (
                  <a onClick={() => activeCard(pokemon, key)}>
                    <Card
                      hoverable
                      className="poke-card"
                      cover={
                        <img
                          alt="example"
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${key}.png`}
                        />
                      }
                    >
                      #{key} <p className="capitalize">{pokemon.name}</p>
                    </Card>
                  </a>
                )
            )}
          </div>
        </Col>
        <Col>
          <Card
            hoverable
            className="poke-card"
            cover={<img alt="example" src={photo} />}
          >
            {pokemonActive && (
              <div>
                # {pokemonActive.key}{" "}
                <p className="capitalize">{pokemonActive.name}</p>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="btns">
        <Button>Atras</Button>
        <Button>Siguiente</Button>
      </Row>
    </div>
  );
};

export default Juego;
