import { getCurrentUser } from "@/features/auth/server";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const user = await getCurrentUser();
  return <HeaderClient user={user} />;
}
