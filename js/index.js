/* VARIABLES Y COMPONENTES */
let charlas = [];

const $buttonDias = document.querySelectorAll('.programa_button');

const $charlas = document.querySelector('#charlas');

const $dias = document.querySelector('#dias');

const $horas = document.querySelector('#horas');

const $minutos = document.querySelector('#minutos');

const $segundos = document.querySelector('#segundos');


/* FUNCIONES */
const saludar = () => console.log('Hola Mundo, yo soy Axel Meyrek');

const addEventButtons = () => $buttonDias.forEach(button => button.addEventListener('click', renderCharlas));

const desactiveAllButtons = () => $buttonDias.forEach(button => button.classList.remove('buttonActive'));

const renderCharlas = (e) => {
    let diaSeleccionado;

    if (e == undefined) {
        diaSeleccionado = 'Martes 11';
    } else {
        desactiveAllButtons();
        e.target.classList.add('buttonActive');
        diaSeleccionado = e.target.textContent;

    }

    const charlasSeleccionadas = charlas.filter(charla => charla.dia === diaSeleccionado);

    $charlas.innerHTML = '';

    charlasSeleccionadas.forEach(charla => {
        const { hora, titulo, ponente, puesto, descripcion, ubicacion, tipo } = charla;
        if(tipo == 'Coloquio') $charlas.innerHTML += CharlaColoquio(hora, titulo, ponente, puesto, descripcion, ubicacion, tipo);
        else $charlas.innerHTML += Charla(hora, titulo, ponente, puesto, descripcion, ubicacion);
    });
}

const Charla = (hora, titulo, ponente, puesto, descripcion, ubicacion) => {
    return `<article class="charlas">
                <p class="charlas_hora">${hora}</p>
                <h3 class="charlas_title">${titulo}</h3>
                <h4 class="charlas_ponente">${ponente}</h4>
                <p class="charlas_subtitle">${puesto}</p>
                <p class="charlas_description">${descripcion}</p>
                <p class="charlas_ubicacion">📍 ${ubicacion}</p>
            </article>`;
}

const CharlaColoquio = (hora, titulo, ponente, puesto, descripcion, ubicacion, tipo) => {
    return `<article class="charlas">
                <p class="charlas_hora">${hora}</p>
                <h3 class="charlas_title">${titulo}</h3>
                <h4 class="charlas_ponente">${ponente}</h4>
                <p class="charlas_subtitle">${puesto}</p>
                <p class="charlas_description">${descripcion}</p>
                <div class="charlas_flex">
                    <p class="charlas_ubicacion">📍 ${ubicacion}</p>
                    <p>🎓 ${tipo}</p>
                </div>
            </article>`;
}

const tiempoFaltante = () => {
    const ahora = new Date();
    const objetivo = new Date("2025-03-11T07:00:00");

    /* 9:OO AM */
    objetivo.setHours(9);
    objetivo.setMinutes(0);
    objetivo.setSeconds(0);

    const diferencia = objetivo - ahora;

    if (diferencia <= 0) return;

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    $dias.textContent = dias < 10 ? '0' + dias : dias;
    $horas.textContent = horas % 24 < 10 ? '0' + horas % 24 : horas % 24;
    $minutos.textContent = minutos % 60 < 10 ? '0' + minutos % 60 : minutos % 60;
    $segundos.textContent = segundos % 60 < 10 ? '0' + segundos % 60 : segundos % 60;

};

const renderTime = () => {
    setInterval(tiempoFaltante, 1000);
};

const consumirAgenda = async ()  => {

    console.log('Consumiendo');
    renderLoader();

    const apiUrl = 'https://script.google.com/macros/s/AKfycbzlHXMK5RsMRl4a4SPBjovEeCQfmfnCDF5VgQ5pl8QYYQLUoOZp2WPiwV_iaICXlZLqGQ/exec';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        charlas = data;
        renderCharlas();
    } catch (error) {
        console.error("Error obteniendo los datos:", error);
    }
}

const renderLoader = () => {
    const $loader = '<span class="loader"></span>';
    $charlas.innerHTML = $loader;
}

/* EVENTOS */

document.addEventListener('DOMContentLoaded', addEventButtons);

document.addEventListener('DOMContentLoaded', consumirAgenda);

document.addEventListener('DOMContentLoaded', renderTime);

document.addEventListener('DOMContentLoaded', saludar);