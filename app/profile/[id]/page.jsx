import prisma from "@/lib/db";
import CardProduct from "@/components/CardProduct";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/button";
import { LogOut } from "lucide-react";

export default async function Profile({ params }) {
  const user = await prisma.user.findFirst({
    where: {
      id: params.id,
    },
    select: {
      image: true,
      name: true,
      posts: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <main className="mx-auto min-h-screen pt-6 pb-20 max-w-2xl">
      <div className="flex justify-between items-center p-4">
        <User
          name={user?.name}
          avatarProps={{ src: user?.image, size: "lg" }}
        />
        <Button isIconOnly aria-label="Cerrar sesion">
          <LogOut />
        </Button>
      </div>

      <div className="grid grid-cols-2">
        {user?.posts?.map((post) => (
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
