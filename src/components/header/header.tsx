import Image from "next/image";
import CurrentUser from "./current-user";
import { ModeToggle } from "./Dark-mode";

export default function HeaderPage() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Image
        className="object-contain rounded-lg"
        src="/logo.png"
        alt="Logo"
        width={50}
        height={50}
      />
      <ModeToggle />
      <CurrentUser />
    </header>
  );
}
