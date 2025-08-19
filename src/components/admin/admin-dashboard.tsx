import { GET_ALL_USERS } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { User } from "../../../generated/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import CreateUser from "./create-user";
import UpdateUserRole from "./update-user-role";

export default async function AdminDashboard() {
  const data: {
    getAllUsers: User[];
  } = await gqlClient.request(GET_ALL_USERS);
  const users = data.getAllUsers;
  return (
    <div>
      <h2 className="text-2xl text-center font-semibold">Admin Dashboard</h2>
      <div className="m-4 flex justify-center">
        <CreateUser />
      </div>
      {users.map((user) => (
        <Card
          key={user.id}
          className="p-4 m-8 md:flex-row flex-col items-center justify-between"
        >
          <div>
            <Avatar>
              <AvatarImage src={user?.avatar || ""} />
              <AvatarFallback>
                {user?.name?.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center ">
            <h2 className="text-lg font-semibold">{user?.name || "Guest"}</h2>
          </div>
          <div>
            <Badge>
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
            </Badge>
          </div>
          <div>
            <UpdateUserRole user={user} />
          </div>
        </Card>
      ))}
    </div>
  );
}
