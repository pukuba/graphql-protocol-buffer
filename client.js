const protobuf = require('protocol-buffers')
const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')
require('dotenv').config()
const endpoint = `https://localhost:${process.env.PORT}`
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
async function getAPI() {
    const response = await fetch(endpoint, {
        method: "POST"
    })

    const protoPath = path.join(__dirname, './src/proto/post.proto')
    const postProto = protobuf(fs.readFileSync(protoPath))
    const buffer = response.body._readableState.buffer.head.data
    const data = postProto.Post.decode(buffer)
    console.log(data)
}

getAPI()