const express = require('express');
const router = express.Router();
const { ListItems } = require('../models');

// get all list items
router.get('/', async (req, res) => {
    const items = await ListItems.findAll(
        { order: [['priority', 'DESC']] }
    );
    res.json(items);
});

// get a list item by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const item = await ListItems.findByPk(id);
    res.json(item);
});

// get all list items for a user
router.get('/all/:userId', async (req, res) => {
    const userId = req.params.userId;
    const items = await ListItems.findAll(
        {
            where: {
                userId: parseInt(userId)
            },
            order: [['priority', 'DESC']]
        }
    );
    res.json(items);
});

// update a list item
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const item = await ListItems.findByPk(id);
    item.text = req.body.text;
    item.complete = req.body.complete;
    item.priority = req.body.priority;
    await item.save();
    res.json(item);
});

// create a list item
router.post('/', async (req, res) => {
    const newItem = req.body;
    await ListItems.create(newItem);
    res.json(newItem);
});

// delete a list item
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await ListItems.destroy({
        where: {
            id: id
        }
    });
    res.json('List item deleted');
});

module.exports = router;