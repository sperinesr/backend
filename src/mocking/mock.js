const { faker } = require("@faker-js/faker")

const generarProductos = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.uuid(),
        price: faker.commerce.price(),
        status: parseInt(faker.string.numeric({ exclude: ['2', '3', '4', '5', '6', '7', '8', '9'] })),
        stock: parseInt(faker.string.numeric()),
        category: faker.commerce.department(),
        thumbnail: faker.image.url()
    }
}

module.exports = generarProductos