import prisma from '@/lib/db';
import CardProduct from '@/components/CardProduct';
import { Suspense } from 'react';
import { Skeleton } from '@nextui-org/skeleton';
import { User } from '@nextui-org/user';
// import { Button } from "@nextui-org/button";
// import { LogOut } from "lucide-react";
import { auth } from '@/auth';
import DeletePost from '@/components/DeletePost';

export const dynamic = 'force-dynamic';

export default async function Profile({ params }) {
  const session = await auth();

  const user = await prisma.user.findFirst({
    where: {
      id: params.id,
    },
    select: {
      image: true,
      name: true,
      email: true,
      posts: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <main className="mx-auto min-h-screen md:pt-6 pb-20 max-w-2xl">
      <div className="flex justify-between items-center p-4">
        <User
          name={user?.name}
          description={user?.email}
          avatarProps={{ src: user?.image, size: 'lg' }}
        />
        {/* {session?.user?.id === params?.id && (
          <Button isIconOnly aria-label="Cerrar sesion">
            <LogOut />
          </Button>
        )} */}
      </div>

      <div className="grid w-full grid-cols-2">
        {user?.posts?.map((post) => (
          <Suspense
            key={post?.id}
            fallback={
              <div className=" flex flex-col p-4">
                <Skeleton className="aspect-square rounded-lg mb-3" />
                <Skeleton className=" w-3/4 h-4 rounded-lg mb-3" />
                <Skeleton className=" w-1/3 h-3 rounded-lg" />
              </div>
            }
          >
            <CardProduct
              key={post.id}
              id={post?.id}
              cornerEl={
                session?.user?.id === params?.id && (
                  <DeletePost id={post?.id} userId={params.id} />
                )
              }
            />
          </Suspense>
        ))}
      </div>
    </main>
  );
}
