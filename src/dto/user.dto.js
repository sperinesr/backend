class UserDTO {
    constructor(first_name, last_name, email, role, uid, last_connection) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
        this.id = uid;
        this.last_connection = last_connection
    }
}

module.exports = UserDTO;