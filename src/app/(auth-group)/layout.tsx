import UserProvider from "@/components/context/user-context";
import HeaderPage from "@/components/header/header";
import { getUserFromCookies } from "@/lib/services/helper";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookies();
  if (!user) redirect("/login");
  return (
    <>
      <UserProvider user={user}>
        <HeaderPage />
        {children}
      </UserProvider>
    </>
  );
}
