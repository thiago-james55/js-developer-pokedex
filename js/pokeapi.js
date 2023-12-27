const pokeApi = {};

pokeApi.getPokemons = (offset,limit) => {
    const Url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(Url)
    .then((response) => response.json())
    .then((responseBody) => responseBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)   
    .catch((error) => console.error(error));
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(pokeApi.convertPokemonDetailToPokemonModel);
}

pokeApi.convertPokemonDetailToPokemonModel = (pokemonDetail) => {
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetail.order;
    pokemon.name  = pokemonDetail.name;
    pokemon.types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;
    return pokemon;
}
