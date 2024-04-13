"use client";
import Link from "next/link";
import { Home, CirclePlus, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar } from "@nextui-org/avatar";
import { Skeleton } from "@nextui-org/skeleton";

export default function BottomNavbar() {
  const { data: session, status } = useSession();

  const links = [
    {
      icon: <Home size={32} />,
      text: "Inicio",
      href: "/",
    },
    {
      icon: <CirclePlus size={32} />,
      text: "Publicar",
      href: "/publish",
    },
    {
      icon:
        status === "authenticated" ? (
          <Avatar
            name={session?.user?.name}
            size="sm"
            src={session?.user?.image}
          />
        ) : status === "loading" ? (
          <Skeleton className="w-8 h-8 rounded-full" />
        ) : (
          <User size={32} />
        ),
      text: "Perfil",
      href: `/profile/${session?.user?.id}`,
    },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 flex items-center justify-around w-full bg-foreground-50 z-50 border-t-1 border-foreground-100">
      {links?.map((link) => (
        <Link
          key={link.text}
          href={link.href}
          className="text-small font-thin p-2 flex flex-col items-center"
        >
          {link.icon}
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
