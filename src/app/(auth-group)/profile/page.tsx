"use client";
import EditUser from "@/components/admin/update-user";
import { userContext } from "@/components/context/user-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Image from "next/image";

import { useContext, useState } from "react";

export default function CurrentUser() {
  const { user } = useContext(userContext);
  const [imageError, setImageError] = useState(false);
  if (!user) {
    return null;
  }
  console.log(user.avatar);
  return (
    <nav>
      <Card className="flex-row h-15 items-center justify-center  p-4">
        <Avatar className="w-10 h-10">
          {!imageError && user?.avatar ? (
            <Image
              src={user.avatar}
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase() ?? "?"}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="text-center ">
          <h2 className="text-lg font-semibold">{user?.name || "Guest"}</h2>
          <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
        </div>
        <div>
          <EditUser user={user} />
        </div>
      </Card>
    </nav>
  );
}
