const carousel = document.querySelector("#carousel-inner");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const track = document.querySelector("#track");

async function consultar() {
  const API_KEY = '563492ad6f91700001000001615be130669346a4b8f9a4f750c52e3b';
  const apiURL = 'https://api.pexels.com/v1/search?query=guitar';
  const respuesta = await fetch(apiURL, {
    method: 'GET',
    headers:{
      Accept: 'application/json',
      Authorization: API_KEY
    }
  }).then(response => response.json());
  let i = 0;
  const photosLength = respuesta.photos.map((photo) => {
    return photo.src.original;
  });

  while(i < photosLength.length) {
    let photosHTML = `
    <div class="photo">
      <img src='${photosLength[i]}'/>
    </div>
    `;
    let divPhotos = document.getElementById("gallery_photos");
    divPhotos.innerHTML += photosHTML;
    i++;
  }
}
document.addEventListener('DOMContentLoaded', ()=>{
  consultar();
})



const carousel2 = document.querySelector(
  "#carousel-inner2"
);
const prev2 = document.querySelector("#prev2");
const next2 = document.querySelector("#next2");
const track2 = document.querySelector("#track2");

function slider(prev, next, track, carousel) {
  let carouselWidth = carousel.offsetWidth;
  let index = 0;

  window.addEventListener("resize", () => {
    carouselWidth = carousel.offsetWidth;
  });

  next.addEventListener("click", () => {
    index++;
    prev.classList.add("show");
    track.style.transform = `translateX(-${
      index * carouselWidth
    }px)`;
    if (
      track.offsetWidth - (index + 1) * carouselWidth <
      carouselWidth
    ) {
      next.classList.add("hide");
    }
  });
  prev.addEventListener("click", () => {
    index--;
    next.classList.remove("hide");
    if (index === 0) {
      prev.classList.remove("show");
    }
    track.style.transform = `translateX(-${
      index * carouselWidth
    }px)`;
  });
}

slider(prev, next, track, carousel);
slider(prev2, next2, track2, carousel2);

const rowTable = document.getElementById("rowTable");
let itemsTable = [
  {
    day: "9 de Mayo",
    hour: "8:00am",
    level: "I",
    site: "Sede calle 98",
  },
  {
    day: "10 de Mayo",
    hour: "9:00am",
    level: "II",
    site: "Sede CC Santafe",
  },
  {
    day: "11 de Mayo",
    hour: "10:00am",
    level: "III",
    site: "Sede CC Titan",
  },
  {
    day: "11 de Mayo",
    hour: "11:00am",
    level: "IV",
    site: "Sede CC Andino",
  },
  {
    day: "12 de Mayo",
    hour: "2:00pm",
    level: "V",
    site: "Sede CC Multiplaza",
  }
];

let htmlTable1 = `
<table class="table__Free">
  <tr>
    <th
      colspan="4"
      class="border-0 text-center p-3 bg-table"
    >
      Dias gratuitos
    </th>
  </tr>
  <tr class="text-center p-4 bg-silver">
    <th>Dia</th>
    <th>Hora</th>
    <th>Nivel</th>
    <th>Lugar</th>
  </tr>
  ${itemsTable.map(function (item) {
    return `
    <tr class="text-center">
      <td><h3>${item.day}</h3></td>
      <td><h3>${item.hour}</h3></td>
      <td><h3>${item.level}</h3></td>
      <td><h3>${item.site}</h3></td>
    </tr>
    `
  }).join('')
}
</table>
`;

rowTable.innerHTML = htmlTable1;


let enviar = document.getElementById('enviar');
enviar.addEventListener("click", captura);

function alerta(tipo, mensaje) {
  let div_bloqueo = document.createElement("div");
  let div_contenedor = document.createElement("div");
  let h3_titulo = document.createElement("h3");
  let label_mensaje = document.createElement("label");
  let boton_cerrar = document.createElement("a");

  div_bloqueo.classList.add("div_bloqueo");
  div_contenedor.classList.add("div_contenedor");

  if(tipo === "correcto") {
    div_contenedor.style.backgroundColor = "#1B5E20";
    h3_titulo.appendChild(document.createTextNode("Correcto"));
  }
  if(tipo === "error") {
    div_contenedor.style.backgroundColor = "#b71c1c";
    h3_titulo.appendChild(document.createTextNode("Error"));
  }
  if(tipo === "aviso") {
    div_contenedor.style.backgroundColor = "#E65100";
    h3_titulo.appendChild(document.createTextNode("Aviso "));
  }
  if(tipo === "informacion") {
    div_contenedor.style.backgroundColor = "#0D47A1";
    h3_titulo.appendChild(document.createTextNode("Informacion"));
  }

  label_mensaje.appendChild(document.createTextNode(mensaje));
  boton_cerrar.appendChild(document.createTextNode("Cerrar"));

  boton_cerrar.onclick = function() {
    document.body.removeChild(document.getElementsByClassName("div_bloqueo")[0]);
  }

  div_bloqueo.appendChild(div_contenedor);
  div_contenedor.appendChild(h3_titulo);
  div_contenedor.appendChild(label_mensaje);
  div_contenedor.appendChild(boton_cerrar);

  let elementosBloqueo = document.getElementsByClassName("div_bloqueo");

  for(let i = 0; i < elementosBloqueo.length; i++) {
    document.body.removeChild(elementosBloqueo[i]);
  }

  document.body.appendChild(div_bloqueo);
}

function captura(e){
  e.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let date = document.getElementById('date').value;
  let matter = document.getElementById('matter').value;
  let messagge = document.getElementById('messagge').value;
  let arrayData = [name, email, phone, date, matter, messagge];
  console.log("Array", arrayData);
  if(arrayData.includes('')) {
    return alerta("error", "Todos los campos deben ser diligenciados");
  }
  alerta("correcto", "Todos los datos han sido llenados");
  localStorage.setItem('myArray', JSON.stringify(arrayData));
}
