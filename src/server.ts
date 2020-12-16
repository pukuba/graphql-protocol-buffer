import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

import db from './config/connectDB'

db().get()
const app = express()


/// test
const protobuf = require('protocol-buffers')
//


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(process.env.PORT, () => {
    console.log(`server On http://localhost:${process.env.PORT}`)
})

app.use('/', (req: express.Request, res: express.Response) => {
    const post1 = {
        author: "Seung Won",
        content: "hawawa",
        lv: 175
    }
    const protoPath = path.join(__dirname, './proto/post.proto')
    const postProto = protobuf(fs.readFileSync(protoPath))
    const buf = postProto.Post.encode(post1)

    res.send(buf)
})