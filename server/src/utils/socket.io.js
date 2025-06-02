import {Server} from "socket.io"
import {app} from "../app.js"
import http from "http"


const server =http.createServer(app);
const io=new Server(server,{
    cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

io.on("connection",(socket)=>{

    console.log("the user connected with user id is",socket.id);

    socket.on("broad_cast",(data)=>{
        console.log("recived Message",data);
        io.emit("recive_broad_cast",data);
    })

     socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

})

export default  server;