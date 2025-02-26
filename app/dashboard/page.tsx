import { Metadata } from "next";
import Logout from "./logout";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default async function Page() {
  const session = await auth();
  return (
    <main>
      <h1>Welcome {session?.user?.email}!</h1>
      <Logout />
    </main>
  );
}
