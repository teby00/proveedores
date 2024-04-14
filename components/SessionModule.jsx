'use client';

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { useSession, signIn, signOut } from 'next-auth/react';
import GoogleIcon from '@/components/icons/google';
import { useState } from 'react';
import { Skeleton } from '@nextui-org/skeleton';
import { useRouter } from 'next/navigation';

export default function SessionModule() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      {status === 'authenticated' && (
        <Dropdown
          placement="bottom-end"
          classNames={{
            content: 'dark text-default-500',
          }}
        >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={session?.user?.name}
              size="sm"
              src={session?.user?.image}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              onClick={() => router.push(`/profile/${session?.user?.id}`)}
              key="my_profile"
            >
              Mi perfil
            </DropdownItem>

            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => signOut({ redirect: false })}
            >
              Cerrar Sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      {status === 'unauthenticated' && (
        <Button
          onClick={() => {
            setLoading(true);
            signIn('google');
          }}
          variant="flat"
          isLoading={loading}
          startContent={!loading && <GoogleIcon />}
        >
          Iniciar Sesion
        </Button>
      )}

      {status === 'loading' && <Skeleton className="w-10 h-10 rounded-full" />}
    </>
  );
}
