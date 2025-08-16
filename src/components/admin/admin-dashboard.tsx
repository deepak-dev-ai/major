import CreateUser from "./create-user";
import gqlClient from "@/lib/services/gql";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import { User } from "../../../generated/prisma";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import AddProduct from "../product/add-product";
import GetAllProducts from "../product/get-all-products";

export default async function AdminDashboard() {
  const data: {
    getAllUsers: User[];
  } = await gqlClient.request(GET_ALL_USERS);
  const users = data.getAllUsers;
  return (
    <main className="flex h-screen w-full ">
      <section className="w-2/3 p-4">
        <h2 className="text-2xl text-center font-semibold">Products </h2>
        <div className="m-8">
          <AddProduct />
        </div>
        <div>
          <GetAllProducts />
        </div>
      </section>
      <section className="w-1/3 p-4 border-l">
        <h2 className="text-2xl text-center font-semibold">Admin Dashboard</h2>
        <div className="m-4 flex justify-center">
          <CreateUser />
        </div>
        {users.map((user) => (
          <Card
            key={user.id}
            className="p-4 m-8 flex-row items-center justify-between"
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
              <p className="text-sm text-gray-500">
                {user?.email || "No email"}
              </p>
            </div>
            <div>
              <Badge>
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </Badge>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
