const generarInfoError = (cart) => {

    return `Los datos estan incompletos o invalidos.
    necesitamos recibir:
    -carritoID: String, pero recibimos ${cart.id}
    -productoID: String, pero recibimos ${cart.products.product}`;
}

module.exports = {
    generarInfoError
}