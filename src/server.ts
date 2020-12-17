import express from 'express'
import spdy from 'spdy'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
const protobuf = require('protocol-buffers')

dotenv.config()

import db from './config/connectDB'
db().get()

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sslPath = path.join(__dirname, '../ssl')
const options = {
    key: fs.readFileSync(`${sslPath}/server.key`, 'utf-8'),
    cert: fs.readFileSync(`${sslPath}/server.crt`, 'utf-8'),
    passphrase: process.env.SSL_PW
}

app.use('/', (req: express.Request, res: express.Response) => {
    const post1 = {
        author: "Seung Won",
        content: "pukuba",
        age: 17
    }
    const protoPath = path.join(__dirname, './proto/post.proto')
    const postProto = protobuf(fs.readFileSync(protoPath))
    const buf = postProto.Post.encode(post1)
    console.log(buf)
    res.send(buf)
})

spdy.createServer(options, app).listen(process.env.PORT, () => {
    console.log(`server On http://localhost:${process.env.PORT}`)
})


