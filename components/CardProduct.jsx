import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { ImageOff } from "lucide-react";

export default async function CardProduct({ id, cornerEl }) {
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      tittle: true,
      price: true,
      images: true,
    },
  });

  return (
    <div className=" flex flex-col p-4 relative">
      <Link href={`/post/${id}`}>
        {post?.images ? (
          <Image
            src={post?.images[0]?.url}
            width={350}
            height={350}
            className="object-cover aspect-square rounded-lg"
            priority
            alt={post?.tittle}
          />
        ) : (
          <div className="bg-[#3f3f46] object-cover aspect-square rounded-lg flex justify-center items-center">
            <ImageOff width={48} height={48} />
          </div>
        )}

        <h3 className="text-lg md:text-xl font-bold mt-2">{post?.tittle}</h3>

        <p className=" text-gray-500 font-extrabold uppercase mt-1">
          ${post?.price}
        </p>
      </Link>

      {cornerEl && cornerEl}
    </div>
  );
}
