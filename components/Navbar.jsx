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

export default function Nav() {
  return (
    <Navbar className="bg-transparent backdrop-blur-0 backdrop-saturate-100">
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <Link href="/" passHref>
          <p className="font-bold text-inherit">Proveedores</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <SessionModule />
        </NavbarItem>
        <NavbarItem>
          <Link href="/publish">
            <Button color="primary" className="hidden md:block">
              Publica tu anuncio
            </Button>
            <Button color="primary" className="md:hidden" isIconOnly>
              <Plus />
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
