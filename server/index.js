import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet"
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import { register } from './controllers/auth.js'
import { createPost } from './controllers/post.js'
import { verifyToken } from "./middleware/auth.js";


const __filename = fileURLToPath(
    import.meta.url)
const __dirName = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extend: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extend: true }))
app.use(cors())
app.use("assets", express.static(path.join(__dirName, "publid/assets")))


//FILE STORAGE//
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

//ROUTE WITH FILES
app.post('/auth/register', upload.single('picture'), register)
app.post('/post', verifyToken, upload.single('picture'), createPost)

//route
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/post', postRoutes)


//MONGO SET UP
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`PORT SERVER ${PORT}`)
    })
}).catch((error) => {
    console.log(`${error} did not connect`)
})