import { getUserFromCookies } from "@/lib/services/helper";
import { generatedToken } from "@/lib/services/jwt";
import prismaClient from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { RoleType } from "../../../../../generated/prisma";

export async function loginUser(
  _: any,
  args: { userCred: string; password: string }
) {
  try {
    const cookieStore = await cookies();
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            email: args.userCred,
          },
          {
            username: args.userCred,
          },
        ],
      },
    });
    if (!user) return false;
    if (user.password == args.password) {
      const token = generatedToken({ id: user.id });
      cookieStore.set("token", token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function createUser(
  _: any,
  args: {
    name: string;
    email: string;
    password: string;
    username: string;
    role: RoleType;
  }
) {
  try {
    const User = await getUserFromCookies();
    if (!User) return null;
    if (User.role !== "admin") {
      return null;
    }
    const createdUser = await prismaClient.user.create({
      data: args,
    });
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export async function updateUserRole(
  _: any,
  args: {
    userId: string;
    role: RoleType;
  }
) {
  try {
    const user = await getUserFromCookies();
    if (user?.role != "admin") return false;
    await prismaClient.user.update({
      where: {
        id: args.userId,
      },
      data: {
        role: args.role,
      },
    });
    return true;
  } catch (error) {
    console.error("Error upadating user role:", error);

    return false;
  }
}
export async function updateUserProfile(
  _: any,
  args: {
    name: string;
    email: string;
    username: string;
    avatar: string;
    userId: string;
  }
) {
  try {
    const user = await getUserFromCookies();
    const dataToSave = {
      name: args.name,
      username: args.username,
      email: args.email,
      avatar: args.avatar,
    };
    if (user?.role != "admin" && user?.id != args.userId) {
      return false;
    }
    await prismaClient.user.update({
      where: {
        id: args.userId,
      },
      data: dataToSave,
    });
    return true;
  } catch (error) {
    console.log("error upadating user:", error);
    return false;
  }
}

export async function getAllUsers() {
  try {
    const users = await prismaClient.user.findMany({
      where: {
        role: {
          not: "admin",
        },
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
