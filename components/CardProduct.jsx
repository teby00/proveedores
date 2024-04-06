import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { ImageOff } from "lucide-react";
export default async function CardProduct({ id }) {
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
  });

  return (
    <Link
      href={`/post/${id}`}
      className=" flex flex-col p-4"
      style={{ flex: "0 0 85%" }}
    >
      {post?.image ? (
        <Image
          src={post?.image}
          width={300}
          height={300}
          className="object-cover aspect-square rounded-lg"
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
  );
}
