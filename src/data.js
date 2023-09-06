// estas funciones son de ejemplo

const dataFunction = {
  filterGeneration: (data, generation) => { 
    const filteredPokemons = data.filter(pokemon => {
      return pokemon.generation.num.toLowerCase() === generation.toLowerCase();
    });
    return filteredPokemons;
  },
  
  filterByType: (pokemons, selectedType) => {
    return pokemons.filter(pokemon => {
      return pokemon.type.includes(selectedType);
    });
  },

  filterByRarity: (pokemons, selectedRarity) => {
    return pokemons.filter(pokemon => pokemon['pokemon-rarity'] === selectedRarity);
  },

  sortData: (pokemons, sortBy, sortOrder ) => {
    if(sortOrder === "descendent"){
      return pokemons.sort((a, b) => {
        if (a.num > b.num) {
          return -1;
        }
        if (a.num < b.num) {
          return 1;
        }
        return 0;
      });
    }else if(sortOrder === "ascendent"){
      pokemons.sort((a, b) => {
        if (a.num > b.num) {
          return -1;
        }
        if (a.num < b.num) {
          return 1;
        }
        return 0;
      });
      return pokemons.reverse();
    }
  },

  searching: (pokemon, nameOrNumber) => {
    return pokemon.find(p => {
      return p.num === nameOrNumber || p.name === nameOrNumber; 
    });
  },
  
  filterCombine: (pokemons, selectedRarity, selectedType, generation) => {
    let filtered = pokemons;
    if (selectedRarity !=='cero') {
      filtered = filtered.filter(pokemon => pokemon['pokemon-rarity'] === selectedRarity);
    }
    if (selectedType !== 'cero') {
      filtered = filtered.filter(pokemon => pokemon['pokemon-type'] === selectedType);
    }
    if (generation !== 'cero') {
      filtered = filtered.filter(pokemon => pokemon['pokemon-generation'] === generation);
    }
    return filtered;
  },

  computeStats: (pokemon, nameOrNumber1) => {
    let numberPadded1;
    if(!isNaN(nameOrNumber1)){
      numberPadded1 = String(nameOrNumber1).padStart(3, '0');
    }else{
      nameOrNumber1 = nameOrNumber1.toLowerCase();
    }
    //let valuesSpecialAttack
    const pkm1 = pokemon.find(p => p.num === numberPadded1 || p.name === nameOrNumber1);
    const valuesSpecialAttack = [];
    pkm1['special-attack'].forEach(pkm =>{valuesSpecialAttack.push(pkm['base-damage'])});
    let sum = 0;
    valuesSpecialAttack.forEach(specialAttackValue => {sum += Number(specialAttackValue)});
    const averageAttack = (sum/valuesSpecialAttack.length);
    const weaknesses = pkm1.type;
    /*const pokemonWeak = pokemon.filter(p => {p.weaknesses.some(w => weaknesses.includes(w))});
    console.log(pokemonWeak);*/
    const pokemonWeak = pokemon.filter(p => {
      return p.weaknesses.some(w => weaknesses.includes(w));
    });
    //console.log(pokemonWeak);
    return [pokemonWeak, averageAttack];
  }
};

export default dataFunction;