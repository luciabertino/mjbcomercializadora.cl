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



    if(input && Number(input.value)>1){


        input.value = Number(input.value)-1;


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


            nombre:nombre,

            precio:precio,

            cantidad:cantidad


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
            ${producto.cantidad} x $${producto.precio}
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



if(buscador){



    buscador.addEventListener("keyup",()=>{


        let texto = buscador.value.toLowerCase().trim();



        // Más adelante aquí conectaremos productos.js



        console.log("Buscando:", texto);



    });



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

    "https://wa.me/56964240040?text=" + mensaje,

    "_blank"

    );



});



}