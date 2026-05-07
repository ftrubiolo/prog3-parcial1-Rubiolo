const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const db = require("./db");

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    const sql = "SELECT * FROM Tareas";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
})

app.get('/api/categorias', (req, res) => {
    const sql = "SELECT * FROM Categorias";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
});

app.post('/api', (req, res) => {
    const sql = "INSERT INTO Tareas (titulo, categoriaId, fechaVencimiento) VALUES (?, ?, ?)";
    const values = [req.body.titulo, req.body.categoriaId, req.body.fechaVencimiento];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
})

app.put('/api/:id/completado', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE Tareas SET estado = 1 WHERE id = ?";
    const values = [id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
})

app.put('/api/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, categoriaId, fechaVencimiento } = req.body;
    const sql = "UPDATE Tareas SET titulo = ?, categoriaId = ?, fechaVencimiento = ? WHERE id = ?";
    const values = [titulo, categoriaId, fechaVencimiento, id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
});

app.delete('/api/:id/eliminar', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM Tareas WHERE id = ?";
    const values = [id];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
})

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});
