import CurrentUser from "./current-user";
import { ModeToggle } from "./Dark-mode";

export default function HeaderPage() {
  return (
    <header className="flex justify-between items-center p-4 border">
      <ModeToggle />
      <CurrentUser />
    </header>
  );
}
