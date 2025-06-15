'use server';

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const AuthLoader = async () => {
  const user = await currentUser();
  if (!user) return null;

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });
  }

  return null;
};
