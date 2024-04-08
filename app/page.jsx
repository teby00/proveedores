import { Suspense } from "react";
import prisma from "@/lib/db";
import { Skeleton } from "@nextui-org/skeleton";
import CardProduct from "@/components/CardProduct";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const productos = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center mx-auto pt-40 max-w-5xl">
      <div className=" mb-32">
        <h1 className="text-center px-4 text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl">
          Encuentra tus proveedores
        </h1>
        <h2 className="my-6 px-4 text-center text-lg leading-6 text-gray-600 dark:text-gray-200">
          Conecta con proveedores o clientes de toda Cuba.
        </h2>

        <form
          action={async (formState) => {
            "use server";

            const search = formState.get("search");
            const searchParams = new URLSearchParams();
            await searchParams.set("q", search);
            redirect(`/search?${searchParams.toString()}`);
          }}
        >
          <Input
            placeholder="Buscar en Proveedores..."
            name="search"
            className="px-4"
            isRequired
            endContent={
              <Button color="primary" type="submit" isIconOnly>
                <Search />
              </Button>
            }
          />
        </form>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {productos?.map((post) => (
          <Suspense
            key={post.id}
            fallback={
              <div className=" flex flex-col p-4">
                <Skeleton className="aspect-square rounded-lg mb-3" />
                <Skeleton className=" w-40 h-4 rounded-lg mb-3" />
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
