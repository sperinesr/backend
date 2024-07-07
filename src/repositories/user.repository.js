const UserModel = require("../models/user.model.js");

class UserRepository {
    async addUser({ first_name, last_name, email, cart, password, age }) {

        try {
            if (!first_name || !last_name || !email || !cart || !password || !age) {
                console.log("Todos los campos deben ingresarse")
                return
            }

            const exist = await UserModel.findOne({ email })


            if (exist !== null) {
                console.log("El usuario ya existe, ingresar uno diferente")
                return
            }

            const newUser = new UserModel({
                first_name,
                last_name,
                email,
                cart: cart,
                password: password,
                age
            })


            await newUser.save()

            const result = await UserModel.findOne({ email: newUser.email })

            return result

        } catch (error) {
            throw new Error("Error al agregar producto en repository");
        }
    }

    async findByEmail(email) {
        try {
            return UserModel.findOne({ email });
        } catch (error) {
            console.log("Usuario no existe")
            return null
        }
    }

    async findById(uid) {
        return UserModel.findById(uid);
    }

    async find() {
        return UserModel.find();
    }

    async findOld() {

        const today = new Date();
        const twoDaysAgo = new Date(today.setDate(today.getDate() - 2));

        // Buscar los usuarios que no tienen last_connection o que la tienen pero es mayor a hace 2 días
        return UserModel.find({
            $or: [
                { last_connection: { $exists: false } },
                { last_connection: { $lt: twoDaysAgo } }
            ]
        });
    }

    async delete(uid) {
        try {

            const user = await UserModel.findByIdAndDelete(uid)

            if (!user) {
                console.log("Usuario no encontrado")
                return null
            }

            console.log("Usuario eliminado")
            return user

        } catch (error) {
            console.log("Error al eliminar usuario")
            throw error
        }
    }

    async setAdmin(uid) {
        try {

            const user = await UserModel.findByIdAndUpdate(uid, { role: 'admin' })

            console.log("Usuario modificado para rol admin")
            return user

        } catch (error) {
            console.log("Error al modificar usuario")
            throw error
        }
    }

    async setPremium(uid) {
        try {

            const user = await UserModel.findByIdAndUpdate(uid, { role: 'premium' })

            console.log("Usuario modificado para rol premium")
            return user

        } catch (error) {
            console.log("Error al modificar usuario")
            throw error
        }
    }

    async setUser(uid) {
        try {

            const user = await UserModel.findByIdAndUpdate(uid, { role: 'user' })

            console.log("Usuario modificado para rol user")
            return user

        } catch (error) {
            console.log("Error al modificar usuario")
            throw error
        }
    }
}


module.exports = UserRepository;
