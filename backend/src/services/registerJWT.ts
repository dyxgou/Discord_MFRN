import { FastifyPluginAsync } from "fastify"
import fastifyJwt from "@fastify/jwt"
import fp from "fastify-plugin"

const regsiterJWT : FastifyPluginAsync = fp(async (fastify , options) =>
{
  const JWT_SECRET = process.env.JWT_SECRET

  if (!JWT_SECRET)
  {
    fastify.log.error("JWT secret")
    process.exit(1)
  }

  void fastify.register(fastifyJwt , {
    secret : JWT_SECRET
  })

  fastify.log.info("JWT is ready!")
})

export default regsiterJWT
