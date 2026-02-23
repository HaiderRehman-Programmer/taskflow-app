const { tasksDB } = require('../config/db');

const VALID_PRIORITIES = ['low', 'medium', 'high'];

const Task = {
    /**
     * Get all tasks for a user, newest first.
     */
    async find({ user }) {
        const tasks = await tasksDB.findAsync({ user });
        return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    /**
     * Create a new task.
     */
    async create({ title, description = '', priority = 'medium', user }) {
        if (!title) throw new Error('Task title is required');
        if (!VALID_PRIORITIES.includes(priority)) priority = 'medium';

        return tasksDB.insertAsync({
            title,
            description,
            priority,
            completed: false,
            user,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    },

    /**
     * Find one task matching a query object.
     */
    async findOne(query) {
        return tasksDB.findOneAsync(query);
    },

    /**
     * Update a task by id and return the updated document.
     */
    async findByIdAndUpdate(id, updates) {
        const allowed = ['title', 'description', 'priority', 'completed'];
        const $set = { updatedAt: new Date() };

        allowed.forEach((field) => {
            if (updates[field] !== undefined) $set[field] = updates[field];
        });

        await tasksDB.updateAsync({ _id: id }, { $set });
        return tasksDB.findOneAsync({ _id: id });
    },

    /**
     * Delete a task by id.
     */
    async deleteById(id) {
        return tasksDB.removeAsync({ _id: id }, {});
    },
};

module.exports = Task;
