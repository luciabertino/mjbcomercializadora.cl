// ==============================
// SLIDER DESLIZANTE
// ==============================


let slideActual = 0;


const slidesContainer = document.querySelector(".slides");

const slides = document.querySelectorAll(".slide");



function moverSlider(){

    slidesContainer.style.transform =
    `translateX(-${slideActual * 100}%)`;

}



function siguienteSlide(){

    slideActual++;

    if(slideActual >= slides.length){

        slideActual = 0;

    }

    moverSlider();

}



function anteriorSlide(){

    slideActual--;

    if(slideActual < 0){

        slideActual = slides.length - 1;

    }

    moverSlider();

}



document.getElementById("next")?.addEventListener(
"click",
siguienteSlide
);



document.getElementById("prev")?.addEventListener(
"click",
anteriorSlide
);



if(slides.length > 0){

    setInterval(siguienteSlide,5000);

}




// ==============================
// CARRITO
// ==============================


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



// cantidades temporales de productos

let cantidades = [
    1,
    1,
    1,
    1,
    1,
    1
];




// SUMAR CANTIDAD

function sumarCantidad(id){


    cantidades[id]++;


    let input = document.getElementById("cantidad"+id);


    if(input){

        input.value = cantidades[id];

    }


}




// RESTAR CANTIDAD

function restarCantidad(id){


    if(cantidades[id] > 1){

        cantidades[id]--;

    }


    let input = document.getElementById("cantidad"+id);


    if(input){

        input.value = cantidades[id];

    }


}





// AGREGAR AL CARRITO

function agregarCarrito(nombre, precio, id){


    let cantidad = cantidades[id];



    let producto = carrito.find(
        item => item.nombre === nombre
    );



    if(producto){


        producto.cantidad += cantidad;


    }else{


        carrito.push({

            nombre:nombre,

            precio:precio,

            cantidad:cantidad

        });


    }



    guardarCarrito();


    actualizarCarrito();



    alert("Producto agregado al carrito 🛒");


}





// GUARDAR

function guardarCarrito(){


    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );


}





// MOSTRAR CARRITO


function actualizarCarrito(){



const lista = document.getElementById("listaCarrito");

const contador = document.getElementById("cart-count");

const total = document.getElementById("total");



if(!lista) return;



lista.innerHTML="";



let suma = 0;

let cantidadTotal = 0;



if(carrito.length === 0){


    lista.innerHTML = 
    "<p>Tu carrito está vacío</p>";



}else{



    carrito.forEach((producto,index)=>{



        suma += producto.precio * producto.cantidad;


        cantidadTotal += producto.cantidad;



        lista.innerHTML += `

        <div class="item-carrito">


        <h4>${producto.nombre}</h4>


        <p>
        $${producto.precio.toLocaleString("es-CL")}
        </p>


        <button onclick="cambiarCantidad(${index},-1)">
        -
        </button>


        <span>
        ${producto.cantidad}
        </span>


        <button onclick="cambiarCantidad(${index},1)">
        +
        </button>



        <button onclick="eliminarProducto(${index})">
        🗑
        </button>



        </div>


        `;



    });



}



if(contador){

    contador.textContent = cantidadTotal;

}



if(total){

    total.textContent =
    "$"+suma.toLocaleString("es-CL");

}



}





// CAMBIAR CANTIDAD DEL CARRITO


function cambiarCantidad(index,cambio){


    carrito[index].cantidad += cambio;



    if(carrito[index].cantidad <=0){


        carrito.splice(index,1);


    }



    guardarCarrito();

    actualizarCarrito();


}





// ELIMINAR PRODUCTO


function eliminarProducto(index){


    carrito.splice(index,1);


    guardarCarrito();

    actualizarCarrito();


}






// ==============================
// ABRIR Y CERRAR CARRITO
// ==============================


const abrirCarrito =
document.getElementById("abrirCarrito");


const cerrarCarrito =
document.getElementById("cerrarCarrito");


const panel =
document.getElementById("carritoPanel");





if(abrirCarrito){


abrirCarrito.addEventListener("click",()=>{


    panel.classList.add("activo");


});


}




if(cerrarCarrito){


cerrarCarrito.addEventListener("click",()=>{


    panel.classList.remove("activo");


});


}





// ==============================
// BUSCADOR
// ==============================


const buscador =
document.getElementById("buscar");



if(buscador){



buscador.addEventListener("keyup",()=>{



let texto =
buscador.value.toLowerCase();



let productos =
document.querySelectorAll(".product");



productos.forEach(producto=>{



let nombre =
producto.querySelector("h3")
.textContent
.toLowerCase();



if(nombre.includes(texto)){


producto.style.display="block";


}else{


producto.style.display="none";


}



});



});



}





// CARGAR CARRITO AL INICIAR

actualizarCarrito();


// ==============================
// ENVIAR PEDIDO POR WHATSAPP
// ==============================


const whatsappBtn = document.getElementById("whatsappBtn");


if(whatsappBtn){


whatsappBtn.addEventListener("click",()=>{


let nombre =
document.getElementById("nombreCliente").value;


let telefono =
document.getElementById("telefonoCliente").value;


let direccion =
document.getElementById("direccionCliente").value;


let pago =
document.getElementById("pagoCliente").value;




if(carrito.length === 0){

alert("El carrito está vacío");

return;

}



if(nombre==="" || direccion==="" || pago===""){


alert("Completa los datos del pedido");

return;


}



let mensaje = 
`Hola MJB 👋%0A%0AQuiero realizar el siguiente pedido:%0A%0A`;



let total = 0;



carrito.forEach(producto=>{


let subtotal =
producto.precio * producto.cantidad;


total += subtotal;



mensaje += 
`🛒 ${producto.nombre} x${producto.cantidad} - $${subtotal.toLocaleString("es-CL")}%0A`;


});



mensaje +=
`%0A💰 Total: $${total.toLocaleString("es-CL")}%0A%0A`;



mensaje +=
`👤 Nombre: ${nombre}%0A`;

mensaje +=
`📱 Teléfono: ${telefono}%0A`;

mensaje +=
`📍 Dirección: ${direccion}%0A`;

mensaje +=
`💳 Forma de pago: ${pago}`;





let numero = "56964240040";



window.open(
"https://wa.me/"+numero+"?text="+mensaje,
"_blank"
);



});


}