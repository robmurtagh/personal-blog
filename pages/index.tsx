import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import TypedText from "@/components/TypedText";
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
      <div className="max-w-xl mx-auto">
        <div className="flex flex-column flex-wrap pt-10">
          <SphereAnimation className="m-8" />
          <div className="m-8 flex flex-col justify-center">
            <h1 className="font-bold text-4xl md:text-6xl mb-3">Welcome 👋</h1>
            <div className="font-mono text-xl my-2 h-28 md:h-20">
              <TypedText
                strings={[
                  "Hi, I'm Rob",
                  "Thanks for visiting",
                  "I'm an engineer with an interest\nin software which ages well, and the teams\nthat build it",
                ]}
              />
            </div>
            <div className="flex flex-row items-center my-8">
              <a className="m-1" href="https://github.com/robmurtagh">
                <img alt="github-profile" src="/profile-github.png" height="20" width="20"></img>
              </a>
              <a className="m-1" href="https://twitter.com/rjmurtagh">
                <img alt="twitter-profile" src="/profile-twitter.svg" height="20" width="20"></img>
              </a>
              <a className="m-1" href="http://wiki.robmurtagh.com/">
                <img alt="wiki-profile" src="/profile-wiki.svg" height="24" width="24"></img>
              </a>
            </div>
          </div>
        </div>
        <div className="m-8 pb-12">
          <h2 className="font-bold text-xl md:text-3xl">Blog posts</h2>
          <div className="prose prose-blue mt-4 mb-8 text-sm">
            Ocassionally I try to write not <i>too</i> much...
          </div>
          <ul>
            {posts
              .sort((first, second) => second.data.date.localeCompare(first.data.date)) // order by date descending
              .map((post) => (
                <li key={post.filePath} className="my-6">
                  <Link as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`} href={`/posts/[slug]`} passHref>
                    <a>
                      <div className="pl-4 py-4 rounded-lg shadow-md">
                        <h3 className="font-bold text-lg">{post.data.title}</h3>
                        <p className="text-gray-700 text-sm">{post.data.date}</p>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
