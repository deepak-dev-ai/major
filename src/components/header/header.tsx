import Image from "next/image";
import { ModeToggle } from "./Dark-mode";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";

export default function HeaderPage() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Link href="/">
        <Image
          className="object-contain rounded-lg"
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>
      <div className="flex items-center space-x-4">
        <UserDropdown />
        <ModeToggle />
      </div>
    </header>
  );
}
