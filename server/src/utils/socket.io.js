// // socket.io.js
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CORS_ORIGIN || "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// io.on("connection", (socket) => {
//   console.log("user connected:", socket.id);



//   {
//     /*3. Core Patterns You Need to Master
// Pattern 1: Basic Event Emission
// Server:
// javascript
// socket.on('chat message', (msg) => {
//   console.log('Message received:', msg);
//   io.emit('chat message', msg); // Broadcast to all
// });
// Client:
// javascript
// // Send message
// socket.emit('chat message', 'Hello world!')
// // Receive messages
// socket.on('chat message', (msg) => {
//   console.log('New message:', msg);
// }); */
//   }

// // send and receive messages for board cast all 

//   socket.on("public_message",(message)=>{
//     console.log("message",message);
//     // console.log("Message received ",message);
//     // Broadcast the message to the specified recipient

//     socket.emit("public_message", message);

//       })
//     // here are for the private massage

//     {/*Pattern 2: Private Messaging
// Server:
// socket.on('private message', ({ to, message }) => {
//   io.to(to).emit('private message', {
//     from: socket.id,
//     message
//   });
// });

// ------------------------------------------->
// Client:
// // Send private message
// socket.emit('private message', {
//   to: 'targetSocketId',
//   message: 'Secret message'
// });

// // Receive private messages
// socket.on('private message', ({ from, message }) => {
//   console.log(`Private from ${from}: ${message}`);
// }); */}

//     socket.on("private_message",({to ,message})=>{
//       console.log("Private message from", socket.id, "to", to, ":", message);
//       // Send the private message to the specified recipient
//       socket.to(to).emit("private_message", { from: socket.id, message });

//     })


//     // Pattern 3: Room Management

//      {

//       /*Server:

//         socket.on('join room', (room) => {
//   socket.join(room);
//   console.log(`${socket.id} joined ${room}`);
// });



// // Leave room
// socket.on('leave room', (room) => {
//   socket.leave(room);
//   console.log(`${socket.id} left ${room}`);
// });

// // Room-specific message
//  // socket.on('room message', ({ room, message }) => {
//   io.to(room).emit('room message', {
//     from: socket.id,
//     message
//   });
// });

// Client:
// // Join room
// socket.emit('join room', 'general');

// // Send to room
// socket.emit('room message', {
//   room: 'general',
//   message: 'Hello room!'
// });

// // Listen for room messages
// socket.on('room message', ({ from, message }) => {
//   console.log(`Room message from ${from}: ${message}`);
// });

//       */
    

//      }


//   socket.on("disconnect", () => {
//     console.log("user disconnected:", socket.id);
//   });
// });

// export { io, server, app };



// -------------------------------------------

// i just need to create a socket and methods  here all and the functionality will be in the client side

import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);


const io =new Server(server,{
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
})



io.on("connection", (socket) => {

    console.log("user conected :",socket.id);

    // here for public message 
    // todo : create a method in the frontend end 
    socket.on("public_message",(message)=>{
        console.log("message",message);
        // Broadcast the message to all connected clients
        io.emit("public_message", message);
      
    })

    // here are for the private massage
    socket.on("private_message",({to ,message})=>{
        console.log("Private message from", socket.id, "to", to, ":", message);
        // Send the private message to the specified recipient
        socket.to(to).emit("private_message", { from: socket.id, message });

    })

    // here method for the joining rooms

    socket.on("join_room",(room)=>{
        socket.join(room);
        console.log(`${socket.id} joined room: ${room}`);
    })

    // here method for the leaving rooms
    socket.on("leave_room",(room)=>{
        socket.leave(room);
        console.log(`${socket.id} left room: ${room}`);
    })

})


export { io, server, app };