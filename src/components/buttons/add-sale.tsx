"use client";
import { CREATE_SALE } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { useState } from "react";
import { toast } from "sonner";
import { Product, Sale } from "../../../generated/prisma";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AddSale({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddToSale() {
    if (product.stock < quantity) {
      toast.error("Insufficient stock");
      return;
    }
    try {
      const response: {
        createSale: Sale;
      } = await gqlClient.request(CREATE_SALE, {
        id: product.id,
        quantity,
      });
      if (response?.createSale) {
        toast.success("Product added to sale");
      } else {
        toast.error("failed to add to sale");
      }
    } catch (error) {
      console.error("Add sale error:", error);
      toast.error("Failed to add product to sale");
    }
  }
  return (
    <>
      <Input
        type="number"
        value={quantity}
        min={1}
        max={product.stock}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button onClick={handleAddToSale}>Add to sale</Button>
    </>
  );
}
