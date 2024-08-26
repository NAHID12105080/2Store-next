"use server";

import { db } from "@/server/index";

export const getPosts = async () => {
  const posts = await db.query.posts.findMany();
  if (!posts) {
    return { error: "no posts found" };
  }
  return { successful: posts };
};
