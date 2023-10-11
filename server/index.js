import express from 'express'
const app = express()
import cors from 'cors'
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import multer from 'multer'
import { verifyToken } from './controllers/verifyToken.js'


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const corsOptions ={
  // origin:'http://localhost:3000', 
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(cors())

// // we can put storage code into seprate file(optional)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload/userProfiles')
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file
  // console.log("body",req.body)
  return res.status(200).json(file.filename)
})

app.use('/api/users',verifyToken, userRouter)
app.use('/api/auth', authRouter)
// console.log(port)
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running at ${port}`)
})