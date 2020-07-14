const express = require('express')
const router = express.Router();

const db = require('../data/dbConfig');

router.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err});
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts').where({ id })
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err});
        })
})

router.post('/', (req, res) => {
    const newAccount = req.body;
    db('accounts').insert(newAccount)
        .then(account => {
            res.status(201).json(account);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err});
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    db('accounts').where({ id }).update(updates)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: err});
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts').where({ id }).del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err });
        })
})

module.exports = router;