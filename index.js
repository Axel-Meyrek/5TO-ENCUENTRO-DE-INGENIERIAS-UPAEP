/* VARIABLES Y COMPONENTES */
let charlas = [];

const $buttonDias = document.querySelectorAll('.programa_button');

const $charlas = document.querySelector('#charlas');



/* FUNCIONES */
const addEventButtons = () => $buttonDias.forEach(button => button.addEventListener('click', renderCharlas));

const desactiveAllButtons = () => $buttonDias.forEach(button => button.classList.remove('buttonActive'));

const consumirDatos = async () => {
    const response = await fetch('charlas.json');
    const data = await response.json();
    charlas = data.charlas;
    renderCharlas();
}

const renderCharlas = (e) => {
    let diaSeleccionado;

    if(e == undefined){
        diaSeleccionado = 'Lunes';
    }else{
        diaSeleccionado = e.target.textContent;
        desactiveAllButtons();
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





/* EVENTOS */
document.addEventListener('DOMContentLoaded', addEventButtons);

document.addEventListener('DOMContentLoaded', consumirDatos);