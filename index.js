/* VARIABLES Y COMPONENTES */
let charlas = [];

const $buttonDias = document.querySelectorAll('.programa_button');

const $charlas = document.querySelector('#charlas');



/* FUNCIONES */
const addEventButtons = () => {
    $buttonDias.forEach(button => button.addEventListener('click', renderCharlas));
}

const consumirDatos = async () => {
    const response = await fetch('charlas.json');
    const data = await response.json();
    charlas = data.charlas;
}

const renderCharlas = (e) => {
    const diaSeleccionado = e.target.textContent;
    
    const charlasSeleccionadas = charlas.filter(charla => charla.dia === diaSeleccionado);

    $charlas.innerHTML = '';
    charlasSeleccionadas.forEach(charla => {
        const $charla = /* html */
                ` <article class="charlas">
                    <p class="charlas_hora">${charla.hora}</p>
                    <h3 class="charlas_title">${charla.titulo}</h3>
                    <h4 class="charlas_ponente">${charla.ponente}</h4>
                    <p class="charlas_subtitle">${charla.subtitulo}</p>
                    <p class="charlas_description">${charla.descripcion}</p>
                    <p class="charlas_ubicacion">📍 ${charla.ubicacion}</p>
                </article>`;

        $charlas.innerHTML += $charla;
})


}




/* EVENTOS */
document.addEventListener('DOMContentLoaded', addEventButtons);

document.addEventListener('DOMContentLoaded', consumirDatos);