import AdminDashboard from "@/components/admin/admin-dashboard";
import AddProduct from "@/components/product/add-product";
import GetAllProducts from "@/components/product/get-all-products";
import { getUserFromCookies } from "@/lib/services/helper";
export const dynamic = "force-dynamic";
export default async function Home() {
  const user = await getUserFromCookies();
  const isAdmin = user?.role === "admin";
  return (
    <main className="flex h-full w-full">
      <section className={`${isAdmin ? "w-2/3" : "w-full"} p-4`}>
        <h2 className="text-2xl text-center font-semibold">Products </h2>
        <div className="m-8">
          <AddProduct />
        </div>
        <div>
          <GetAllProducts />
        </div>
      </section>
      {isAdmin && (
        <section className="w-1/3 p-4 border-l">
          <AdminDashboard />
        </section>
      )}
    </main>
  );
}
