import express from "express"
const app = express()

import http from "http"
const server = http.createServer(app)

import { Server } from "socket.io"
const io = new Server(server)

import escapeHTML from "escape-html"

io.on("connection", (socket) => {
    //console.log("Welcome ", socket.id);

    socket.on("clientChooseColor", color => {

        //udsender til andre men ikke sig selv.
        // socket.broadcast.emit("the server is sending the new color", color)


        //only changes the socket itself
        //socket.emit("the server is sending the new color", color)

        //emits to all sockets in the namespace
        io.emit("the server is sending the new color", escapeHTML(color))

    })

    //socket.on("disconnect", () => console.log("Goodbye", socket.id))
})
