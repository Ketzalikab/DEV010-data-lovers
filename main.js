import data from './data/pokemon/pokemon.js';
import dataFunction from './data.js';
//import { number } from 'yargs';

document.addEventListener("DOMContentLoaded", function () {
  //DECLARACIONES
  const btnKanto = document.getElementById("showKantoCards");
  const btnJohto = document.getElementById("showJohtoCards");
  const begin = document.querySelector(".begin");  
  const marquee = document.getElementById("marquee");
  const btnNext = document.getElementById("btnNext");
  const btnPrev = document.getElementById("btnPrev");
  const btnChangeRegion = document.getElementById("changeRegion");
  const pokemons = 151;
  const cardPerPage = 25; //definir cuantas tarjetas se presentaran por pagina el grid  
  const btnAsc = document.getElementById("btnAscendent");
  const btnDes = document.getElementById("btnDescendent");
  const filterGenerationSelect = document.getElementById("categoryGeneration");
  const typeSelect = document.getElementById("categoryType"); 
  const raritySelect = document.getElementById("categoryRarity");
  const btnFilter = document.getElementById("filter");
  const btnSearch = document.getElementById("search");
  const valueSearch = document.getElementById("valueSearch");
  const alerts = document.getElementById("alerts");
  const alertsCompare = document.getElementById("alertsCompare");
  const btnReset = document.getElementById("resetFilters");
  const btnCompare = document.getElementById("comparePkm");
  const valuePkm1 = document.getElementById("firstPkm");

  const cards = document.getElementById("cards");
  const frontCards = document.getElementById("frontCards");
  const backCards = document.getElementById("backCards");

  
  let longArrayF, filterByRarity, filteredByGeneration, filteredByType;//, filterCombine;
  let generationOption, selectedType, selectedRarity;
  let arrayAscendent, arrayDescendent, arraySearch, pokemonStronger, combinedFilters;
  let numberPage = 1; //llevar el conteo de páginas*
  let kanto = false, johto = false;
  let btnPush = "", ascendent = false, descendent = false;



  //EVENTOS
  btnKanto.addEventListener("click", function() {
    kanto = true;
    loadPkm(numberPage); 
  });
  btnJohto.addEventListener("click", function() {
    johto = true;
    loadPkm(numberPage); 
  });

  btnNext.addEventListener("click", nextPage); 
  btnPrev.addEventListener("click", previousPage);

  btnAsc.addEventListener("click", function() {
    numberPage = 1;
    kanto = false;
    johto = false;
    const sortBy = "num";
    const sortOrder = "ascendent";
    marquee.innerHTML = "Ascendent by pokemon number (ALL)";
    ascendent = true;
    descendent = false;
    arrayAscendent = dataFunction.sortData(data.pokemon, sortBy, sortOrder);
    filterArrays(numberPage, arrayAscendent);
  });
  
  btnDes.addEventListener("click", function() {
    numberPage = 1;
    kanto = false;
    johto = false;
    descendent = true;
    const sortBy = "num";
    const sortOrder = "descendent";
    marquee.innerHTML = "Descendent by pokemon number (ALL)";
    ascendent = false;
    descendent = true;
    arrayDescendent = dataFunction.sortData(data.pokemon,sortBy,sortOrder);
    filterArrays(numberPage, arrayDescendent);
  });

  btnChangeRegion.addEventListener("click", function(){
    numberPage = 1;
    if(kanto){
      kanto = false;
      johto = true;
      loadPkm(numberPage);
    }else if(johto){
      johto = false;
      kanto = true;
      loadPkm(numberPage);
    }else{
      kanto = true;
      johto = false;
      loadPkm(numberPage);
    }
  });
   
  btnFilter.addEventListener("click", () => {
    numberPage = 1;
    kanto =false; 
    johto = false; 
    generationOption = filterGenerationSelect.value;
    selectedType = typeSelect.value;
    selectedRarity = raritySelect.value;
    // Si no se selecciona ningún filtro, mostrar un mensaje
    if (generationOption === "cero" && selectedType === "cero" && selectedRarity === "cero") {
      alerts.innerHTML = "Please, select a filter...";
      return;
    }
    // Filtrar por generación
    if (generationOption !== "cero") {
      /*marquee.innerHTML = "Generation: " + generationOption;*/
      filteredByGeneration = dataFunction.filterGeneration(data.pokemon, generationOption);
    } else {
      filteredByGeneration = data.pokemon;
      filterArrays(numberPage, filteredByGeneration);
      btnPush = "generacion";
    }
    //Limpiar la alerta 
    alerts.innerHTML = "";
     
    // Filtrar por tipo
    if (selectedType !== "cero") {
      /*marquee.innerHTML = "Type: " + selectedType;*/
      filteredByType = dataFunction.filterByType(filteredByGeneration, selectedType);
    } else {
      filteredByType = filteredByGeneration;
      filterArrays(numberPage, filteredByType);
      btnPush = "tipo";
    }
    //Limpiar la alerta 
    alerts.innerHTML = "";

    // Filtrar por rareza
    if (selectedRarity !== "cero") {
      /*marquee.innerHTML = "Rarity: " + selectedRarity;*/
      filterByRarity = dataFunction.filterByRarity(filteredByType, selectedRarity);
    } else {
      filterByRarity = filteredByType;
      filterArrays(numberPage, filterByRarity);
      btnPush = "rareza";
    }
    //Limpiar la alerta 
    alerts.innerHTML = "";

    // Construir la cadena de filtros seleccionados
    const selectedFilters = [];
    if (generationOption !== "cero") {
      selectedFilters.push("Generation: " + generationOption);
    }
    if (selectedType !== "cero") {
      selectedFilters.push("Type: " + selectedType);
    }
    if (selectedRarity !== "cero") {
      selectedFilters.push("Rarity: " + selectedRarity);
    }

    // Mostrar los nombres de los filtros seleccionados en la marquesina
    if (selectedFilters.length > 0) {
      marquee.innerHTML = selectedFilters.join(", ");
    } else {
      marquee.innerHTML = "No filters selected";
    }

    // Combinar los filtros
    combinedFilters = dataFunction.filterCombine(filterByRarity, selectedRarity, selectedType, generationOption);
    if (combinedFilters.length > 0) {
      btnPush = "combine";
      filterArrays(numberPage, combinedFilters);
    } else {
    // Si no hay resultados combinados ni individuales, mostrar una alerta
      if (filterByRarity.length === 0) {
        alerts.innerHTML = "No results found for the selected filters.";
        filterByRarity = [];
        filterArrays(numberPage, filterByRarity);
      } else {
        // Si no hay resultados combinados, utilizar el último filtro individual
        filterArrays(numberPage, filterByRarity)
      }
    }
  });

  btnSearch.addEventListener("click", () => {
    numberPage = 1;
    const numberOrName = valueSearch.value;
    alerts.innerHTML = "";
    //console.log(numberOrName);
    if(numberOrName === null){
      alerts.innerHTML = "Please write a pokemon name or a pokemon number";
    }else{
      if(!isNaN(numberOrName)){
        const numberPadded = String(numberOrName).padStart(3, '0');
        arraySearch = dataFunction.searching(data.pokemon, numberPadded);
      }else{
        arraySearch = dataFunction.searching(data.pokemon, numberOrName.toLowerCase());
      }     
      if(arraySearch === undefined){
        alerts.innerHTML = "Pokemon not found";
      }else{
        pokemonFound(arraySearch);
      }
    }
  })

  btnReset.addEventListener("click", () => {
    numberPage = 1;
    marquee.innerHTML = "ALL POKEMONS";
    kanto = false;
    johto = false;
    filterGenerationSelect.value = "cero";
    typeSelect.value = "cero";
    raritySelect.value = "cero";
    alerts.innerHTML = "";
    alertsCompare.innerHTML = "";
    valueSearch.value = "";
    valuePkm1.value = "";
    btnPush = "ascendent";
    filterArrays(numberPage, data.pokemon);
  });

  btnCompare.addEventListener("click", () =>{
    numberPage = 1;
    kanto = false;
    johto = false;
    btnPush = "compare";
    const numberOrName1 = valuePkm1.value;
    alertsCompare.innerHTML = "";
    if(numberOrName1 === null || numberOrName1 === ""){
      alerts.innerHTML = "Please write a pokemon name or a pokemon number";
    }else{
      pokemonStronger = dataFunction.computeStats(data.pokemon, numberOrName1);
    }       
    if(pokemonStronger === undefined || pokemonStronger === ""){
      alertsCompare.innerHTML = "Pokemon not found";
    }else{
      filterArrays(numberPage, pokemonStronger);
      alertsCompare.innerHTML = "STADISTICLY YOU CAN BEAT THIS POKEMONS:"
    }
  });

  //FUNCIONES
  function backCard(){
    const eachCard = document.querySelectorAll('.pokemon-card')
    eachCard.forEach((element) => {
      element.addEventListener('mouseover', (event) => {
        const card = event.target.closest('.pokemon-card');
        card.classList.add('reverse-content');
      });
      cards.addEventListener('mouseout', (event) => {
        const card = event.target.closest('.pokemon-card');
        if (card) {
          card.classList.remove('reverse-content');
        }
      });
    })
  }    
  
  function loadPkm(page){
    frontCards.innerHTML = "";
    backCards.innerHTML = "";
    begin.style.display = "none";
    if(kanto){
      marquee.innerHTML = "Kanto Region";
      const indexBegin = (page - 1) * cardPerPage;
      const endIndex = Math.min(indexBegin + cardPerPage, pokemons);
      cardsByRegion(indexBegin, endIndex);
    }
    if(johto){
      marquee.innerHTML = "Johto Region";
      const indexBegin = pokemons + (page - 1) * cardPerPage;
      const endIndex = indexBegin + cardPerPage;
      cardsByRegion(indexBegin, endIndex);
    }
    //Cargamos demás elementos
    btnPrev.style.display = "inline-block";
    btnNext.style.display = "inline-block";
    btnChangeRegion.style.display = "block";
    document.getElementById("filterBar").style.display = "block";
    document.getElementById("statsAttack").style.display = "block";
  }

  function cardsByRegion(indexB, indexE){
    for(let i = indexB; i < indexE; i++) {
      const numPkn = document.createTextNode("No. " + data.pokemon[i].num);
      const namePkn = document.createTextNode((data.pokemon[i].name).toUpperCase());
      const heightPkn = document.createTextNode("Height: " + (data.pokemon[i].size.height));
      const weightPkn = document.createTextNode("Weight: " + (data.pokemon[i].size.weight));
      const factAbout = document.createTextNode(data.pokemon[i].about);
      const factsType = document.createTextNode("Type: " + data.pokemon[i].type);
      const factsWeak = document.createTextNode("Weakness: " + data.pokemon[i].weaknesses);
      const factsResistant = document.createTextNode("Resistant: " + data.pokemon[i].resistant);
      
      const picture = document.createElement('picture');
      picture.classList = 'pokemon-card';
      const img = document.createElement('img');
      picture.id= data.pokemon[i].num
      img.src = data.pokemon[i].img;
      picture.appendChild(img);
      const figCaption = document.createElement('figcaption');
      figCaption.classList = 'frontText';
      figCaption.appendChild(numPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(namePkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(heightPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(weightPkn);
      picture.appendChild(figCaption);
      frontCards.appendChild(picture);

      const pictureBack = document.createElement('picture');
      pictureBack.classList = 'pokemon-card';
      const factsInfo = document.createElement('span');
      factsInfo.classList = "reverseText";
      factsInfo.appendChild(factAbout);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(factsType);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(factsWeak);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(factsResistant);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(document.createElement('br'));
      pictureBack.appendChild(factsInfo);
      backCards.appendChild(pictureBack);
    }
    cards.style.display = "grid";
    frontCards.style.display = "grid";
    backCards.style.display = "grid ";
    if(frontCards.childNodes.length !== 0){
      backCard();
    }
  }

  function nextPage() {
    //sirve para limitar el numero de paginas para Kango son 151 pokemons y se necesitan 6 paginas
    const numPokemonsKanto = 151; 
    const numPokemonsJohto = 100;
    //para Johto son 100 pokemons a mostrar y se necesitan 4 paginas
    //let numPokemons;
    if(kanto){
      if(numberPage === Math.ceil(numPokemonsKanto / cardPerPage)){
        return;
      }
      numberPage++;
      loadPkm(numberPage);
    }
    if(johto){
      if(numberPage === Math.ceil(numPokemonsJohto / cardPerPage)){
        return;
      }
      numberPage++;
      loadPkm(numberPage);
    }

    switch(btnPush){
    case "tipo":
      if(longArrayF < cardPerPage ||  numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, filteredByType);
      //arrayType(numeroPagina, filteredByType);
      break;
    case "generacion":
      if(longArrayF < cardPerPage || numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, filteredByGeneration);
      //arrayGeneration(numeroPagina, filteredByGeneration);
      break;
    case "rareza":
      if(longArrayF < cardPerPage || numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, filterByRarity);
      //arrayRarity(numeroPagina,filterByRarity);
      break;
    case "compare":
      if(longArrayF < cardPerPage ||  numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, pokemonStronger);
      break;
    case "combine":
      if(longArrayF < cardPerPage ||  numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, combinedFilters);
      break;
    }

    if(ascendent){
      if(longArrayF < cardPerPage ||  numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, arrayAscendent);
    }  
    if(descendent){
      if(longArrayF < cardPerPage ||  numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, arrayDescendent);
    }
  }

  function previousPage() {
    //si estan en la primera pagina y si se presiona el boton de anterior no mande a pagina en blanco
    if(numberPage === 1){
      return;
    }
    if(kanto){
      numberPage--;
      loadPkm(numberPage);
    }
    if(johto){
      numberPage--;
      loadPkm(numberPage);
    }

    switch(btnPush){
    case "tipo":
      numberPage--;
      filterArrays(numberPage, filteredByType);
      break;
    case "generacion":
      numberPage--;
      filterArrays(numberPage, filteredByGeneration);
      break;
    case "rareza":
      numberPage--;
      filterArrays(numberPage, filterByRarity);
      break; 
    case "compare":
      numberPage--;
      filterArrays(numberPage, pokemonStronger);
      break;
    case "combine":
      numberPage--;
      filterArrays(numberPage, combinedFilters);  
      break;
    }

    if(ascendent){
      if(numberPage === 1){
        return;
      }
      numberPage--;
      filterArrays(numberPage, arrayDescendent);
    } 
    if(descendent){
      if(numberPage === 1){
        return;
      }
      numberPage--;
      filterArrays(numberPage, arrayDescendent);
    }
  }

  function filterArrays(page, arrayF){
    frontCards.innerHTML = "";
    backCards.innerHTML = "";
    longArrayF = arrayF.length;
    const filterBegin = (page - 1) * cardPerPage;
    const filterEnd = Math.min(filterBegin + cardPerPage, arrayF.length);
    for(let i = filterBegin; i < filterEnd; i++) {
      const numPkn = document.createTextNode("No. " + arrayF[i].num);
      const namePkn = document.createTextNode((arrayF[i].name).toUpperCase());
      const heightPkn = document.createTextNode("Height: " + (arrayF[i].size.height));
      const weightPkn = document.createTextNode("Weight: " + (arrayF[i].size.weight));

      const factAbout = document.createTextNode(arrayF[i].about);
      const factsType = document.createTextNode("Type: " + arrayF[i].type);
      const factsWeak = document.createTextNode("Weakness: " + arrayF[i].weaknesses);
      const factsResistant = document.createTextNode("Resistant: " + arrayF[i].resistant);

      const picture = document.createElement('picture');
      picture.classList = 'pokemon-card';
      const img = document.createElement('img');
      img.src = arrayF[i].img;
      picture.appendChild(img);
      const figCaption = document.createElement('figcaption');
      figCaption.classList = 'frontText';
      figCaption.appendChild(numPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(namePkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(heightPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(weightPkn);
      picture.appendChild(figCaption);
      frontCards.appendChild(picture);

      const pictureBack = document.createElement('picture');
      pictureBack.classList = 'pokemon-card';
      const factsInfo = document.createElement('span');
      factsInfo.classList = "reverseText";
      factsInfo.appendChild(factAbout);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(factsType);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(factsWeak);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(factsResistant);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(document.createElement('br'));
      pictureBack.appendChild(factsInfo);
      backCards.appendChild(pictureBack);
    }
    cards.style.display = "grid";
    frontCards.style.display = "grid";
    backCards.style.display = "grid";
    if(frontCards.childNodes.length !== 0){
      backCard();
    }
  }

  function pokemonFound(arrayF){
    marquee.innerHTML = "Gotcha! " + arrayF.name.toUpperCase();
    frontCards.innerHTML = "";
    backCards.innerHTML = "";
    const numPkn = document.createTextNode("No. " + arrayF.num);
    const namePkn = document.createTextNode((arrayF.name).toUpperCase());
    const heightPkn = document.createTextNode("Height: " + (arrayF.size.height));
    const weightPkn = document.createTextNode("Weight: " + (arrayF.size.weight));

    const factAbout = document.createTextNode(arrayF.about);
    const factsType = document.createTextNode("Type: " + arrayF.type);
    const factsWeak = document.createTextNode("Weakness: " + arrayF.weaknesses);
    const factsResistant = document.createTextNode("Resistant: " + arrayF.resistant);

    const picture = document.createElement('picture');
    picture.classList = 'pokemon-card';
    const img = document.createElement('img');
    img.src = arrayF.img;
    picture.appendChild(img);
    const figCaption = document.createElement('figcaption');
    figCaption.classList = 'frontText';
    figCaption.appendChild(numPkn);
    figCaption.appendChild(document.createElement('br'));
    figCaption.appendChild(namePkn);
    figCaption.appendChild(document.createElement('br'));
    figCaption.appendChild(heightPkn);
    figCaption.appendChild(document.createElement('br'));
    figCaption.appendChild(weightPkn);
    picture.appendChild(figCaption);
    frontCards.appendChild(picture);

    const pictureBack = document.createElement('picture');
    pictureBack.classList = 'pokemon-card';
    const factsInfo = document.createElement('span');
    factsInfo.classList = "reverseText";
    factsInfo.appendChild(factAbout);
    factsInfo.appendChild(document.createElement('br'));
    factsInfo.appendChild(document.createElement('br'));
    factsInfo.appendChild(factsType);
    factsInfo.appendChild(document.createElement('br'));
    factsInfo.appendChild(document.createElement('br'));
    factsInfo.appendChild(factsWeak);
    factsInfo.appendChild(document.createElement('br'));
    factsInfo.appendChild(document.createElement('br'));
    factsInfo.appendChild(factsResistant);
    factsInfo.appendChild(document.createElement('br'));
    factsInfo.appendChild(document.createElement('br'));
    pictureBack.appendChild(factsInfo);
    backCards.appendChild(pictureBack);
  
    cards.style.display = "grid";
    frontCards.style.display = "grid";
    backCards.style.display = "grid";
    if(frontCards.childNodes.length !== 0){
      backCard();
    }
  }
});
