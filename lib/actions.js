'use server';

import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { signIn, signOut } from '@/auth';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const agregarProducto = async ({ formData, ...data }) => {
  const image = formData.get('image');
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
    return { res };
  }

  try {
    await prisma.post.create({
      data: {
        ...data,
        images: {
          create: { id: res.public_id, url: res.secure_url },
        },
      },
    });
  } catch (error) {
    return { error };
  }

  revalidatePath('/');
  redirect('/');
};

export const deletePost = async ({ id, userId }) => {
  let images = [];
  try {
    images = await prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        images: true,
      },
    });
  } catch (error) {
    return { error };
  }
  try {
    await cloudinary.uploader.destroy(images?.images[0]?.id);
  } catch (error) {
    return { error };
  }

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return { error };
  }

  revalidatePath(`/profile/${userId}`, 'page');
};

export const search = async (data) => {
  const searchParams = new URLSearchParams();

  try {
    await searchParams.set('q', data?.query);
  } catch (error) {
    return { error };
  }

  redirect(`/search?${searchParams.toString()}`);
};

export const logout = async () => {
  signOut();
  revalidatePath('/', 'layout');
  redirect('/');
};

export const login = async () => {
  signIn();
};
