import axios from 'axios';

const fetchPokemons = async () => {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=10'; 
    const response = await axios.get(url);
    
    const pokemonDetailsPromises = response.data.results.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
    
    const pokemonDetails = pokemonDetailsResponses.map((response) => ({
      id: response.data.id,
      name: response.data.name,
      imgSrc: response.data.sprites.front_default,
      ability: response.data.abilities[0].ability.name,
      weight: response.data.weight,
    }));

    return pokemonDetails;
  } catch (error) {
    throw new Error("Error al obtener los pokemones");
  }
};

export { fetchPokemons };