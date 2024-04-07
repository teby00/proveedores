import Image from "next/image";
import { ImageOff, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import prisma from "../lib/db";
import { User } from "@nextui-org/user";

export default async function Post({ params }) {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className=" max-w-unit-10xl mx-auto h-min-screen md:px-unit-8xl pb-8">
      {post?.image ? (
        <Image
          src={post?.image}
          width={600}
          height={600}
          className="object-cover aspect-video rounded-lg"
          alt={post?.tittle}
        />
      ) : (
        <div className="bg-[#3f3f46] object-cover aspect-video rounded-lg flex justify-center items-center">
          <ImageOff width={48} height={48} />
        </div>
      )}
      <div className="px-4">
        <h1 className="text-2xl font-bold my-4">{post?.tittle}</h1>
        <div className="flex justify-between items-center mb-4">
          <Link href={`/profile/${post?.user?.id}`}>
            <User
              avatarProps={{ src: post?.user?.image, size: "md" }}
              name={post?.user?.name}
            />
          </Link>
          <div className=" text-end">
            <h3 className="text-xl">
              {post?.price} {post?.currency}
            </h3>
            <p className=" text-slate-300">Pedido mínimo {post?.min}</p>
          </div>
        </div>
        <h2 className="text-md text-slate-300">{post?.description}</h2>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Contacto</h2>
          <div className="md:flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Phone />
              <p className="text-slate-300">{post?.phone}</p>
            </div>
            {post?.email && (
              <div className="flex items-center space-x-2">
                <Mail />
                <p className="text-slate-300">{post?.email}</p>
              </div>
            )}
          </div>
          {post?.address && (
            <div className="flex items-center space-x-2">
              <MapPin />
              <p className="text-slate-300">{post?.address}</p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold  mb-3">Logística</h2>
          <h2 className="text-slate-300">Lugar de origen: {post?.location}</h2>
          {post?.packing && (
            <h2 className="text-slate-300">Tipo de Empaque: {post?.packing}</h2>
          )}
          {post?.units_packing && (
            <h2 className="text-slate-300">
              Unidades por empaque: {post?.units_packing}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
