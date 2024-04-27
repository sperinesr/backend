const socket = io();

socket.on("products", (data) => {
    //console.log(data);
    renderProductos(data);
})

//Función para renderizar nuestros productos: 

const renderProductos = (products) => {
    const conteinerProducts = document.getElementById("contenedorProductos");
    conteinerProducts.innerHTML = "";

    products.docs.forEach(item => {
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
            eliminarProducto(item._id);
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
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
    };

    socket.emit("agregarProducto", product);
}
