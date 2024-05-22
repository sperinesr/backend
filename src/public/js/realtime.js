const socket = io();
const owner = document.getElementById("owner").value;
const role = document.getElementById("role").value;

socket.on("productos", (data) => {
    //console.log(data);
    renderProductos(data);
})


//Función para renderizar nuestros productos: 

const renderProductos = (productos) => {

    const conteinerProducts = document.getElementById("contenedorProductos");
    conteinerProducts.innerHTML = "";

    productos.docs.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = ` 
                        <p> ${item.title} </p>
                        <p> ${item.price} </p>
                        <button> Eliminar </button>
                        `;

        conteinerProducts.appendChild(card);
        //Agregamos el evento al boton de eliminar: 
        card.querySelector("button").addEventListener("click", () => {
            // le quite la validacion del rol, porque el usuario ya es premium y solo debo isar el id para identificar al owner
            if (/*role === "premium" &&*/ item.owner === owner) {
                eliminarProducto(item._id);
            } else if (role === "admin") {
                eliminarProducto(item._id);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No tienes permiso para borrar ese producto",
                })
            }
        })
    })
}


const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
}

//Agregamos productos del formulario: 

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto();
})


const agregarProducto = () => {

    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value,
        owner: document.getElementById("owner").value
    };

    socket.emit("agregarProducto", product);
}
