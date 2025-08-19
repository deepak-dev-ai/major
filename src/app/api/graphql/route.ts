import { getUserFromCookies } from "@/lib/services/helper";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
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
    logoutUser,
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "https://major-seven-sand.vercel.app",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

export async function GET(req: Request, ctx: any) {
  const res = await handler(req as unknown as NextRequest, ctx);
  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      ...Object.fromEntries(res.headers),
      "Access-Control-Allow-Origin": "https://major-seven-sand.vercel.app",
    },
  });
}

export async function POST(req: Request, ctx: any) {
  const res = await handler(req as unknown as NextRequest, ctx);
  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      ...Object.fromEntries(res.headers),
      "Access-Control-Allow-Origin": "https://major-seven-sand.vercel.app",
    },
  });
}
