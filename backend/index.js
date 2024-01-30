import express from "express"; 
import mysql from "mysql";
import cors from 'cors';


const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("this is the backend")
})

app.get("/albums", (req, res) => {
    const query = "SELECT * FROM " + process.env.DB_DATABASE + ".albums";
    db.query(query,(err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post("/albums", (req, res) => {
    const query = "INSERT INTO albums (`title`,`desc`,`rating`,`cover`) VALUES (?)";
    const values = [req.body.title, req.body.desc, req.body.rating, req.body.cover];

    db.query(query,[values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Album created")
    })
})

app.delete("/albums/:id", (req, res) => {
    const albumId = req.params.id;
    const query = 'DELETE FROM albums WHERE id = ?'
    db.query(query,[albumId], (err, data) => {
        if(err) return res.json(err);
        return res.json("Album deleted")
    })
})

app.put("/albums/:id", (req, res) => {
    const albumId = req.params.id;
    const query = 'UPDATE albums SET `title`= ?, `desc`= ?, `rating`= ?, `cover`= ? WHERE id = ?';
    const values = [req.body.title, req.body.desc, req.body.rating, req.body.cover];
    db.query(query,[...values, albumId], (err, data) => {
        if(err) return res.json(err);
        return res.json("Album updated")
    })
})

app.get("/albums/:id", (req, res) => {
    const albumId = req.params.id;
    const query = 'SELECT * FROM albums WHERE id = ?';
    db.query(query,[albumId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})

app.listen(process.env.BACK_PORT, () => {
    console.log('connected backend')
})