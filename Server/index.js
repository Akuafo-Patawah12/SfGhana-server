const express= require("express")
const app=express()
const socketIo= require("socket.io")
const cors= require("cors")
const http= require("http")
const initializeSocket = require("./WebSockets/Socket")
const cookieParser= require("cookie-parser")
app.use(cookieParser())

app.use(express.urlencoded({extended:true}))
app.use(express.json());
const DB_connection = require("./Connections/Connection")
const router = require("./Router/Router")






const allowedOrigins = [
  'https://sgf-logistics.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


  


app.use("/",router)  // auth router


app.post('/add-admin', async (req, res) => {
    try {
      const newAdmin = new Admin(req.body);
      await newAdmin.save();
      res.status(201).send('Admin added successfully');
    } catch (error) {
      res.status(500).send('Error adding admin');
    }
  });

  app.get('/new', (req, res) => {
    res.send('Hello World');
  });
  
     

const server= http.createServer(app)

initializeSocket(server)  // This function return all the websockets


const port= process.env.PORT || 5000

async function start_Server(){
try{
     await DB_connection()  //call the database function to start databse

     server.listen(port,() =>{
        console.log(`server running on port ${port}`)
    })
}catch(error){
    console.log(error)
}

}

start_Server()