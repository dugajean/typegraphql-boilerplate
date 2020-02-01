import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { HelloResolver } from './resolvers/HelloResolver'

const startServer = async (): Promise<void> => {
  const db = await createConnection()

  const schema = await buildSchema({
    resolvers: [HelloResolver]
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any): object => ({ req, res, db })
  })

  const app = express()
  apolloServer.applyMiddleware({ app })

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started on http://localhost:${process.env.SERVER_PORT}/graphql`)
  })
}

startServer()
