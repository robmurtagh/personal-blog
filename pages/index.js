import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import SphereAnimation from "../components/SphereAnimation";
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils";

export default function Index({ posts }) {
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
            <p className="prose prose-blue">I'm Rob, and I'm a Software Engineer</p>
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

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
