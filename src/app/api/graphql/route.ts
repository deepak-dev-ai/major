import { getUserFromCookies } from "@/lib/services/helper";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import {
  createUser,
  getAllUsers,
  loginUser,
  updateUserProfile,
  updateUserRole,
} from "./resolvers/user";

import typeDefs from "./typeDef";
import {
  addProduct,
  createSale,
  getAllProducts,
  getProductById,
} from "./resolvers/products";

const resolvers = {
  Query: {
    loginUser,
    currentUser: getUserFromCookies,
    getAllUsers,
    getAllProducts,
    getProductById,
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
    addProduct,
    createSale,
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export async function GET(req: Request, ctx: any) {
  return handler(req as unknown as NextRequest, ctx);
}

export async function POST(req: Request, ctx: any) {
  return handler(req as unknown as NextRequest, ctx);
}
