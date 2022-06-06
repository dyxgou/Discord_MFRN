import { FastifyPluginAsync } from "fastify"
import { hashPassword } from "../../../hooks/password"
import { UpdateBody, updateSchema } from "./schema"

const update : FastifyPluginAsync = async (fastify, options) =>
{
  fastify.put<{ Body : UpdateBody }>("/" , updateSchema , async (request , reply) =>
  {
    const { userId } = request.user
    const user = await fastify.store.User.findById(userId)

    const { body : userInfo } = request

    if (userInfo?.password)
    {
      const hashedPassword = await hashPassword(userInfo.password)

      userInfo.password = hashedPassword
    }

    try {
      await user?.updateOne({ $set : userInfo })

      return reply.status(200).send("User updated!")
    } catch (error) {
      throw fastify.httpErrors.createError({
        name : "Can't update this user",
        message : error
      })
    }
  })
}

export default update
