import { FastifyPluginAsync } from "fastify"
import * as mongoose from "mongoose"
import UserSchema, { IUser } from "../schemas/UserSchema"
import fp from "fastify-plugin"

const connectDB : FastifyPluginAsync = fp(async (fastify , opts) =>
{
  const MONGO_URI = process.env.MONGO_URI

  if (!MONGO_URI)
  {
    fastify.log.error("Mongo URI not found")
    process.exit(1)
  }

  await mongoose.connect(MONGO_URI , {
    dbName : "DiscordDB"
  }).then(connection => {
    fastify.decorate("store" , {
      User : connection.model("users" , UserSchema),
      db : connection
    })

    fastify.log.info("Mongo connected")
  }).catch(err => {
    fastify.log.error(err)

    process.exit(1)
  })

  process.on("uncaughtException" , async err => {
    fastify.log.error(err)

    await mongoose.disconnect()
  })
})

export default connectDB
export interface IStore { User : mongoose.Model<IUser> , db : typeof mongoose }
