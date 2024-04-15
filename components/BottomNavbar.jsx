'use client';
import Link from 'next/link';
import Home from '@/components/icons/home';
import Add from '@/components/icons/add';
import { User } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import { Avatar } from '@nextui-org/avatar';
import { Skeleton } from '@nextui-org/skeleton';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function BottomNavbar() {
  const { data: session, status } = useSession();
  const path = usePathname();
  const router = useRouter();

  return (
    <nav className="md:hidden fixed bottom-0 flex items-center justify-around w-full bg-foreground-50 z-50 border-t-1 border-foreground-100">
      <Link
        href="/"
        className={`${
          path === '/' && 'text-primary-500'
        } text-default-500 text-small p-2 flex flex-col items-center gap-[2px]`}
      >
        <Home size={32} />
        Inicio
      </Link>

      <span
        onClick={() => {
          status === 'unauthenticated'
            ? signIn('google')
            : router.push('publish');
        }}
        className={`${
          path === '/publish' && 'text-primary-500'
        } text-default-500 text-small p-2 flex flex-col items-center gap-[2px]`}
      >
        <Add size={32} />
        Publicar
      </span>

      <span
        onClick={() => {
          status === 'unauthenticated'
            ? signIn('google')
            : router.push(`/profile/${session?.user?.id}`);
        }}
        className={`${
          path === `/profile/${session?.user?.id}` && 'text-primary-500'
        } text-default-500 text-small p-2 flex flex-col items-center gap-[2px]`}
      >
        {status === 'authenticated' && status !== 'loading' && (
          <Avatar
            isBordered={path === `/profile/${session?.user?.id}`}
            color="primary"
            name={session?.user?.name}
            size="sm"
            src={session?.user?.image}
          />
        )}
        {status === 'unauthenticated' && status !== 'loading' && (
          <User size={32} />
        )}
        {status === 'loading' && <Skeleton className="w-8 h-8 rounded-full" />}
        Perfil
      </span>
    </nav>
  );
}
