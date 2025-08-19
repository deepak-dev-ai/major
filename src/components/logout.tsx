"use client";
import { LOGOUT_USER } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { toast } from "sonner";
export default function LogoutButton() {
  const handleLogout = async () => {
    const res: {
      logoutUser: boolean;
    } = await gqlClient.request(LOGOUT_USER);
    if (res.logoutUser) {
      toast.success("Logout successful");
      window.location.reload();
    } else {
      toast.error("Can't logout");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
