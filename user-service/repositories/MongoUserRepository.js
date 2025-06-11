const IUserRepository = require('../interfaces/IUserRepository');
const User = require('../models/User');

class MongoUserRepository extends IUserRepository {
    async findByUsername(username) {
        return await User.findOne({ username });
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }

    async deleteAll() {
        return await User.deleteMany({});
    }

    async findById(id) {
        return await User.findById(id);
    }
}

module.exports = MongoUserRepository;
