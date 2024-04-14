'use client';
import Link from 'next/link';
import Home from '@/components/icons/home';
import Add from '@/components/icons/add';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Avatar } from '@nextui-org/avatar';
import { Skeleton } from '@nextui-org/skeleton';
import { usePathname } from 'next/navigation';

export default function BottomNavbar() {
  const { data: session, status } = useSession();
  const path = usePathname();

  const links = [
    {
      icon: <Home size={32} />,
      text: 'Inicio',
      href: '/',
    },
    {
      icon: <Add size={32} />,
      text: 'Publicar',
      href: '/publish',
    },
    {
      icon:
        status === 'authenticated' ? (
          <Avatar
            isBordered={path === `/profile/${session?.user?.id}`}
            color="primary"
            name={session?.user?.name}
            size="sm"
            src={session?.user?.image}
          />
        ) : status === 'loading' ? (
          <Skeleton className="w-8 h-8 rounded-full" />
        ) : (
          <User size={32} />
        ),
      text: 'Perfil',
      href: `/profile/${session?.user?.id}`,
    },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 flex items-center justify-around w-full bg-foreground-50 z-50 border-t-1 border-foreground-100">
      {links?.map((link) => (
        <Link
          key={link.text}
          href={link.href}
          className={`${
            path === link.href && 'text-primary-500'
          } text-default-500 text-small p-2 flex flex-col items-center gap-[2px]`}
        >
          {link.icon}
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
