import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import Link from "next/link";
import { Button } from "@nextui-org/button";
import SessionModule from "@/components/SessionModule";
import { Plus } from "lucide-react";
import Logo from "@/components/icons/logo";

export default function Nav() {
  return (
    <Navbar className="bg-transparent backdrop-blur-0 backdrop-saturate-100">
      <NavbarBrand className=" space-x-2">
        <Logo size="36px" />
        <Link href="/" passHref>
          <p className="font-bold text-inherit">Proveedores</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <SessionModule />
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            as={Link}
            href="/publish"
            aria-label="Publicar"
            className="hidden md:flex"
          >
            Publica tu anuncio
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
