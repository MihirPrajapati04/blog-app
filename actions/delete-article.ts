"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: You must be logged in.");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const article = await prisma.articles.findUnique({
    where: { id: articleId },
    select: { authorId: true },
  });

  if (!article) {
    throw new Error("Article not found.");
  }

  if (article.authorId !== user.id) {
    throw new Error("Unauthorized: You are not the author of this article.");
  }

  // Delete comments first (because of foreign key constraint)
  await prisma.comments.deleteMany({
    where: { articleId: articleId },
  });

  await prisma.articles.delete({
    where: {
      id: articleId,
    },
  });

  revalidatePath("/dashboard");
};
