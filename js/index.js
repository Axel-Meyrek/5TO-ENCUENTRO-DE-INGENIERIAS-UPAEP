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
    const response = await fetch('../charlas.json');
    const data = await response.json();
    charlas = data.charlas;
    renderCharlas();
}

const renderCharlas = (e) => {
    let diaSeleccionado;

    if(e == undefined){
        diaSeleccionado = 'Lunes';
    }else{
        desactiveAllButtons();
        e.target.classList.add('buttonActive');
        diaSeleccionado = e.target.textContent;

    }

    const charlasSeleccionadas = charlas.filter(charla => charla.dia === diaSeleccionado);

    $charlas.innerHTML = '';

    charlasSeleccionadas.forEach(charla => {
        /* DESECTRUCTURACIÓN */
        const {hora, titulo, ponente, subtitulo, descripcion, ubicacion} = charla;
        const $charla = /* html */
            ` <article class="charlas">
                    <p class="charlas_hora">${hora}</p>
                    <h3 class="charlas_title">${titulo}</h3>
                    <h4 class="charlas_ponente">${ponente}</h4>
                    <p class="charlas_subtitle">${subtitulo}</p>
                    <p class="charlas_description">${descripcion}</p>
                    <p class="charlas_ubicacion">📍 ${ubicacion}</p>
                </article>`;

        $charlas.innerHTML += $charla;
    });
}

/* const calcularTiempoPasado = () => {
    const fechaReferencia = new Date('2023-10-07T00:00:00');

    const fechaActual = new Date();
    const diferencia = fechaActual - fechaReferencia;

    // Convertir la diferencia de milisegundos a meses, días, horas, minutos y segundos
    let segundos = Math.floor(diferencia / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    // Calcular los segundos restantes después de calcular los meses, días, horas y minutos
    const segundosRestantes = segundos % 60;

    dias = Math.floor(dias % 30.436875) // Resto de días
    horas = horas % 24
    minutos = minutos % 60
    segundos = segundosRestantes

    $dias.textContent = dias;
    $horas.textContent = horas;
    $minutos.textContent = minutos;
    $segundos.textContent = segundos;
}

const iniciarContador = () => {
    setTimeout
}
 */




/* EVENTOS */
document.addEventListener('DOMContentLoaded', addEventButtons);

document.addEventListener('DOMContentLoaded', consumirDatos);