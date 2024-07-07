class UserDTO {
    constructor(first_name, last_name, email, role, uid, last_connection) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
        this.id = uid;
        this.last_connection = last_connection
        this.isAdmin = (this.role === "admin");
        this.isPremium = (this.role === "premium");
        this.isUser = (this.role === "user");
    }
}

module.exports = UserDTO;