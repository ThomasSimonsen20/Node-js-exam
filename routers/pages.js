import express from "express"
const router = express.Router()

import * as createPages from "../util/render.js"

const searchForMoviesPage = createPages.createPage("searchForMovies/searchForMovies.html")
const movieDetailsPage = createPages.createPage("movieDetails/movieDetails.html", { title: "Movie detail - WatchedFlix"})
const loginPage = createPages.createPageWithoutHeader("login/login.html")
const createAccountPage = createPages.createPageWithoutHeader("createAccount/createAccount.html")
const watchedMoviesPage = createPages.createPage("watchedMovies/watchedMovies.html")
const successPage = createPages.createPage("payment/successPage/success.html")
const accountSettingsPage = createPages.createPage("accountSettings/accountSettings.html")
const selectProductPage = createPages.createPage("payment/selectProduct/selectProduct.html")

router.get("/", (req, res) => {
    res.send(loginPage)
})

router.get("/search-movies", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(searchForMoviesPage)
    }
})

router.get("/movie-details", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(movieDetailsPage)
    }
})

router.get("/create-account", (req, res) => {
    res.send(createAccountPage)
})

router.get("/watched-movies", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(watchedMoviesPage)
    }
})

router.get("/account-settings", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(accountSettingsPage)
    } 
})

router.get("/select-product", (req, res) => {
    if(!req.session.loggedIn) {
        res.send(loginPage)
    } else {
        res.send(selectProductPage)
    } 
})


export default router