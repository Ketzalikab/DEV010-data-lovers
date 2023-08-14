import data from './data/pokemon/pokemon.js';
document.addEventListener("DOMContentLoaded", function () {
  
  //Cargar los botones con la referencia de las tarjetas//
  const pokemonsKanto = 151;//donde termina
  const tarjetas = document.getElementById("tarjetas"); //el div dónde se pondrán las tarjetas
  const marquesina = document.getElementById("marquesina");
  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnAnterior = document.getElementById("btnAnterior");
  const btnCambio = document.getElementById("cambioRegion");
  const pokemonsKanto = 151;//donde termina
  const pokemonsJohto = 151;
  const tarjetaPorPagina = 25; //definir cuantas tarjetas se presentaran por pagina el grid  

  let numeroPagina = 1; //llevar el conteo de páginas*
  let region = ""; 

  botonKanto.addEventListener("click", function() {
    cargarPokemonesKanto(numeroPagina); 
  });
  botonJohto.addEventListener("click", function() {
    cargarPokemonesJohto(numeroPagina); 
  });

  btnSiguiente.addEventListener("click", pagSiguiente); 
  btnAnterior.addEventListener("click", pagAnterior);
  let numeroPagina = 1; //llevar el conteo de páginas
  // Función para cargar los Pokémon de Kanto
  function cargarPokemonesKanto(pagina){
    marquesina.innerHTML = "Kanto Region";
    region = "kanto";
    inicio.style.display = "none";
    // Limpiamos el contenido existente en las tarjetas
    tarjetas.innerHTML = "";
    //escuchamos el evento para realizar el cambio de paginas en las funciones correspondientes
    
    const inicioIndice = (pagina - 1) * tarjetaPorPagina;
    const fin = Math.min(inicioIndice + tarjetaPorPagina, pokemonsKanto);

    for(let i = inicioIndice; i < fin; i++) {
      //console.log(data.pokemon[i].type);
      const numPkn = document.createTextNode("No. " + data.pokemon[i].num);
      const nombrePkn = document.createTextNode((data.pokemon[i].name).toUpperCase());
      const altPkn = document.createTextNode("Height: " + (data.pokemon[i].size.height));
      const pesoPkn = document.createTextNode("Weight: " + (data.pokemon[i].size.weight));
      const picture = document.createElement('picture');
      picture.classList = 'pokemon-card';
      const img = document.createElement('img');
      img.src = data.pokemon[i].img;
      picture.appendChild(img);
      const figCaption = document.createElement('figcaption');
      figCaption.classList = 'textoFrente';
      figCaption.appendChild(numPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(nombrePkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(altPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(pesoPkn);
      picture.appendChild(figCaption);
      tarjetas.appendChild(picture);
    }  
    // Mostrar el botón "return"
    btnCambio.style.display = "block";
    // Mostrar las tarjetas y ocultar el inicio
    tarjetas.style.display = "block";
    inicio.style.display = "none";
    cargarPokemonesKanto(numeroPagina);
  } 
  function pagSiguiente() {
    //sirve para limitar el numero de paginas para Kango son 151 pokemons y se necesitan 6 paginas
    const numPokemonsKanto = 151; 
    const numPokemonsJohto = 100;
    //para Johto son 100 pokemons a mostrar y se necesitan 4 paginas
    if(region === "kanto"){
      if(numeroPagina === Math.ceil(numPokemonsKanto / tarjetaPorPagina)){
        return;
      }
      numeroPagina++;
      cargarPokemonesKanto(numeroPagina);
    }else if(region === "johto"){
      if(numeroPagina === Math.ceil(numPokemonsJohto / tarjetaPorPagina)){
        return;
      }
      numeroPagina++;
      cargarPokemonesJohto(numeroPagina);
    }
  }
  //funcion para pagina anterior
  function pagAnterior() {
    //si estan en la primera pagina y si se presiona el boton de anterior no mande a pagina en blanco
    if(numeroPagina === 1){
      return;
    }
    numeroPagina--; 
    //muestraPagina(numeroPagina);
    if(region === "kanto"){
      cargarPokemonesKanto(numeroPagina);
    }else if(region === "johto"){
      cargarPokemonesJohto(numeroPagina);
    }
  }

  function cargarPokemonesJohto(pagina) {
    inicio.style.display = "none";
    marquesina.innerHTML = "Johto Region";
    region = "johto";
    // Limpiamos el contenido existente en las tarjetas
    tarjetas.innerHTML = "";
    //escuchamos el evento para realizar el cambio de paginas en las funciones correspondientes  
    const inicioIndice = pokemonsJohto + (pagina - 1) * tarjetaPorPagina;
    const fin = inicioIndice + tarjetaPorPagina;

    for(let i = inicioIndice; i < fin; i++) {
      //console.log(data.pokemon[i].type);
      const numPkn = document.createTextNode("No. " + data.pokemon[i].num);
      const nombrePkn = document.createTextNode((data.pokemon[i].name).toUpperCase());
      const altPkn = document.createTextNode("Height: " + (data.pokemon[i].size.height));
      const pesoPkn = document.createTextNode("Weight: " + (data.pokemon[i].size.weight));
      const picture = document.createElement('picture');
      picture.classList = 'pokemon-card';
      const img = document.createElement('img');
      img.src = data.pokemon[i].img;
      picture.appendChild(img);
      const figCaption = document.createElement('figcaption');
      figCaption.classList = 'textoFrente';
      figCaption.appendChild(numPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(nombrePkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(altPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(pesoPkn);
      picture.appendChild(figCaption);
      tarjetas.appendChild(picture);
    }  
    // Mostrar el botón "return"
    document.getElementById("cambioRegion").style.display = "block";  
    // Mostrar las tarjetas y ocultar el inicio
    //document.getElementById("marquesina").style.display = "none";
    btnAnterior.style.display = "inline-block";
    btnSiguiente.style.display = "inline-block";
  }
  btnCambio.addEventListener("click", function(){
    numeroPagina = 1;
    if(region === "kanto"){
      cargarPokemonesJohto(numeroPagina);
    }else if(region === "johto"){
      cargarPokemonesKanto(numeroPagina);
    }
  })
});
//import = data.js;
