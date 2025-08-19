"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Product } from "../../../generated/prisma";
import { Plus } from "lucide-react";
import gqlClient from "@/lib/services/gql";
import { CREATE_PRODUCT } from "@/lib/gql/mutation";
import { userContext } from "../context/user-context";

export default function AddProduct() {
  const { user } = useContext(userContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  async function handleAddProduct() {
    setLoading(true);
    try {
      const data: {
        addProduct: Product;
      } = await gqlClient.request(CREATE_PRODUCT, {
        title,
        description,
        category,
        image,
        price,
        stock,
      });

      if (data.addProduct) {
        toast.success("Product added successfully");
        window.location.reload();
        setTitle("");
        setDescription("");
        setCategory("");
        setImage("");
        setPrice(0);
        setStock(0);
      } else {
        toast.error("Failed to add Product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add Product");
    } finally {
      setLoading(false);
    }
  }
  if (user?.role == "manager") {
    return (
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">
              ADD PRODUCT <Plus className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a product</DialogTitle>
              <DialogDescription>
                Click on save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>Title</Label>
                <Input
                  name="title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label>Description</Label>
                <Input
                  name="desc"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label>Image</Label>
                <Input
                  name="img"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label>Price</Label>
                <Input
                  name="price"
                  type="text"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-3">
                <Label>Stock</Label>
                <Input
                  name="stock"
                  type="text"
                  placeholder="Enter stock"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-3">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="decor">Decor</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="others">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={loading}
                type="submit"
                onClick={handleAddProduct}
              >
                {loading ? "Adding..." : "Add Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    );
  }
}
