var protobuf = require('protocol-buffers')
const fs = require('fs')
// protobuf.toJS() takes the same arguments as protobuf()
const path = require('path')

const bufPath = path.join(__dirname, 'service/')
var js = protobuf.toJS(fs.readFileSync('post.proto'))
fs.writeFileSync(`${bufPath}post.js`, js)