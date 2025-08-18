import prismaClient from "@/lib/services/prisma";
import { ProductCategoryType } from "../../../../../generated/prisma";

export async function addProduct(
  _x: any,
  args: {
    title: string;
    description: string;
    category: ProductCategoryType;
    image: string;
    price: number;
    stock: number;
  }
) {
  try {
    return await prismaClient.product.create({
      data: args,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
}
export async function getAllProducts() {
  try {
    return await prismaClient.product.findMany();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
export async function getProductById(
  _x: any,
  args: {
    id: string;
  }
) {
  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id: args.id,
      },
      include: {
        sale: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (!product) {
      console.error("Product not found");
      return null;
    }
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}
export async function createSale(
  _x: any,
  args: {
    id: string;
    quantity: number;
  }
) {
  try {
    const sale = await prismaClient.sale.create({
      data: {
        productId: args.id,
        quantity: args.quantity,
      },
    });
    if (sale) {
      await prismaClient.product.update({
        where: {
          id: args.id,
        },
        data: {
          stock: {
            decrement: args.quantity,
          },
        },
      });
    }
    return true;
  } catch (error) {
    console.error("Error creating sale:", error);
    return false;
  }
}
