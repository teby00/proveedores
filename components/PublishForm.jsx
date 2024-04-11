"use client";

import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { agregarProducto } from "@/lib/actions";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { useTransition } from "react";

const moneda = [
  {
    value: "cup",
    label: "CUP",
  },
  {
    value: "usd",
    label: "USD",
  },
];

const schema = z.object({
  tittle: z.string().min(1, { message: "Debe agregar un nombre al producto" }),
  price: z
    .number({
      required_error: "Agrega el precio",
      invalid_type_error: "Debe tener un precio",
    })
    .positive({ message: "El precio no puede ser un valor negativo" }),
  description: z.string().catch(null),
  min: z
    .number({
      required_error: "Agrega un minimo de pedido",
      invalid_type_error: "Debe tener un minimo de pedido",
    })
    .positive({ message: "El pedido minimo no puede ser un valor negativo" }),
  currency: z.enum(moneda.map((e) => e.value)),
  phone: z
    .number({
      required_error: "Agrega el telefono",
      invalid_type_error: "Debe tener un telefono",
    })
    .positive(),
  email: z.string().catch(null),
  address: z
    .string()
    .max(150, { message: "No más de 150 caracteres" })
    .catch(null),
  location: z.string().min(1, { message: "Este campo es requerido" }),
  packing: z.string().max(20).catch(null),
  units_packing: z.number().positive().catch(null),
});

export default function PublishForm() {
  const { data: session } = useSession();
  const [file, setFile] = useState(undefined);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (dataForm) => {
    const formData = new FormData();
    formData.append("image", file);
    startTransition(async () => {
      await agregarProducto({ ...dataForm, userId: session?.userId, formData });
    });
  };

  return (
    <main className="mx-auto min-h-screen pt-6 px-4 pb-20 max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-2xl font-semibold mb-14">
          Información del producto
        </h3>
        <Input
          {...register("tittle")}
          isInvalid={!!errors.tittle}
          errorMessage={errors.tittle?.message}
          label="Nombre del producto"
          labelPlacement="outside"
          className="mb-4"
          placeholder="Ingresa un nombre"
          isClearable
        />

        <Textarea
          {...register("description")}
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
          labelPlacement="outside"
          label="Descripción"
          placeholder="Describe aspectos importantes de tu producto"
          className="mb-4"
          isClearable
        />

        <div className="md:flex gap-4 my-8">
          {!file && (
            <label
              htmlFor="document"
              className="w-full h-40 mb-8 md:mb-0 flex-1 flex flex-col justify-center items-center p-4 cursor-pointer rounded-xl bg-[#27272a]"
            >
              <ImagePlus stroke="#85858c" />
              <p className="text-small font-thin text-[#85858c]">
                Agregar foto
              </p>
            </label>
          )}
          {file && (
            <div className=" mb-8 md:mb-0 w-full h-40 flex-1 flex cursor-pointer rounded-xl relative">
              <img
                src={URL.createObjectURL(file)}
                className="object-cover w-full h-full rounded-xl"
                alt="previsualizacion de imagen"
              />
              <button
                onClick={() => setFile(undefined)}
                className="bg-[#27272a] rounded-full p-2 text-slate-500 absolute top-4 right-4"
              >
                <X />
              </button>
            </div>
          )}
          <input
            id="document"
            value={file?.filename}
            onChange={handleImage}
            hidden
            accept="image/*"
            type="file"
          />
          <div className="flex flex-col flex-1 gap-4">
            <Input
              {...register("min", { valueAsNumber: true })}
              isInvalid={!!errors.min}
              errorMessage={errors.min?.message}
              labelPlacement="outside"
              type="number"
              label="Pedido mínimo"
              placeholder="Mínimo de unidades"
              className="mb-4"
              isClearable
            />
            <Input
              label="Precio"
              placeholder="0.00"
              type="number"
              min={0}
              labelPlacement="outside"
              {...register("price", { valueAsNumber: true })}
              isInvalid={!!errors.price}
              errorMessage={errors.price?.message}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              endContent={
                <Select
                  aria-label="moneda"
                  {...register("currency")}
                  disallowEmptySelection
                  style={{
                    background: "transparent",
                    width: "100px",
                  }}
                  defaultSelectedKeys={["cup"]}
                >
                  {moneda.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              }
            />
          </div>
        </div>

        <h3 className="text-2xl font-semibold mt-6 mb-8">Datos de contacto</h3>
        <div className="md:flex gap-4">
          <Input
            {...register("phone", { valueAsNumber: true })}
            isInvalid={!!errors.phone}
            errorMessage={errors.phone?.message}
            type="number"
            min={0}
            label="Teléfono"
            labelPlacement="outside"
            placeholder="00000000"
            className="mb-12 md:mb-4"
            isClearable
          />
          <Input
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            label="Correo"
            labelPlacement="outside"
            placeholder="proveedores@gmail.com"
            className="mb-12 md:mb-4"
            isClearable
          />
        </div>
        <Input
          {...register("address")}
          isInvalid={!!errors.address}
          errorMessage={errors.address?.message}
          label="Dirección comercial"
          labelPlacement="outside"
          placeholder="Calle principal % Calles secundarias"
          className="mb-4"
          isClearable
        />
        <h3 className="text-2xl font-semibold mt-6 mb-12">Logística</h3>
        <Input
          {...register("location")}
          isInvalid={!!errors.location}
          errorMessage={errors.location?.message}
          label="Lugar de origen"
          labelPlacement="outside"
          placeholder="Municipio, Provincia"
          className="mb-12 md:mb-4"
          isClearable
        />
        <div className="md:flex gap-4">
          <Input
            {...register("packing")}
            isInvalid={!!errors.packing}
            errorMessage={errors.packing?.message}
            label="Tipo de empaque"
            labelPlacement="outside"
            placeholder="Cajas, bolsas etc..."
            className="mb-12 md:mb-4"
            isClearable
          />
          <Input
            {...register("units_packing", { valueAsNumber: true })}
            isInvalid={!!errors.units_packing}
            errorMessage={errors.units_packing?.message}
            type="number"
            min={0}
            label="Unidades por empaque"
            labelPlacement="outside"
            placeholder="Número de unidades"
            className="mb-4"
            isClearable
          />
        </div>
        <div className="flex justify-end">
          <Button
            color="primary"
            as="button"
            type="submit"
            className="w-full md:w-auto mt-4"
            isLoading={isPending}
            disabled={isPending}
          >
            Agregar
          </Button>
        </div>
      </form>
    </main>
  );
}
