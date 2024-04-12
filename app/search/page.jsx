import prisma from "@/lib/db";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Button } from "@nextui-org/button";
import CardProduct from "@/components/CardProduct";
import Link from "next/link";

export default async function Search({ searchParams }) {
  const productos = await prisma.post.findMany({
    where: {
      tittle: {
        contains: searchParams?.q,
      },
    },
  });

  if (productos?.length < 1) {
    return (
      <main className=" min-h-screen flex flex-col items-start justify-center mx-auto mt-[-4rem] md:pt-20 max-w-5xl">
        <div className="px-10 text-gray-300">
          <h1 className="text-4xl mb-2 font-medium text-gray-900 dark:text-gray-50 sm:text-4xl">
            No hay resultados para &quot;{searchParams?.q}&quot;
          </h1>
          <p>Intenta con otra forma de escribir lo que estás buscando.</p>
          <Button
            className="mt-4"
            as={Link}
            href="/"
            color="primary"
            variant="flat"
          >
            Volver a inicio
          </Button>
        </div>
      </main>
    );
  } else {
    return (
      <main className="min-h-screen mx-auto pt-8 md:pt-20 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {productos?.map((post) => (
            <Suspense
              key={post?.id}
              fallback={
                <div className=" flex flex-col p-4 mt-2 mr-4">
                  <Skeleton className="w-[300px] h-[300px] rounded-lg mb-2" />
                  <Skeleton className=" w-40 h-3 rounded-lg mb-2" />
                  <Skeleton className=" w-20 h-3 rounded-lg" />
                </div>
              }
            >
              <CardProduct key={post.id} id={post?.id} />
            </Suspense>
          ))}
        </div>
      </main>
    );
  }
}
