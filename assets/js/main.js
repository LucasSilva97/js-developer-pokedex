const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit){
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { 
    
        const newHtml = pokemons.map((pokemon) => {
            
            const listItem = `<li class="pokemon ${pokemon.type}" id="${pokemon.name}">            
             
                <div class="${pokemon.type} dataPokemon" id="pokemon${pokemon.number}">
                        
                    <h3 class="namePokemon">${pokemon.name}</h3>
                    <h4 id="pokeId">#0${pokemon.number}</h4>
                        <div class="types">
                        <span class="typeOne">${pokemon.types[0]}</span>
                            <span class="typeTwo">${pokemon.types[1] == undefined? 'não especificado':pokemon.types[1]}</span>
                    </div>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.number}.svg" 
                        alt="bulbasaur" class="pokemonImage">
                        <div class="stats">
                        <table>
                                <tr>    
                                <th>Height</th>
                                    <td>${pokemon.height} m</td>
                                </tr>
                                <th>Weight</th>
                                <td>${pokemon.weight} Kg</td>
                                </tr>
                                <tr>
                                <th>Abilities</th>
                                    <td>${pokemon.abilities[0]},</td>
                                    <td>${pokemon.abilities[1]}</td>
                                    </tr>
                            </table>
                            
                            <table>
                                <tr>
                                    <th>HP</th>
                                    <td>${pokemon.stats[0]}</td>
                                </tr>
                                <tr>
                                    <th>Attack</th>
                                    <td>${pokemon.stats[1]}</td>
                                    </tr>
                                    <tr>
                                    <th>Defense</th>
                                    <td>${pokemon.stats[2]}</td>
                                </tr>
                                <tr>
                                    <th>Special-attack</th>
                                    <td>${pokemon.stats[3]}</td>
                                    </tr>
                                <tr>
                                    <th>Special-defense</th>
                                    <td>${pokemon.stats[4]}</td>
                                </tr>
                                <tr>
                                    <th>Speed</th>
                                    <td>${pokemon.stats[5]}</td>
                                    </tr>
                                <tr>
                                <th>Total Score</th>
                                    <td>${pokemon.totalStats}</td>
                                    </tr>
                            </table>
                        </div>
                    </div>
                    </li>`
                    return listItem;
                    
                }).join('');
        
        pokemonList.innerHTML += newHtml;

    })
}

    
    
    function closeContainerStats(){
        containerDataStats.style.display = 'none';
    }    
    
    loadPokemonItens(offset, limit);
    
    loadMoreButton.addEventListener('click', ()=>{ 
        offset += limit;
        loadPokemonItens(offset, limit)
    })
    

