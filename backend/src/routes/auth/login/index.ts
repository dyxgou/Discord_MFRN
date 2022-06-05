import { FastifyPluginAsync } from "fastify"
import { comparePassword } from "../../../hooks/password"
import { LoginBody, loginSchema } from "./schema"

const login : FastifyPluginAsync = async (fastify , options) =>
{
  fastify.post<{ Body : LoginBody }>("/" , loginSchema , async (request , reply) =>
  {
    const { email , password } = request.body

    const user = await fastify.store.User.findOne({ email } , { password : true })

    const isCorrectPassword = await comparePassword(password , user?.password)

    if (!isCorrectPassword || !user)
    {
      throw fastify.httpErrors.unauthorized("Invalid email or password")
    }

    const token = fastify.jwt.sign({ userId : user?.id })

    return reply.status(200).send({ token })
  })
}

export default login
