import { FastifyPluginAsync } from "fastify"
import { hashPassword } from "../../../hooks/password"
import { RegisterBody, registerSchema } from "./schema"

const register : FastifyPluginAsync = async (fastify , options) =>
{
  fastify.post<{ Body : RegisterBody }>("/" , registerSchema , async (request , reply) =>
  {
    const { body : userInfo } = request

    const hashedPassword = await hashPassword(userInfo.password)

    userInfo.password = hashedPassword

    try {
      await fastify.store.User.create(userInfo)

      return reply.status(201).send("User created")
    } catch (error) {
      throw fastify.httpErrors.createError({
        name : "error to create a new user",
        message : error
      })
    }
  })
}

export default register
