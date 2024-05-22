class UserDTO {
    constructor(firstName, lastName, role, uid) {
        this.nombre = firstName;
        this.apellido = lastName;
        this.role = role;
        this.id = uid;
    }
}

module.exports = UserDTO;