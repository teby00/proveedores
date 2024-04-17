'use client';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { search } from '@/lib/actions';
import { useTransition } from 'react';

const schema = z.object({
  query: z
    .string()
    .trim()
    .regex(/[\w]/g)
    .min(1, { message: 'Que estás buscando?' }),
});

export default function FormSearch() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (dataForm) => {
    startTransition(async () => {
      await search(dataForm);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start">
      <Input
        placeholder="Buscar en Proveedores..."
        {...register('query')}
        variant="bordered"
        isInvalid={!!errors.query}
        endContent={
          <Button
            className="bg-transparent text-default-300 hover:text-default-500"
            type="submit"
            disabled={isPending}
            isLoading={isPending}
            title="Buscar"
            aria-label="Buscar"
            isIconOnly
          >
            <Search />
          </Button>
        }
      />
    </form>
  );
}
