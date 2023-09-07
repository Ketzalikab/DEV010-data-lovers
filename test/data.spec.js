import dataFunction from '../src/data';

describe('sortData', () => {
  it('is a function', () => {
    expect(typeof dataFunction.sortData).toEqual('function');
  });

  it('sorts data in descending order', () => {
    const pokemons = [
      { num: 1, name: 'bulbasaur'},
      { num: 2, name: 'ivysaur' },
      { num: 3, name: 'venusaur' },
    ];
    const orderBy = "num";
    const sortOrder = "descendent";
    const sortedPokemons = dataFunction.sortData(pokemons, orderBy, sortOrder);
    const sortedNums = pokemons.map(pokemon => pokemon.num).sort((a, b) => b - a);
    const expectedSortedPokemons = sortedNums.map(num => pokemons.find(pokemon => pokemon.num === num));

    expect(sortedPokemons).toEqual(expectedSortedPokemons);
  });
});

describe('sortData', () => {
  it('is a function', () => {
    expect(typeof dataFunction.sortData).toEqual('function');
  });

  it('sorts data in ascending order', () => {
    const pokemons = [
      { num: 3, name: 'venusaur'},
      { num: 1, name: 'bulbasaur' },
      { num: 2, name: 'ivysaur' },
    ];
    const orderBy = "num";
    const sortOrder = "ascendent";
    const sortedPokemons = dataFunction.sortData(pokemons, orderBy, sortOrder);
    const sortedNums = pokemons.map(pokemon => pokemon.num).sort((a, b) => a - b);
    const expectedSortedPokemons = sortedNums.map(num => pokemons.find(pokemon => pokemon.num === num));
  
    expect(sortedPokemons).toEqual(expectedSortedPokemons);
  
  });
});

describe('filterGeneration', () => {
  it('is a function', () => {
    expect(typeof dataFunction.filterGeneration).toEqual('function');
  });
  
  it('filters data by generation', () => {
    const testDataByGeneration  = [
      { name: 'bulbasaur', generation: { num: 'i' } },
      { name: 'ivysaur', generation: { num: 'i' } },
      { name: 'venusaur', generation: { num: 'ii' } },
    ];

    const generationFilter = 'ii';
    const filteredPokemons = dataFunction.filterGeneration(testDataByGeneration  , generationFilter);
    const expectedFilteredPokemonsByGeneration = [
      { name: 'venusaur', generation: { num: 'ii' } },
    ];

    expect(filteredPokemons).toEqual(expectedFilteredPokemonsByGeneration);
  });
});

describe('filterByType', () => {
  it('is a function', () => {
    expect(typeof dataFunction.filterByType).toEqual('function');
  });

  it('filters data by type', () => {
    const testDataByType = [
      { name: 'gloom', type: ['grass', 'poison'] },
      { name: 'oddish', type: ['grass', 'poison'] },
      { name: 'ninetales', type: ['fire'] },
    ];

    const typeToFilter = 'grass';
    const filteredPokemons = dataFunction.filterByType(testDataByType, typeToFilter);
    const expectedFilteredPokemonsByType = [
      { name: 'gloom', type: ['grass', 'poison'] },
      { name: 'oddish', type: ['grass', 'poison'] },
    ];

    expect(filteredPokemons).toEqual(expectedFilteredPokemonsByType);
  });
});

describe('filterByRarity', () => {
  it('is a function', () => {
    expect(typeof dataFunction.filterByRarity).toEqual('function');
  });

  it('filters data by rarity', () => {
    const testDataByRarity = [
      { name: 'vileplume', 'pokemon-rarity': 'normal' },
      { name: 'moltres', 'pokemon-rarity': 'legendary' },
      { name: 'mew', 'pokemon-rarity': 'mythic' },
    ];

    const rarityToFilter = 'legendary';
    const filteredPokemons = dataFunction.filterByRarity(testDataByRarity, rarityToFilter);
    const expectedFilteredPokemonsByRarity = [
      { name: 'moltres', 'pokemon-rarity': 'legendary' },
    ];

    expect(filteredPokemons).toEqual(expectedFilteredPokemonsByRarity);
  });
});

describe('searching', () => {
  it('is a function', () => {
    expect(typeof dataFunction.searching).toEqual('function');
  });

  it('searches data by name or number', () => {
    const testDataByNameandNumber = [
      { num: 147, name: 'dratini' },
      { num: 149, name: 'dragonite' },
      { num: 236, name: 'tyrogue' },
    ];

    const searchTerm = 'dragonite';
    const foundPokemon = dataFunction.searching(testDataByNameandNumber, searchTerm);
    const expectedFoundPokemon = { num: 149, name: 'dragonite' };
    expect(foundPokemon).toEqual(expectedFoundPokemon);
  });
});

describe('computeStats', () => {
  it('is a function', () => {
    expect(typeof dataFunction.computeStats).toEqual('function');
  });

  it('it returns the pokemons you can beat stadisticly', () => {
    const testDataComputeStast = [
      { num: '117', name: 'seadra',  type: ['water'], weaknesses: ['electric', 'grass'], 
        'special-attack': [{'base-damage': 90},{'base-damage': 130},{'base-damage': 80},{'base-damage': 130}]},
      { num: '244', name: 'entei', type: ['fire'], weaknesses: ['water', 'ground', 'rock'],
        'special-attack': [{'base-damage': 70},{'base-damage': 140},{'base-damage': 160}]},
      { num: '186', name: 'politoed', type: ['water'], weaknesses: ['electric','grass'],
        'special-attack': [{'base-damage': 130},{'base-damage': 130},{'base-damage': 120}]},
    ];

    const searchTerm = '117';
    const [foundPokemon, foundAverage] = dataFunction.computeStats(testDataComputeStast, searchTerm);
    const expectedFoundPokemon = [{ num: '244', name: 'entei', type: ['fire'], weaknesses: ['water', 'ground', 'rock'],
      'special-attack': [{'base-damage': 70},{'base-damage': 140},{'base-damage': 160}]}];
    const expectedAverage = 107.5;
    expect(foundPokemon).toEqual(expectedFoundPokemon);
    expect(foundAverage).toEqual(expectedAverage);
  });
});

describe('filterCombine', () => {
  it('is a function', () => {
    expect(typeof dataFunction.filterCombine).toEqual('function');
  });
  it('filters data based on rarity, type, and generation', () => {
    const pokemons = [
      { 'pokemon-rarity': 'normal', 'pokemon-type': 'grass', 'pokemon-generation': 'i' },
      { 'pokemon-rarity': 'mythic', 'pokemon-type': 'fire', 'pokemon-generation': 'ii' },
      { 'pokemon-rarity': 'normal', 'pokemon-type': 'water', 'pokemon-generation': 'i' },
      { 'pokemon-rarity': 'legendary', 'pokemon-type': 'electric', 'pokemon-generation': 'ii' },
    ];
    const selectedRarity = 'normal';
    const selectedType = 'water';
    const generation = 'i';
    const filteredPokemons = dataFunction.filterCombine(pokemons, selectedRarity, selectedType, generation);
    const expectedFilteredPokemons = [
      { 'pokemon-rarity': 'normal', 'pokemon-type': 'water', 'pokemon-generation': 'i' },
    ];
    expect(filteredPokemons).toEqual(expectedFilteredPokemons);
  });
})