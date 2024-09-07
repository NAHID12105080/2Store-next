import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
export default async function Nav() {
  const session = await auth();
  return (
    <header className=" py-8">
      <nav>
        <ul className="flex justify-between">
          <li>Logo</li>
          <li>
            {!session ? (
              <Button asChild>
                <Link href="/auth/login">
                  <LogIn />
                  <span className="ml-2">Log in</span>
                </Link>
              </Button>
            ) : (
              <UserButton expires={session?.expires} user={session?.user} />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
