const bcrypt = require('bcryptjs');
const { usersDB } = require('../config/db');

const User = {
    /**
     * Create a new user with a hashed password.
     */
    async create({ name, email, password }) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = await usersDB.insertAsync({
            name,
            email: email.toLowerCase(),
            password: hashed,
            createdAt: new Date(),
        });

        // Return without password
        const { password: _, ...safeUser } = user;
        return safeUser;
    },

    /**
     * Find a user by query WITHOUT password field.
     */
    async findOne(query) {
        const user = await usersDB.findOneAsync(query);
        if (!user) return null;
        const { password: _, ...safeUser } = user;
        return safeUser;
    },

    /**
     * Find a user by query WITH password (for login check).
     * Attaches a comparePassword() method to the returned user.
     */
    async findOneWithPassword(query) {
        const user = await usersDB.findOneAsync(query);
        if (!user) return null;

        user.comparePassword = (plain) => bcrypt.compare(plain, user.password);
        return user;
    },

    /**
     * Find a user by their _id (no password returned).
     */
    async findById(id) {
        const user = await usersDB.findOneAsync({ _id: id });
        if (!user) return null;
        const { password: _, ...safeUser } = user;
        return safeUser;
    },
};

module.exports = User;
