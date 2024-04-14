import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import Link from "next/link";
import { Button } from "@nextui-org/button";
import SessionModule from "@/components/SessionModule";
import FormSearch from "@/components/FormSearch";
import Logo from "@/components/icons/logo";

export default function Nav() {
  return (
    <Navbar
      className="bg-transparent backdrop-blur-0 backdrop-saturate-100"
      classNames={{
        wrapper: "justify-normal gap-2 md:gap-4",
        content: "w-full",
      }}
    >
      <NavbarBrand className="space-x-2">
        <Logo size="36px" />
        <Link href="/" className="hidden md:flex" passHref>
          <p className="font-bold text-inherit">Proveedores</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem className="w-full">
          <FormSearch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <SessionModule />
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Button
            color="primary"
            as={Link}
            href="/publish"
            aria-label="Publicar"
          >
            Publica tu anuncio
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
