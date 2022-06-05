import { Static, Type } from "@sinclair/typebox"
import { RouteShorthandOptions } from "fastify"

const registerBody = Type.Object(
  {
    email : Type.String({ format : "email" }),
    password : Type.String(),
    username : Type.String()
  }
)

export const registerSchema : RouteShorthandOptions = {
  schema : {
    body : registerBody
  },
}

export type RegisterBody = Static<typeof registerBody>
