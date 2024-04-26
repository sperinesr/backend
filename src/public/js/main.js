// const socket = io()

// socket.on("products", (data) => {
//     renderProductos(data)
// })

// //funcion para renderizar productos

// const renderProductos = (products) => {
//     const containerProductos = document.getElementById("contenedorProductos")
//     containerProductos.innerHTML = "";

//     products.forEach(item => {
//         const card = document.createElement("div");
//         card.classList.add("card");

//         card.innerHTML = `
//         <p>Id: ${item.id}</p>
//         <p>Title: ${item.title}</p>
//         <p>Description: ${item.description}</p>
//         <p>Price: ${item.price}</p>
//         <p>Img: ${item.thumbnails}</p>
//         <p>Code: ${item.code}</p>
//         <p>Stock: ${item.stock}</p>
//         <p>Category: ${item.category}</p>
//         <p>Status: ${item.status}</p>
//         <button>Eliminar</button>
//         `;

//         containerProductos.appendChild(card)

//         //agregar evento a boton eliminar
//         card.querySelector("button").addEventListener("click", () => {
//             eliminarProducto(item.id)
//         })
//     })
// }

// const eliminarProducto = (id) => {
//     socket.emit("eliminarProducto", id)
// }

// //funcion para agregar productos

// document.getElementById("btnEnviar").addEventListener("click", () => {
//     agregarProducto()
// })

// const agregarProducto = () => {
//     const product = {
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         code: document.getElementById("code").value,
//         price: document.getElementById("price").value,
//         // status: document.getElementById("status").value === true,
//         stock: document.getElementById("stock").value,
//         category: document.getElementById("category").value,
//         thumbnails: document.getElementById("thumbnails").value === "sin Imagen"
//     }

//     socket.emit("agregarProducto", product)
// }
