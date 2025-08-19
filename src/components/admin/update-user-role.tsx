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
import { Label } from "@/components/ui/label";
import { UPDATE_USER_ROLE } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import { Edit } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { userContext, userwithoutPassword } from "../context/user-context";
import { RoleType } from "../../../generated/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function UpdateUserRole({
  user,
}: {
  user: userwithoutPassword;
}) {
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = useState(false);
  async function handleEditUserRole() {
    setLoading(true);
    try {
      const data: {
        updateUserRole: RoleType;
      } = await gqlClient.request(UPDATE_USER_ROLE, {
        userId: user?.id,
        role,
      });
      if (data?.updateUserRole) {
        toast.success("User role updated successfully");
        window.location.reload();
      } else {
        toast.error("Failed to update User role");
      }
    } catch (error) {
      toast.error("Failed to updating User role");
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
            <DialogTitle>Update User Role</DialogTitle>
            <DialogDescription>
              Click on save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as RoleType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
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
              onClick={handleEditUserRole}
            >
              {loading ? "Editing..." : "Edit User Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
