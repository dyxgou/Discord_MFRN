import { Static, Type } from "@sinclair/typebox"
import { RouteShorthandOptions } from "fastify"
import checkJWT from "../../../services/checkJWT"

const updateBody = Type.Object({
  password : Type.Optional(Type.String()),
} , {
  minProperties : 1,
})

export const updateSchema : RouteShorthandOptions = {
  schema : {
    body : updateBody,
  },
  onRequest : [checkJWT]
}

export type UpdateBody = Static<typeof updateBody>
