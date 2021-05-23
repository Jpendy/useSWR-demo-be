/* eslint-disable keyword-spacing */
/* eslint-disable indent */
const express = require('express');
const pool = require('./utils/pool');
const app = express();

app.use(require('cors')());
app.use(express.json());


app.get('/api/v1/dogs', async (req, res, next) => {

    try {
        const { rows } = await pool.query(`
        SELECT * FROM dogs;
        `, []);

        res.send(rows);

    } catch (err) {
        next(err);
    }
});

app.post('/api/v1/dogs', async (req, res, next) => {
    const { name, age } = req.body;
    try {
        const { rows } = await pool.query(`
        INSERT INTO dogs (name, age) 
        VALUES ($1, $2) 
        RETURNING *;
        `, [name, age]);

        res.send(rows[0]);

    } catch (err) {
        next(err);
    }
});

app.put('/api/v1/dogs/:id', async (req, res, next) => {
    const { name, age } = req.body;
    try {
        const { rows } = await pool.query(`
        UPDATE dogs 
        SET name = $1,
        age = $2
        WHERE id = $3
        RETURNING *;
        `, [name, age, req.params.id]);

        res.send(rows[0]);

    } catch (err) {
        next(err);
    }
});

app.delete('/api/v1/dogs/:id', async (req, res, next) => {
    try {
        const { rows } = await pool.query(`
        DELETE FROM dogs
        WHERE id = $1 
        RETURNING *;
        `, [req.params.id]);

        res.send(rows[0]);

    } catch (err) {
        next(err);
    }
});


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

