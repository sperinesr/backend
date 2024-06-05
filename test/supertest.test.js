// ANTES DE COMENZAR, INICIALIZAR SERVIDOR npm run dev Y EN OTRA TERMINAL USAR
// npm run supertest

// importamos supertest
const supertest = require("supertest");

let expect;

// importamos chai, recordar que es libreria de aserciones para node.js
before(async function () {
    const chai = await import("chai")
    expect = chai.expect
})

// generamos un requester, que se encargara de hacer las peticiones al servidor
const requester = supertest("http://localhost:8080")

// trabajaremos con describe. uno referencia a la aplicacion en general y el otro para cada
// entidad que queremos testear
describe("Testing de la APP de ventas", () => {

    describe("Testing de productos: ", () => {

        it("POST /api/products debe crear un producto correctamente", async () => {
            // creando mock de producto
            const productTest = {
                title: "ejemplo1",
                description: "ejemplo1",
                code: "ejemplo1",
                price: 123,
                status: true,
                stock: 123,
                category: "ejemplo1",
                thumbnail: "ejemplo1",
                owner: "6602333100c4581d0ae6aff5"
            }
            // recuerda: de requester puedo recibir estos datos, statusCode, ok, _body
            const { body } = await requester.post("/api/products").send(productTest)

            // mostramos por consola
            // console.log(statusCode)
            // console.log(ok)
            // console.log(body)

            // ahora evaluamos, si el payload que me envian tiene un _id, quiere decir que
            // se pudo crear correctamente
            expect(body.products).to.have.property("_id")
        })

        it("POST /api/products debe comprobar que el producto cuente con la propiedad status:true", async () => {
            const productTest = {
                title: "ejemplo2",
                description: "ejemplo2",
                code: "ejemplo2",
                price: 123,
                status: true,
                stock: 123,
                category: "ejemplo2",
                thumbnail: "ejemplo2",
                owner: "6602333100c4581d0ae6aff5"
            }

            const { statusCode, body } = await requester.post("/api/products").send(productTest)

            expect(statusCode).to.equal(200)
            expect(body.products).to.have.property("status").that.equals(true)
        })

        it("POST /api/products sin title debe retornar un status 500", async () => {

            const productTestSinTitle = {
                description: "ejemplo3",
                code: "ejemplo3",
                price: 123,
                status: true,
                stock: 123,
                category: "ejemplo3",
                thumbnail: "ejemplo3",
                owner: "6602333100c4581d0ae6aff5"
            }

            const { statusCode } = await requester.post("/api/products").send(productTestSinTitle)

            expect(statusCode).to.equal(500)
        })

        it("GET /api/products debe tener los campos status y products. Products debe ser un array", async () => {

            const { statusCode, body } = await requester.get("/api/products")

            expect(statusCode).to.equal(200)
            expect(body.products).that.is.an("array")
        })

        it("PUT /api/products debe actualizar correctamente, comprobando el antes y el despues", async () => {

            const productoExistente = "65d7d85a05432d890a5f26cd"

            const actualizar = {
                title: "testUpdate",
                description: "testUpdate",
                code: "testUpdate",
                category: "testUpdate",
                thumbnail: "testUpdate",
            }

            const { statusCode } = await requester.put(`/api/products/${productoExistente}`).send(actualizar)

            expect(statusCode).to.equal(200)
        })

        it("DELETE /api/products debe eliminar un producto", async () => {

            const productTest = {
                title: "ejemplo4",
                description: "ejemplo4",
                code: "ejemplo4",
                price: 123,
                status: true,
                stock: 123,
                category: "ejemplo4",
                thumbnail: "ejemplo4",
                owner: "6602333100c4581d0ae6aff5"
            }

            //creando producto
            const { body: { products: { _id } } } = await requester.post("/api/products").send(productTest)

            // borrar el producto agregado
            const { statusCode } = await requester.delete(`/api/products/${_id}`)

            expect(statusCode).to.equal(200)
        })
    })

    describe("Testing de carrito: ", () => {

        it("POST /api/users/register debe crear un carrito al registrar un usuario", async () => {

            const usuarioTest = {
                first_name: "test1",
                last_name: "test1",
                email: "test1@test1.test1",
                password: "test1",
                age: 1
            }

            const { statusCode, body } = await requester.post("/api/users/register").send(usuarioTest)

            // validamos que se genero el usuario correctamente
            expect(statusCode).to.equal(200)
            expect(body.user).to.have.property("cart")
        })

        it("POST /api/carts/:cid/products/:pid` debe agregar producto al carrito", async () => {

            const cid = "6602333000c4581d0ae6aff3"
            const pid = "65d7d85a05432d890a5f26cd"

            const { statusCode } = await requester.post(`/api/carts/${cid}/products/${pid}`)

            // validamos que se mueva a la vista productos despues de agregar
            expect(statusCode).to.equal(302)
        })
    })

    // describe("Test avanzado", () => {
    //     // declaramos cookie de forma local que se usara en las pruebas
    //     let cookie

    //     it("Registramos el usuario", async () => {

    //         const mockusuario = {
    //             first_name: "juanpi",
    //             last_name: "jacob",
    //             email: "123@123.123",
    //             password: "1234"
    //         }

    //         const { body } = await requester.post("/api/sessions/register").send(mockusuario)

    //         // validamos que se genero el usuario correctamente
    //         expect(body.payload).to.be.ok
    //     })

    //     it("logeando al usuario", async () => {
    //         // enviamos email y pass

    //         const datoslogin = {
    //             email: "123@123.123",
    //             password: "1234"
    //         }

    //         const resultado = await requester.post("/api/sessions/login").send(datoslogin)

    //         // del header de la peticion recuperamos la cookie
    //         const cookieresultado = resultado.headers['set-cookie']['0']

    //         // verificar que la cookie recuperada exista
    //         expect(cookieresultado).to.be.ok

    //         // separamos el nombre y valor de la cookie y se guardan en un objeto
    //         cookie = {
    //             name: cookieresultado.split("=")['0'],
    //             value: cookieresultado.split("=")['1']
    //         }

    //         // se verifica que el nombre de la cookie sea igual a coderCookie
    //         expect(cookie.name).to.be.equal("coderCookie")
    //         expect(cookie.value).to.be.ok
    //     })

    //     // probamos ingresar a la ruta current
    //     it("Debe enviar la cookie que contiene el usuario", async () => {

    //         // enviamos la cookie
    //         const { body } = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`])

    //         // verificamos que retorne el email
    //         expect(body.payload.email).to.be.equal("123@123.123")
    //     })
    // })

    // TESTING DE CARGA DE IMAGENES
    // describe("Tester de carga de imagenes", () => {

    //     it("creamos mascota con imagen", async () => {

    //         const mascotaimagen = {
    //             name: "michi",
    //             specie: "esa",
    //             birthDate: "2020-12-12"
    //         }

    //         // no usamos metodo send, sino que field para los distintos campos
    //         const resultado = await requester.post("/api/pets/withimage")
    //             .field("name", mascotaimagen.name)
    //             .field("specie", mascotaimagen.specie)
    //             .field("birthDate", mascotaimagen.birthDate)
    //             .attach("image", "./test/cat.webp")

    //         // verificamos
    //         expect(resultado.status).to.be.equal(200)
    //         expect(resultado._body.payload).to.have.property("_id")
    //         expect(resultado._body.payload.image).to.be.ok
    //     })
    // })

    describe("Testing de sesiones: ", () => {
        // proximamente
    })
})
