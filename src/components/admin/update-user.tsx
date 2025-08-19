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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UPDATE_USER } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { userwithoutPassword } from "../context/user-context";

export default function EditUser({ user }: { user: userwithoutPassword }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleEditUser() {
    setLoading(true);
    try {
      const data: {
        updateUserProfile: userwithoutPassword;
      } = await gqlClient.request(UPDATE_USER, {
        userId: user.id,
        name,
        email,
        username,
        avatar,
      });
      if (data?.updateUserProfile) {
        toast.success("User updated successfully");
        window.location.reload();
        setName("");
        setEmail("");
        setUsername("");
        setAvatar("");
      } else {
        toast.error("Failed to update User");
      }
    } catch (error) {
      toast.error("Failed to updating User");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit your profile</DialogTitle>
            <DialogDescription>
              Click on save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>Username</Label>
              <Input
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>Avatar</Label>
              <Input
                name="avatar"
                placeholder="Enter avatar URL"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={loading} type="submit" onClick={handleEditUser}>
              {loading ? "Editing..." : "Edit User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
