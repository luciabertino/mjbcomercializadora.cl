// ================= SLIDER =================


const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");

const next = document.getElementById("next");
const prev = document.getElementById("prev");


let currentSlide = 0;



function mostrarSlide(){

    if(slides){

        slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    }

}




if(next && prev && slides){


    next.addEventListener("click",()=>{


        currentSlide++;


        if(currentSlide >= slideItems.length){

            currentSlide = 0;

        }


        mostrarSlide();


    });





    prev.addEventListener("click",()=>{


        currentSlide--;


        if(currentSlide < 0){

            currentSlide = slideItems.length - 1;

        }


        mostrarSlide();


    });




    setInterval(()=>{


        currentSlide++;


        if(currentSlide >= slideItems.length){

            currentSlide = 0;

        }


        mostrarSlide();


    },5000);



}






// ================= CANTIDADES =================



function sumarCantidad(id){


    let input = document.getElementById("cantidad"+id);


    if(input){

        input.value = Number(input.value) + 1;

    }


}






function restarCantidad(id){


    let input = document.getElementById("cantidad"+id);



    if(input && Number(input.value) > 1){


        input.value = Number(input.value) - 1;


    }


}



// ================= CARRITO =================



let carrito = [];



const cartCount = document.getElementById("cart-count");

const listaCarrito = document.getElementById("listaCarrito");

const total = document.getElementById("total");







function agregarCarrito(nombre, precio, id){



    let input = document.getElementById("cantidad"+id);



    let cantidad = 1;



    if(input){

        cantidad = Number(input.value);

    }




    let producto = carrito.find(

        item => item.nombre === nombre

    );





    if(producto){


        producto.cantidad += cantidad;


    }else{


        carrito.push({


            nombre: nombre,

            precio: precio,

            cantidad: cantidad


        });


    }




    actualizarCarrito();



}









function actualizarCarrito(){



    if(!listaCarrito) return;



    listaCarrito.innerHTML = "";



    let suma = 0;

    let cantidadTotal = 0;






    carrito.forEach((producto,index)=>{



        suma += producto.precio * producto.cantidad;


        cantidadTotal += producto.cantidad;






        listaCarrito.innerHTML += `



        <div class="item-carrito">


            <h4>
                ${producto.nombre}
            </h4>


            <p>
                ${producto.cantidad} x $${producto.precio.toLocaleString("es-CL")}
            </p>



            <button onclick="eliminarProducto(${index})">

                Eliminar

            </button>


        </div>


        `;



    });







    if(carrito.length === 0){


        listaCarrito.innerHTML =

        "<p>Tu carrito está vacío</p>";


    }







    if(cartCount){

        cartCount.textContent = cantidadTotal;

    }







    if(total){

        total.textContent =

        "$" + suma.toLocaleString("es-CL");

    }



}









function eliminarProducto(index){


    carrito.splice(index,1);


    actualizarCarrito();



}






// ================= OFERTAS =================



function agregarOferta(nombre, precio){


    let producto = carrito.find(

        item => item.nombre === nombre

    );



    if(producto){


        producto.cantidad += 1;


    }else{


        carrito.push({


            nombre: nombre,

            precio: precio,

            cantidad: 1


        });


    }



    actualizarCarrito();



}






// ================= BOTÓN OFERTA =================



function cambiarBoton(boton){


    boton.textContent = "✓ Agregado";


    boton.disabled = true;



    setTimeout(()=>{


        boton.textContent = "🛒 Agregar al carrito";


        boton.disabled = false;


    },1500);



}









// ================= ABRIR Y CERRAR CARRITO =================



const abrirCarrito = document.getElementById("abrirCarrito");

const cerrarCarrito = document.getElementById("cerrarCarrito");

const carritoPanel = document.getElementById("carritoPanel");







if(abrirCarrito && carritoPanel){


    abrirCarrito.addEventListener("click",()=>{


        carritoPanel.classList.add("active");


    });


}








if(cerrarCarrito && carritoPanel){


    cerrarCarrito.addEventListener("click",()=>{


        carritoPanel.classList.remove("active");


    });


}






// ================= BUSCADOR =================


const buscador = document.getElementById("buscar");

const botonBuscar = document.querySelector(".search button");


// Categorías donde están todos los productos

const paginasProductos = [

    "limpieza.html",
    "abarrotes.html",
    "higiene.html",
    "mascotas.html"

];


// Detectar en qué página estamos

const paginaActual =

    window.location.pathname.split("/").pop() || "index.html";



// -------------------------------------------------
// NORMALIZAR TEXTO
// Permite buscar sin preocuparse por mayúsculas,
// tildes o acentos.
// -------------------------------------------------

function normalizarTexto(texto){

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .trim();

}



// -------------------------------------------------
// MOSTRAR PRODUCTOS DE LA PÁGINA ACTUAL
// -------------------------------------------------

function filtrarProductosActuales(texto){

    const productos = document.querySelectorAll(".product");

    let encontrados = 0;


    productos.forEach(producto => {

        const contenido =
            normalizarTexto(producto.textContent);


        if(contenido.includes(normalizarTexto(texto))){

            producto.style.display = "";

            encontrados++;

        }else{

            producto.style.display = "none";

        }

    });


    mostrarMensajeBusqueda(encontrados, texto);


    return encontrados;

}



// -------------------------------------------------
// MENSAJE DE BÚSQUEDA
// -------------------------------------------------

function mostrarMensajeBusqueda(cantidad, texto){

    let mensaje =
        document.getElementById("mensajeBusqueda");


    if(!mensaje){

        mensaje = document.createElement("p");

        mensaje.id = "mensajeBusqueda";

        mensaje.style.textAlign = "center";

        mensaje.style.fontSize = "18px";

        mensaje.style.margin = "30px";

        mensaje.style.color = "#063d2d";

        const productosSection =
            document.querySelector(".products");


        if(productosSection){

            productosSection.appendChild(mensaje);

        }

    }


    if(!texto){

        mensaje.textContent = "";

        return;

    }


    if(cantidad === 0){

        mensaje.textContent =
            "No encontramos productos con esa búsqueda.";

    }else{

        mensaje.textContent = "";

    }

}



// -------------------------------------------------
// LIMPIAR FILTRO
// -------------------------------------------------

function limpiarBusqueda(){

    const productos =
        document.querySelectorAll(".product");


    productos.forEach(producto => {

        producto.style.display = "";

    });


    const mensaje =
        document.getElementById("mensajeBusqueda");


    if(mensaje){

        mensaje.textContent = "";

    }

}



// -------------------------------------------------
// BUSCAR EN OTRA PÁGINA
// -------------------------------------------------

async function buscarEnOtraPagina(texto){

    const busqueda =
        normalizarTexto(texto);


    // Primero buscamos en las categorías

    for(const pagina of paginasProductos){

        // No necesitamos volver a buscar
        // en la página donde ya estamos

        if(pagina === paginaActual){

            continue;

        }


        try{

            const respuesta =
                await fetch(pagina);


            if(!respuesta.ok){

                continue;

            }


            const html =
                await respuesta.text();


            const parser =
                new DOMParser();


            const documento =
                parser.parseFromString(
                    html,
                    "text/html"
                );


            const productos =
                documento.querySelectorAll(".product");


            let encontrado = false;


            productos.forEach(producto => {

                const contenido =
                    normalizarTexto(
                        producto.textContent
                    );


                if(contenido.includes(busqueda)){

                    encontrado = true;

                }

            });


            // Si encontró el producto,
            // vamos a esa categoría

            if(encontrado){

                window.location.href =
                    pagina +
                    "?buscar=" +
                    encodeURIComponent(texto);

                return;

            }


        }catch(error){

            console.log(
                "No se pudo revisar " + pagina,
                error
            );

        }

    }


    // -------------------------------------------------
    // SI NO ENCONTRÓ NADA
    // -------------------------------------------------

    mostrarMensajeBusqueda(0, texto);

}



// -------------------------------------------------
// REALIZAR BÚSQUEDA
// -------------------------------------------------

async function realizarBusqueda(){

    if(!buscador){

        return;

    }


    const texto =
        buscador.value.trim();


    // Si está vacío

    if(texto === ""){

        limpiarBusqueda();

        return;

    }


    // Primero busca en la página actual

    const encontrados =
        filtrarProductosActuales(texto);


    // Si encontró productos aquí,
    // NO cambia de página.

    if(encontrados > 0){

        return;

    }


    // Si no encontró aquí,
    // busca en las otras categorías.

    await buscarEnOtraPagina(texto);

}



// -------------------------------------------------
// BUSCAR MIENTRAS ESCRIBES
// -------------------------------------------------

if(buscador){

    buscador.addEventListener("input",()=>{

        const texto =
            buscador.value.trim();


        if(texto === ""){

            limpiarBusqueda();

            return;

        }


        // Mientras escribe solamente
        // filtramos la página actual.

        filtrarProductosActuales(texto);

    });

}



// -------------------------------------------------
// BOTÓN DE LA LUPA
// -------------------------------------------------

if(botonBuscar){

    botonBuscar.addEventListener("click",()=>{

        realizarBusqueda();

    });

}



// -------------------------------------------------
// ENTER
// -------------------------------------------------

if(buscador){

    buscador.addEventListener("keydown",(e)=>{

        if(e.key === "Enter"){

            e.preventDefault();

            realizarBusqueda();

        }

    });

}



// -------------------------------------------------
// RECIBIR BÚSQUEDA DESDE OTRA CATEGORÍA
// -------------------------------------------------

const parametros =
    new URLSearchParams(window.location.search);


const busquedaRecibida =
    parametros.get("buscar");



if(busquedaRecibida && buscador){

    buscador.value =
        busquedaRecibida;


    // Esperamos un poquito para asegurarnos
    // de que los productos ya estén cargados.

    setTimeout(()=>{

        filtrarProductosActuales(
            busquedaRecibida
        );

    },100);

}



// ================= WHATSAPP =================



const whatsappBtn = document.getElementById("whatsappBtn");





if(whatsappBtn){



    whatsappBtn.addEventListener("click",()=>{



        let nombreCliente =

        document.getElementById("nombreCliente")?.value || "";



        let telefonoCliente =

        document.getElementById("telefonoCliente")?.value || "";



        let direccionCliente =

        document.getElementById("direccionCliente")?.value || "";



        let pagoCliente =

        document.getElementById("pagoCliente")?.value || "";






        let mensaje =

        "Hola MJB, quiero realizar un pedido:%0A%0A";









        carrito.forEach(producto=>{



            mensaje +=

            `• ${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}%0A`;


        });








        mensaje += `%0ACliente: ${nombreCliente}`;

        mensaje += `%0ATeléfono: ${telefonoCliente}`;

        mensaje += `%0ADirección: ${direccionCliente}`;

        mensaje += `%0AForma de pago: ${pagoCliente}`;









        window.open(

            "https://wa.me/56984996669?text=" + mensaje,

            "_blank"

        );



    });



}