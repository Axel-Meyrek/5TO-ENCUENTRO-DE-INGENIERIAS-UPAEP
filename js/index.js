/* VARIABLES Y COMPONENTES */
let charlas = [];

const $buttonDias = document.querySelectorAll('.programa_button');

const $charlas = document.querySelector('#charlas');

const $dias = document.querySelector('#dias');

const $horas = document.querySelector('#horas');

const $minutos = document.querySelector('#minutos');

const $segundos = document.querySelector('#segundos');



/* FUNCIONES */
const addEventButtons = () => $buttonDias.forEach(button => button.addEventListener('click', renderCharlas));

const desactiveAllButtons = () => $buttonDias.forEach(button => button.classList.remove('buttonActive'));

const consumirDatos = async () => {
    /* ESTA ES UNA FUNCIÓN DE PRUEBA */
    const response = await fetch('../charlas.json');
    const data = await response.json();
    charlas = data.charlas;
    renderCharlas();
}

const renderCharlas = (e) => {
    let diaSeleccionado;

    if (e == undefined) {
        diaSeleccionado = 'Martes';
    } else {
        desactiveAllButtons();
        e.target.classList.add('buttonActive');
        diaSeleccionado = e.target.textContent;

    }

    const charlasSeleccionadas = charlas.filter(charla => charla.dia === diaSeleccionado);

    $charlas.innerHTML = '';

    charlasSeleccionadas.forEach(charla => {
        /* DESECTRUCTURACIÓN */
        const { hora, titulo, ponente, puesto, descripcion, ubicacion } = charla;
        const $charla = /* html */
            ` <article class="charlas">
                    <p class="charlas_hora">${hora}</p>
                    <h3 class="charlas_title">${titulo}</h3>
                    <h4 class="charlas_ponente">${ponente}</h4>
                    <p class="charlas_subtitle">${puesto}</p>
                    <p class="charlas_description">${descripcion}</p>
                    <p class="charlas_ubicacion">📍 ${ubicacion}</p>
                </article>`;

        $charlas.innerHTML += $charla;
    });
}

const tiempoFaltante = () => {
    const ahora = new Date();
    const objetivo = new Date("2025-03-11T07:00:00");
    const diferencia = objetivo - ahora;

    if (diferencia <= 0) return;

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    $dias.textContent = dias;
    $horas.textContent = horas % 24;
    $minutos.textContent = minutos % 60;
    $segundos.textContent = segundos % 60;
};

const renderTime = () => {
    setInterval(tiempoFaltante, 1000);
};

const consumirAgenda = async ()  => {
    console.log('Consumiendo...')
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


/* EVENTOS */
document.addEventListener('DOMContentLoaded', addEventButtons);

document.addEventListener('DOMContentLoaded', consumirAgenda);

document.addEventListener('DOMContentLoaded', renderTime)