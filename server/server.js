const { ApolloServer } = require('apollo-server-express')
const expressPlayground = require('graphql-playground-middleware-express').default
const express = require('express')

const { MongoClient } = require('mongodb')
const { readFileSync } = require('fs')

const typeDefs = readFileSync('./typeDefs.graphql', 'utf-8')
const resolvers = require('./resolvers')
const app = express()

const start = async () => {
    const client = await MongoClient.connect(
        "mongodb://localhost:27017/buffer-study", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    )
    const db = client.db()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => { db }
    })
    server.applyMiddleware({ app })

    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

    app.listen({ port: 10101 }, () => {
        console.log(`Server start http://localhost:10101/playground`)
    })
}

start()