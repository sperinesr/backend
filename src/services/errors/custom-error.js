// creamos clase para generar nuestros propios errores

class CustomError {
    static crearError({ nombre = "Error", causa = "Descon", mensaje, codigo = 1 }) {
        const error = new Error(mensaje);
        error.name = nombre;
        error.causa = causa;
        error.code = codigo;
        // lanzamos el error, esto detiene la ejecucion de la app, por eso 
        // hay que capturarlo en el otro modulo
        throw error;
    }
}

module.exports = CustomError