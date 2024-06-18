const UserModel = require("../models/user.model.js");

class UserRepository {
    async findByEmail(email) {
        return UserModel.findOne({ email });
    }
    async findById(uid) {
        return UserModel.findById(uid);
    }
}

module.exports = UserRepository;
