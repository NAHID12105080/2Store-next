import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { MdLooksTwo } from "react-icons/md";

export default async function Nav() {
  const session = await auth();
  return (
    <header className=" py-8">
      <nav>
        <ul className="flex justify-between items-center">
          <Link href="/" className=" p-2 rounded flex items-center">
            <MdLooksTwo className="text-violet-700 xl:text-4xl text-3xl " />
            <span className="xl:text-4xl text-2xl text-violet-700">store</span>
          </Link>
          <li>
            {!session ? (
              <Button asChild>
                <Link href="/auth/login">
                  <LogIn />
                  <span className="ml-2  ">Log in</span>
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
