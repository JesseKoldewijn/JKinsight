import { type Metadata } from "next";
import { parse } from "node-html-parser";
import { Suspense } from "react";

import Link from "next/link";
import { notFound } from "next/navigation";

import HeroSection from "@/components/layout/sections/HeroSection";
import { Button } from "@/components/ui/button";
import Avatar from "@/images/avatar.webp";
import { type PostsParams, fetchWP } from "@/server/wp-api";

export type BlogPageArgs = {
  params: {
    slug: string[];
  };
};

export const revalidate = 3600; // revalidate at most every hour

export const getPostBySlug = async (slug: string[]) => {
  const wpPostsParams = {
    status: ["publish"],
    slug: Array.isArray(slug) ? slug : Array(slug),
  } satisfies PostsParams;

  const WpPosts = await fetchWP("/posts", wpPostsParams, {
    next: {
      tags: [`blog-${slug}`],
    },
  });

  if (!WpPosts) return null;
  else {
    const post = WpPosts[0];

    const postTitle = String(parse(post.title.rendered));
    const postContent = String(parse(post.content.rendered));

    const prettyTitle =
      postTitle.length > 20 ? postTitle.slice(0, 60) + "..." : postTitle;
    const prettyContent =
      postContent.length > 60 ? postContent.slice(0, 60) + "..." : postContent;

    return {
      prettyTitle,
      prettyContentShort: prettyContent,
      data: post,
    };
  }
};

export const generateMetadata = async ({ params: { slug } }: BlogPageArgs) => {
  const wpPost = await getPostBySlug(Array.isArray(slug) ? slug : Array(slug));

  if (!wpPost)
    return {
      title: "Blog",
      description: "An overview of my blog posts.",
      openGraph: {
        title: "Blog | JKinsight",
        description: "An overview of my blog posts.",
        url: "https://jkinsight.nl",
      },
    } satisfies Metadata;

  const post = wpPost.data;

  const postTitle = String(parse(post.title.rendered).text);
  const postContent = String(parse(post.content.rendered).text);

  const prettyTitle =
    postTitle.length > 20 ? postTitle.slice(0, 60) + "..." : postTitle;
  const prettyContent =
    postContent.length > 60 ? postContent.slice(0, 60) + "..." : postContent;

  return {
    title: prettyTitle,
    description: prettyContent,
    openGraph: {
      title: `${prettyTitle} | JKinsight`,
      description: prettyContent,
      url: `https://jkinsight.nl/blog/${post.slug}`,
    },
  } satisfies Metadata;
};

const BlogPage = async ({ params: { slug } }: BlogPageArgs) => {
  const post = await getPostBySlug(Array.isArray(slug) ? slug : Array(slug));

  if (!post) {
    notFound();
  }

  const postDescWithoutHtml = parse(post.prettyContentShort).text;
  const postContentWithoutHtml = parse(post.data.content.rendered).text;

  return (
    <>
      <HeroSection
        bannerImage={{
          dark: Avatar,
          light: Avatar,
        }}
        bannerContent={{
          title: post.prettyTitle,
          description: postDescWithoutHtml,
        }}
      />
      <section className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <Suspense fallback={<p>Loading...</p>}>
          <span className="pb-6 text-neutral-800 dark:text-neutral-200">
            Posted on: {new Date(post.data.date).toLocaleDateString()}
          </span>
          {postContentWithoutHtml}
          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link href="/blog">Back to overview</Link>
            </Button>
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default BlogPage;
