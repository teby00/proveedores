'use client';
import { Button } from '@nextui-org/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function ButtonLogOut() {
  return (
    <Button
      onClick={() => signOut()}
      isIconOnly
      variant="bordered"
      aria-label="Cerrar sesion"
    >
      <LogOut />
    </Button>
  );
}
