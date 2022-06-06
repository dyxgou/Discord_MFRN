import fp from 'fastify-plugin'
import { IPayload, IUser } from '../services/checkJWT'
import connectDB, { IStore } from '../services/connectDB'
import regsiterJWT from '../services/registerJWT'

export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  void fastify.register(connectDB)
  void fastify.register(regsiterJWT)
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    store : IStore
  }
}

declare module '@fastify/jwt' {
  export interface FastifyJWT
  {
    payload : IPayload,
    user : IUser
  }
}
