"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { search } from "@/lib/actions";
import { useTransition } from "react";

const schema = z.object({
  query: z.string().min(1, { message: "Que estás buscando?" }),
});

export default function FormSearch() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (dataForm) => {
    startTransition(async () => {
      await search(dataForm);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start px-4">
      <Input
        placeholder="Buscar en Proveedores..."
        {...register("query")}
        classNames={{ inputWrapper: ["rounded-r-none"] }}
        isInvalid={!!errors.query}
        errorMessage={errors.query?.message}
      />
      <Button
        color="primary"
        type="submit"
        disabled={isPending}
        isLoading={isPending}
        className="rounded-l-none"
        isIconOnly
      >
        <Search />
      </Button>
    </form>
  );
}
