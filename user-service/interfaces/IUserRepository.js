class IUserRepository {
    // Interface methods
    async findByUsername(username) {
        throw new Error('Method not implemented');
    }

    async findByEmail(email) {
        throw new Error('Method not implemented');
    }

    async create(user) {
        throw new Error('Method not implemented');
    }

    async update(id, user) {
        throw new Error('Method not implemented');
    }

    async delete(id) {
        throw new Error('Method not implemented');
    }
}

module.exports = IUserRepository;
