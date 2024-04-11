"use client";

import Ellipsis from "@/components/icons/ellipsis";
import { Button } from "@nextui-org/button";
import { Trash2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { deletePost } from "@/lib/actions";
import { useTransition } from "react";

export default function DeletePost({ id, userId }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    startTransition(async () => {
      deletePost({ id, userId });
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="absolute top-5 right-5 z-auto"
          isIconOnly
          radius="full"
        >
          <Ellipsis />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerFooter>
          <DrawerClose>
            <Button
              color="danger"
              onPress={handleDelete}
              isLoading={isPending}
              disabled={isPending}
              startContent={!isPending && <Trash2 />}
              fullWidth
            >
              Eliminar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
