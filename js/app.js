const COSTO_BASE=500;

const selectorPropiedad=document.getElementById("propiedad");
const selectorUbicacion=document.getElementById("ubicacion");
const inputMetros=document.getElementById("metros2");
const spanValor=document.getElementById("valorPoliza");
const botonCotizar=document.querySelector(".button-outline");
const divQuote=document.querySelector(".div-quote"); 
const gifCargando=document.getElementById("gifCargando");

function cargarComboPropiedad(){
    let opciones="<option selected disabled>...</option>";
    for (let i=0; i<datosPropiedad.length;i++){
        opciones+=`<option value="${datosPropiedad[i].factor}">${datosPropiedad[i].tipo}</option>`;
    }
    selectorPropiedad.innerHTML=opciones;
}

function cargarComboUbicacion(){
    let opciones="<option selected disabled>...</option>";
    for (let i=0;i<datosUbicacion.length;i++){
        opciones+=`<option value="${datosUbicacion[i].factor}">${datosUbicacion[i].tipo}</option>`;
    }
    selectorUbicacion.innerHTML=opciones;
}

function obtenerFactor(array,valorSeleccionado){
    for (let i=0;i<array.length;i++){
        if (array[i].factor===parseFloat(valorSeleccionado)){
            return array[i];
        }
    }
    return null;
}

function cotizar(){
    const fmPropiedad=obtenerFactor(datosPropiedad, selectorPropiedad.value);
    const fmUbicacion=obtenerFactor(datosUbicacion, selectorUbicacion.value);
    const metros=parseInt(inputMetros.value, 10);

    /* validaciones si no existen en consola */
    if (!fmPropiedad) {
        Toastify({
        text: "Por favor, seleccioná el tipo de propiedad.",
        duration: 3500,
        gravity: "top",
        position: "center",
        style: { background: "#c0392b", borderRadius: "0.5rem" }
    }).showToast();
        return;
    }

    if (!fmUbicacion) {
        Toastify({
        text: "Por favor, seleccioná la Ubicacion.",
        duration: 3500,
        gravity: "top",
        position: "center",
        style: { background: "#c0392b", borderRadius: "0.5rem" }
    }).showToast();
        return;
    }

    if (isNaN(metros) || metros<20 || metros>500) {
        Toastify({
        text: "Los metros cuadrados deben ser un entero entre 20 y 500.",
        duration: 3500,
        gravity: "top",
        position: "center",
        style: { background: "#c0392b", borderRadius: "0.5rem" }
    }).showToast();
        return;
    }

    divQuote.classList.add("div-blocked");

    botonCotizar.innerHTML=`<img src="./images/animation.gif" alt="Cargando..." style="height:20px;">`; //imagen en boton

  setTimeout(()=>{ //calculos que hace en la espera

    const totalPoliza=COSTO_BASE*metros*fmPropiedad.factor*fmUbicacion.factor;

    const totalFormateado=totalPoliza.toFixed(2); //2 decimales

    console.log("El valor de la póliza es: $"+totalFormateado);

    spanValor.textContent=totalFormateado;

    botonCotizar.innerHTML="Cotizar";
    divQuote.classList.remove("div-blocked");

}, 1500);
}

cargarComboPropiedad();
cargarComboUbicacion();
botonCotizar.addEventListener("click", cotizar);