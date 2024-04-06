"use server";

import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const agregarProducto = async (prevState, { formData, ...data }) => {
  const image = formData.get("image");
  const bytes = await image.arrayBuffer();
  const buffer = new Uint8Array(bytes);

  const res = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
      .end(buffer);
  });

  if (!res.secure_url) {
    console.log(res);
  }

  const result = await prisma.post.create({
    data: {
      ...data,
      image: res.secure_url,
    },
  });
  revalidatePath("/");
  redirect("/");
};

export const logout = async () => {
  signOut();
};

export const login = async () => {
  signIn();
};
