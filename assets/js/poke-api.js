
const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;   

    pokemon.height = (pokeDetail.height / 10).toFixed(2);
    pokemon.weight = (pokeDetail.weight / 10).toFixed(1);
    pokemon.abilities.push(pokeDetail.abilities[0].ability.name.toUpperCase());
    pokemon.abilities.push(pokeDetail.abilities[1].ability.name.toUpperCase());
    
    pokemon.totalStats = 0;
    pokemon.stats = pokeDetail.stats.map((stat)=>{
    pokemon.totalStats = pokemon.totalStats + stat.base_stat;
    
    
    return stat.base_stat;
    });
    return pokemon;
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then(response => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10)=> {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then(response => response.json())
    .then((jsonBody)=> jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) 
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails)=> pokemonsDetails)
    
}



