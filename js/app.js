const API_KEY = "395f3228b9624e4b2be8bcbd46d3f189";  
// const API_KEY_MAPS = "AIzaSyCMuK-JPmgs2rtSwW9JVTcE_H7CPmcSBcY";
const URL = "https://openweathermap.org/api";

//buscar elementos

const boton = document.getElementById("enviar");
const buscar = document.getElementById("buscar");
const valorUltimaBusqueda = JSON.parse(localStorage.getItem('busqueda'));
// const valorUltimaBusquedaMapa = JSON.parse(localStorage.getItem('coordenadas'));

if (valorUltimaBusqueda != null) {
    clima(valorUltimaBusqueda);
    setTimeout(iniciarMap(valorUltimaBusqueda), 3000);
   
}




boton.addEventListener("click", () => {
  buscarCiudad(buscar.value);
});

function buscarCiudad(ciudad) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&units=metric&appid=${API_KEY}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (info) {
      clima(info);
      iniciarMap(info);
      guardarBusqueda(info)
    })
    .catch(function (err) {
      console.log("ERROR!", err);
    });
}



function clima(info) {
  console.log(info);

  const ciudad = document.getElementById("ciudad");
  ciudad.innerHTML = `${info.name}, ${info.sys.country}`;

  const img = document.getElementById("img");

  img.setAttribute("alt", `${info.weather[0].main}`)
  if(info.weather[0].main === 'Rain' || info.weather[0].main === 'Shower rain'){
    img.src = 'imgs/lluvia.png';
    document.getElementById("css").href = "css/estilos.css";
  }else if(info.weather[0].main == 'Clouds' || info.weather[0].main == 'Broken clouds'){
    img.src = 'imgs/nublado.png';
    document.getElementById("css").href = "css/estilos.css";
  }else if(info.weather[0].main == 'Thunderstorm'){
    img.src = 'imgs/lluvia_electrica.png';
    document.getElementById("css").href = "css/estilos.css";
  }else if(info.weather[0].main == 'Snow'){
    img.src = 'imgs/nieve.png';
    document.getElementById("css").href = "css/estilos.css";
  }else if(info.weather[0].main == 'Clear'){
    img.src = 'imgs/soleado.png';
    document.getElementById("css").href = "css/estilos2.css";
  }else if(info.weather[0].main == 'Mist'){
    img.src = 'imgs/viento.png';
    document.getElementById("css").href = "css/estilos2.css";
  }
 
  const termica = document.getElementById("termica");
  let feels_like = `${info.main.feels_like}`;
  feels_like = feels_like.substring(2, 0);
  termica.innerHTML = `${feels_like}°C`;

  const maxima = document.getElementById("maxima");
  maxima.innerHTML = `Maxima: ${info.main.temp_max}°C`;

  const minima = document.getElementById("minima");
  minima.innerHTML = `Minima: ${info.main.temp_min}°C`;
  
  const viento = document.getElementById("viento");
  viento.innerHTML = `Viento: ${info.wind.speed} km/h`;

  const humedad = document.getElementById("humedad");
  humedad.innerHTML = `Humedad: ${info.main.humidity}%`;

  const presion = document.getElementById("presion");
  presion.innerHTML = `Presion: ${info.main.pressure} hPa`;
 
 

}


function iniciarMap(info){
    console.log('mapa');
    let coord = {lat: info.coord.lat, lng: info.coord.lon};
    let map = new google.maps.Map(document.getElementById('mapa'),{
      zoom: 10,
      center: coord
    });
    let marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}

function guardarBusqueda(response){
    localStorage.setItem('busqueda', JSON.stringify(response));
}

// function guardarBusquedaMapa(coord){
//     localStorage.setItem('coordenadas', JSON.stringify(coord));
// }
