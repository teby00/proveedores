import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { User } from '@nextui-org/user';
import AccordionPost from '@/components/AccordionPost';
import { Skeleton } from '@nextui-org/skeleton';
import { Suspense } from 'react';

export default async function Post({ params }) {
  const { images, tittle, price, currency, min, description, user, ...rest } =
    await prisma.post.findFirst({
      where: {
        id: params.id,
      },
      include: {
        user: true,
        images: true,
      },
    });

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-8xl h-full w-full px-2 lg:px-24">
        <div className="relative flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <div className="relative h-full w-full flex-none">
            <div
              className="relative shadow-black/5 shadow-none rounded-large"
              style={{ maxWidth: 'fit-content' }}
            >
              {images ? (
                <Suspense
                  fallback={
                    <Skeleton className="w-full h-full aspect-square object-cover  rounded-large" />
                  }
                >
                  <Image
                    src={images[0]?.url}
                    width={400}
                    height={400}
                    priority
                    className="relative z-10 aspect-square object-cover  shadow-black/5  shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large h-full w-full"
                    alt={tittle}
                  />
                </Suspense>
              ) : (
                <div className="bg-[#3f3f46] object-cover aspect-video rounded-lg flex justify-center items-center">
                  <ImageOff width={48} height={48} />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight">{tittle}</h1>
            <h2 className="sr-only">Información del producto</h2>
            <div className="mt-2">
              <p className="text-xl font-medium tracking-tight">
                {price} {currency}
              </p>
              <p className="text-default-500 font-light">Pedido mínimo {min}</p>
            </div>

            <div className="mt-4">
              <p className="sr-only">Descripción del producto</p>
              <p className="line-clamp-5 text-medium text-default-500">
                {description}
              </p>
            </div>
            <Link className="mt-4" href={`/profile/${user?.id}`}>
              <User
                avatarProps={{ src: user?.image, size: 'md' }}
                name={user?.name}
              />
            </Link>

            <AccordionPost props={rest} />
          </div>
        </div>
      </div>
    </div>
  );
}
