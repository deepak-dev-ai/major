"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext } from "react";
import { Card } from "../ui/card";
import { userContext } from "../context/user-context";

export default function CurrentUser() {
  const { user } = useContext(userContext);
  return (
    <nav>
      <Card className="flex-row h-15 items-center justify-center  p-4">
        <Avatar>
          <AvatarImage src={user?.avatar || ""} />
          <AvatarFallback>
            {user?.name?.charAt(0).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center ">
          <h2 className="text-lg font-semibold">{user?.name || "Guest"}</h2>
          <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
        </div>
      </Card>
    </nav>
  );
}
