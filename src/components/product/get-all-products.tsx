import gqlClient from "@/lib/services/gql";
import { Product } from "../../../generated/prisma";
import { GET_ALL_PRODUCTS } from "@/lib/gql/queries";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function GetAllProducts() {
  const data: {
    getAllProducts: Product[];
  } = await gqlClient.request(GET_ALL_PRODUCTS);
  const products = data.getAllProducts;
  return (
    <main className="flex flex-wrap gap-8 p-8 ">
      {products.map((product) => (
        <Card
          key={product.id}
          className="flex flex-col items-center p-6 h-90 w-70 rounded-xl "
        >
          <div className="relative w-full h-full shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-200 ">
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image}
                alt={product.title}
                className="rounded-lg object-cover"
                fill
              />
            </Link>
          </div>
          <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">
            {product.title}
          </h2>

          <div className="flex flex-wrap gap-2 justify-center mb-2">
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
              ₹{product.price}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                product.stock > 0
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0
                ? `In Stock: ${product.stock}`
                : "Out of Stock"}
            </span>
          </div>
        </Card>
      ))}
    </main>
  );
}
