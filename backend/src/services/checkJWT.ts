import { FastifyLoggerInstance, FastifyPluginAsync, FastifyRequest } from "fastify"
import { RouteGenericInterface } from "fastify/types/route"
import { IncomingMessage, Server } from "http"
import fp from "fastify-plugin"

type Req = FastifyRequest<RouteGenericInterface, Server, IncomingMessage, unknown, FastifyLoggerInstance>

const checkJWT : FastifyPluginAsync = fp(async (fastify , options) =>
{
  fastify.decorate("auth" , async (req : Req) =>
  {
    try {
      await req.jwtVerify()
    } catch (error) {
      throw fastify.httpErrors.unauthorized("Invalid Token")
    }
  })
})

export default checkJWT
export type IAuth = (req : Req) => Promise<void>
export type IUser = { userId : string , iat : number , exp : number }
export type IPayload = { userId : string }
