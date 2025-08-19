"use client";
import { createContext } from "react";
import { RoleType } from "../../../generated/prisma";

export type userwithoutPassword = {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar: string | null;
  role: RoleType;
};
export const userContext = createContext<{
  user?: userwithoutPassword;
}>({});

export default function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: userwithoutPassword;
}) {
  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
}
