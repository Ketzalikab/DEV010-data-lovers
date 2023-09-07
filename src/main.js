import data from './data/pokemon/pokemon.js';
import dataFunction from './data.js';
//import { number } from 'yargs';

document.addEventListener("DOMContentLoaded", function () {
  //El evento DOMContentLoaded se dispara cuando el documento HTML ha sido completamente cargado y parseado en el navegador. 
  //Este evento se activa cuando la estructura de la página (DOM) está lista y disponible para que JavaScript interactúe con ella.
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
  let arrayAscendent, arrayDescendent, arraySearch, combinedFilters, pokemonStronger;
  let averageAttk;
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
  //Este código agrega un event listener al botón con el id btnKanto. 
  //Cuando se haga clic en ese botón, la función proporcionada como segundo argumento se ejecutará. Dentro de esta función:
  //kanto = true;: Establece la variable kanto en true, lo que indica que se ha seleccionado la región Kanto.
  //loadPkm(numberPage);: Llama a la función loadPkm con el número de página actual (numberPage) como argumento. 
  //Esto se hace para cargar los Pokémon de la región Kanto en la página.

  //nextPage: Llama a la función nextPage, que se encarga de cargar la siguiente página de tarjetas de Pokémon.
  //previousPage: Cuando se haga clic en el botón "Anterior", llama a la función previousPage, 
  //que carga la página anterior de tarjetas de Pokémon.

  //Estas funciones anónimas/callback permiten definir la lógica que se ejecutará en respuesta a un evento, 
  //como un clic en un botón, sin necesidad de declarar una función con nombre por separado.

  btnAsc.addEventListener("click", function() {
    //Agrega un event listener al botón "Ascendent". 
    //Cuando se haga clic en este botón, la función anónima proporcionada como argumento se ejecutará.
    numberPage = 1; // Establece el número de página en 1, para volver a la primera página cuando se cambia el orden.
    kanto = false;
    johto = false; //Asegura que ni la región Kanto ni la región Johto estén seleccionadas.
    const sortBy = "num";
    const sortOrder = "ascendent"; //Define cómo se ordenarán los datos: por número de Pokémon y en orden ascendente.
    marquee.innerHTML = "Ascendent by pokemon number (ALL)"; 
    //Cambia el contenido del elemento con el id "marquee" para mostrar un mensaje indicando que los Pokémon se están mostrando en orden ascendente.
    ascendent = true;
    descendent = false; //Establece las variables booleanas para indicar que el orden es ascendente y no descendente.
    arrayAscendent = dataFunction.sortData(data.pokemon, sortBy, sortOrder);
    //Utiliza una función llamada sortData de dataFunction para ordenar los datos de los Pokémon en orden ascendente según su número. 
    //El resultado se almacena en arrayAscendent.
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
    numberPage = 1; // Reinicia el número de página a 1
    if(kanto){ // Si ya está seleccionada la región Kanto
      kanto = false; // Desactiva Kanto
      johto = true; // Activa Johto
      loadPkm(numberPage); // Carga los Pokémon de la región Johto en la página
    }else if(johto){ // Si ya está seleccionada la región Johto
      johto = false; // Desactiva Johto
      kanto = true; // Activa Kanto
      loadPkm(numberPage); // Carga los Pokémon de la región Kanto en la página
      // Si no se ha seleccionado ninguna región
    }else{
      kanto = true; // Activa Kanto
      johto = false; // Desactiva Johto
      loadPkm(numberPage); // Carga los Pokémon de la región Kanto en la página
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
    numberPage = 1; // Reiniciar el número de página
    const numberOrName = valueSearch.value; // Obtener el valor del campo de búsqueda
    alerts.innerHTML = ""; // Limpiar cualquier mensaje de alerta previo
    const isNumber = !isNaN(numberOrName);
    if (!numberOrName) {
      alerts.innerHTML = "Please write a Pokémon name or a Pokémon number";
    } else {
      const searchTerm = isNumber ? String(numberOrName).padStart(3, '0') : numberOrName.toLowerCase();
      arraySearch = dataFunction.searching(data.pokemon, searchTerm);
      if (arraySearch === undefined) {
        alerts.innerHTML = "Pokemon not found";
      } else {
        pokemonFound(arraySearch); // Mostrar información del Pokémon encontrado
      }
    }
  });

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
      //pokemonStronger = dataFunction.computeStats(data.pokemon, numberOrName1);
      [pokemonStronger, averageAttk] = dataFunction.computeStats(data.pokemon, numberOrName1);
    } 
    if(pokemonStronger === undefined || pokemonStronger === ""){      
    //if(pokemonStronger === undefined || pokemonStronger === ""){
      alertsCompare.innerHTML = "Pokemon not found";
    }else{
      filterArrays(numberPage, pokemonStronger);
      alertsCompare.innerHTML = "STADISTICLY YOU CAN BEAT THIS POKEMONS WITH A SPECIAL ATTACK AVERAGE OF: "+ averageAttk.toFixed(2);
      marquee.innerHTML = "STADISTICLY YOU CAN BEAT THIS POKEMONS WITH A SPECIAL ATTACK AVERAGE OF: "+ averageAttk.toFixed(2);
    }
  });

  //FUNCIONES
  function backCard(){
    const eachCard = document.querySelectorAll('.pokemon-card') // Esto crea una lista de nodos (elementos HTML).
    eachCard.forEach((element) => { //Itera sobre cada uno de los elementos seleccionados (las tarjetas de Pokémon) utilizando el método forEach.
      element.addEventListener('mouseover', (event) => { //Dentro de este manejador, se obtiene la tarjeta específica (card) que desencadenó el evento y se le agrega una clase llamada 'reverse-content'
        const card = event.target.closest('.pokemon-card');
        card.classList.add('reverse-content'); // Esta clase tiene estilos CSS para mostrar la parte trasera de la tarjeta, lo que simula el efecto de volteo.
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

      //Cálculo de Rango de Filtrado: Se calcula el rango de índices dentro del array arrayF que se mostrarán en la página actual.
      // Esto se hace usando filterBegin y filterEnd, considerando la página actual (page) y la cantidad de tarjetas por página (cardPerPage).

      // Bucle For: Se utiliza un bucle for para iterar a través del rango de índices calculado en el paso anterior.

      //Creación de Text Nodes: Se crean objetos de tipo TextNode que contienen la información a mostrar en cada tarjeta, 
      //como el número, nombre, altura, peso, información adicional, tipo, debilidades y resistencias del Pokémon.

      //Creación de Elementos HTML: Se crean elementos HTML (picture, img y figcaption) para estructurar la tarjeta de Pokémon.

      //Asignación de Contenido: Se asignan los nodos de texto y elementos HTML creados a la estructura de la tarjeta.

      //Agregar a la Sección Frontal: La tarjeta completa se agrega al contenedor frontCards, lo que la muestra en la página.

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
