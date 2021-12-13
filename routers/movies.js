import express from "express"
import * as moviesRepo from "../database/repository/moviesRepo.js"
import connection from "../database/conectMysql.js"

const router = express.Router()

let accountsid
let movies

router.get("/api/movies/current", async (req, res) => {
    //console.log(req.session.accountRole)
    res.send({movies: movies, accountRole: req.session.accountRole})
}) 

router.get("/api/movies", async (req, res) => {

    if(req.session.accountID != null) {
        accountsid = req.session.accountID
    } 

    //const result = moviesRepo.getMoviesFromID(accountsid)
    //result ? res.send(result) : res.sendStatus(500)
   
    const [rows] = await connection.execute("SELECT * FROM movies WHERE accountsid = ?", [accountsid])

    movies = rows
    res.send(rows)
}) 

router.patch("/api/movies", async (req, res) => {

    if(req.session.accountID != null) {
        accountsid = req.session.accountID
    } 
    
    let movie = {
        movierating: req.body.movierating,
        accountsid: accountsid,
        movieimdb: req.body.movieimdb
    }

    const result = moviesRepo.updateMovieRating(movie)

    result ? res.sendStatus(200) : res.sendStatus(500)
})

router.post("/api/movies", async (req, res) => {

    if(req.session.accountID != null) {
        accountsid = req.session.accountID
    } 
    
    let movie = {
        movietitle: req.body.movietitle,
        movieimdb: req.body.movieimdb,
        movieposter: req.body.movieposter,
        movierating: req.body.movierating,
        accountsid: accountsid
    }

    const result = moviesRepo.insertMovie(movie)

    result ? res.sendStatus(200) : res.sendStatus(500)
})

router.delete("/api/movies", async (req, res) => {
    const movieID = req.body.id

    const result = moviesRepo.deleteMovie(movieID)

    result ? res.sendStatus(200) : res.sendStatus(500)
})



export default router