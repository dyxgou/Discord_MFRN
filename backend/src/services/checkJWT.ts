import { FastifyLoggerInstance, FastifyReply, FastifyRequest } from "fastify"
import { RouteGenericInterface } from "fastify/types/route"
import { IncomingMessage, Server, ServerResponse } from "http"

type Req = FastifyRequest<RouteGenericInterface, Server, IncomingMessage, unknown, FastifyLoggerInstance>
type Res = FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>

const checkJWT = async (req : Req , res : Res) =>
{
  try {
    await req.jwtVerify()
  } catch (error) {
    return res.status(401).send("Invalid Token")
  }
}

export default checkJWT
export type IUser = { userId : string , iat : number , exp : number }
export type IPayload = { userId : string }
