"use client";
import React, { useTransition } from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { deleteArticle } from "@/actions/delete-article";
 
type RecentArticlesProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      comments: true;
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All →
          </Button>
        </div>
      </CardHeader>
      {!articles.length ? (
        <CardContent>No articles found.</CardContent>
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.slice(0, 5).map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Published
                    </span> 
                  </TableCell>
                  <TableCell>{article.comments.length}</TableCell>
                  <TableCell>{new Date(article.createdAt).toDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`dashboard/articles/${article.id}/edit`}>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </Link>
                      <DeleteButton articleId={article.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentArticles;

type DeleteButtonProps = {
  articleId: string;
};

export const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setError(null); // reset error

    startTransition(async () => {
      try {
        await deleteArticle(articleId);
        // optionally reload or redirect
        window.location.reload(); // or use router.refresh()
      } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    }
    });
  };

  return (
    <div className="space-y-2">
      <Button
        disabled={isPending}
        variant="ghost"
        size="sm"
        type="button"
        onClick={handleDelete}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
      {error && (
        <p className="text-xs text-red-500 border border-red-400 rounded p-2 bg-red-50">
          you must be logged in and the author of this article to delete it.
        </p>
      )}
    </div>
  );
};