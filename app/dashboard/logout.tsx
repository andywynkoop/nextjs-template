import { signOut } from "@/auth";

export default function Logout() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit">Logout</button>
    </form>
  );
}
