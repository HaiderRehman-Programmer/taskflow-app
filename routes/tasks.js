const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const protect = require('../middleware/auth');

// All routes below are protected
router.use(protect);

// @route  GET /api/tasks
// @desc   Get all tasks for the logged-in user
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json({ success: true, count: tasks.length, tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route  POST /api/tasks
// @desc   Create a new task
router.post('/', async (req, res) => {
    const { title, description, priority } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ success: false, message: 'Task title is required' });
        }

        const task = await Task.create({
            title,
            description: description || '',
            priority: priority || 'medium',
            user: req.user._id,
        });

        res.status(201).json({ success: true, task });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route  PUT /api/tasks/:id
// @desc   Update a task (toggle complete, change title/desc/priority)
router.put('/:id', async (req, res) => {
    try {
        // Verify task belongs to this user
        const existing = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true, task });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route  DELETE /api/tasks/:id
// @desc   Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        await Task.deleteById(task._id);
        res.json({ success: true, message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
