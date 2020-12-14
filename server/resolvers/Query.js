const post = require('./buffer/service/post')

module.exports = {
    getPosts: (parent, args, { db }) => {
        const post1 = {
            author: "Seung Won",
            content: "protocol-buffer study!"
        }
        const post2 = {
            author: "pukuba",
            content: "hawawa"
        }
        const buf = post.Post.encode(post1)
        console.log(buf)
        return new Promise((res, req) => {
            return res(buf)
        })

        // const res = post.Post.decode(buf)
        // console.log(res)
        // const arr = []
        // arr.push(post1)
        // arr.push(post2)
        // return arr
    }
}