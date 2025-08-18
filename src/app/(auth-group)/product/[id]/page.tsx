import AddSale from "@/components/buttons/add-sale";
import { GET_PRODUCT_BY_ID } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Product, Sale } from "../../../../../generated/prisma";
import ProductSaleChart from "@/components/product-sale-chart";

type ProductWithSales = Product & {
  sale: Sale[];
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: { getProductById: ProductWithSales } = await gqlClient.request(
    GET_PRODUCT_BY_ID,
    { id }
  );
  const product = data.getProductById;

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-8">
        <Card className="max-w-xl w-full text-center">
          <h2 className="text-2xl font-semibold">Product Not Found</h2>
          <p className="text-sm text-muted-foreground mt-2">
            No product found with ID: {id}
          </p>
          <div className="mt-6">
            <Link href="/" className="no-underline">
              <Button variant="secondary">Back to Home</Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }
  console.log("sales:", product?.sale);
  const chartData = product?.sale
    ?.map((sale) => {
      const date = new Date(Number(sale.createdAt));
      const format = date.toDateString();
      const quantity = sale.quantity;
      const obj = {
        createdAt: format,
        quantity,
      };
      return obj;
    })
    .reduce((acc: { createdAt: string; quantity: number }[], curr) => {
      const existing = acc.find((item) => item.createdAt === curr.createdAt);
      if (existing) {
        existing.quantity += curr.quantity;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">₹{product.price}</Badge>
          </div>
        </div>

        <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start p-0 overflow-hidden">
          <div className="relative w-full h-72 md:h-[36rem] bg-muted/40 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="p-6 flex flex-col h-full">
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-semibold">
                {product.title}
              </h2>

              <div className="mt-5">
                <Badge variant="outline">Category: {product.category}</Badge>
              </div>
              <Card className="mt-5 flex justify-center items-center p-5">
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </Card>
            </div>

            <Separator className="my-5" />

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <AddSale product={product} />
              </div>
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium shadow-sm ${
                    product.stock > 0
                      ? "bg-green-100 text-green-900 "
                      : "bg-red-100 text-red-900"
                  }`}
                >
                  {product.stock > 0
                    ? `In stock: ${product.stock}`
                    : "Out of stock"}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <section className="mt-8">
          <h3 className="text-lg font-semibold">Sales Overview</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Recent sales and quantity trends.
          </p>
          <Card className="mt-4 p-4">
            <div className="h-48">
              <ProductSaleChart data={chartData} />
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
