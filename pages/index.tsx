import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import SphereAnimation from "@/components/SphereAnimation";
import { postFilePaths, POSTS_PATH } from "@/utils/mdxUtils";

/** The frontmatter parsed as an object. Type of this object is by convention only */
export type BlogPostFrontMatter = {
  /** Title as specified by user */
  title: string;
  /** Description as specified by user */
  description: string;
  /** Typically passed as e.g. `2020-06-07` */
  date: string;
};

/** Represents the parsed `mdx` blog post file */
export type BlogPost = {
  /** The file name, for example `YYYY-MM-DD-foo.mdx` */
  filePath;
  /** The raw content of the article as a string */
  content;
  /** The frontmatter parsed as an object. Type of this object is by convention only */
  data: BlogPostFrontMatter;
};

/** The `Props` for the main page */
type IndexProps = { posts: BlogPost[] };

/**
 * Statically render this page at build-time with these props:
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps = (): { props: IndexProps } => {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);
    return { content, data, filePath } as BlogPost;
  });

  return { props: { posts } };
};

/**
 * Primary landing page of the site
 */
export default function Index({ posts }: IndexProps) {
  return (
    <>
      <Head>
        <title>Welcome 👋</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap">
          <SphereAnimation className="m-8" />
          <div className="m-8 flex flex-col justify-center">
            <h1 className="font-bold text-5xl md:text-6xl mb-3">Welcome 👋</h1>
            <p className="prose prose-blue">{"I'm Rob, and I'm a Software Engineer"}</p>
            <p className="prose prose-blue">
              You can find me on <a href="https://github.com/robmurtagh">Github</a> and{" "}
              <a href="https://twitter.com/rjmurtagh">Twitter</a>
            </p>
            <p className="prose prose-blue">
              (and I used to keep some notes on <a href="http://wiki.robmurtagh.com/">my wiki)</a>
            </p>
          </div>
        </div>
        <div className="m-8">
          <h2 className="font-bold text-2xl md:text-3xl">Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.filePath}>
                <Link as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`} href={`/posts/[slug]`}>
                  <a>{post.data.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
