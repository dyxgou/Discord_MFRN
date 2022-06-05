import { Static, Type } from "@sinclair/typebox"
import { RouteShorthandOptions } from "fastify"

const loginBody = Type.Object({
  email : Type.String({ format : "email" }),
  password : Type.String()
})

export const loginSchema : RouteShorthandOptions =
{
  schema : {
    body : loginBody,
  }
}

export type LoginBody = Static<typeof loginBody>
