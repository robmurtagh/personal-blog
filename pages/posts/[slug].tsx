import "katex/dist/katex.min.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { InlineMath } from "react-katex";
import { BlogPostFrontMatter } from "@/pages/index";
import { postFilePaths, POSTS_PATH } from "@/utils/mdxUtils";
import Code from "@/components/Code";
import Panel from "@/components/Panel";
import VideoAutoplay from "@/components/VideoAutoplay";
import BlockMathWithOverflowScroll from "@/components/BlockMathWithOverflowScroll";

/**
 * This is a map which is passed to `MDXRemote`. Every time a
 * 'tag' is utilised in our `mdx` posts, there is a lookup in
 * this map to see which component we should render. The docs
 * for which 'tags' there are are [here](https://mdxjs.com/getting-started#table-of-components).
 *
 * Conditional loading would be handled with:
 * ```ts
 * import dynamic from "next/dynamic";
 *
 * const components = {
 *   TestComponent: dynamic(() => import("@/components/TestComponent")),
 * }
 * ```
 */
const components: Record<string, React.ReactNode> = {
  a: ({ as, href, ...otherProps }) => (
    <Link as={as} href={href}>
      <a {...otherProps} />
    </Link>
  ),
  img: ({ src, alt }) => <img src={src} alt={alt} className="w-full" />,
  code: Code,
  VideoAutoplay,
  InlineMath,
  BlockMath: BlockMathWithOverflowScroll,
  Panel,
};

/**
 * Statically render this page at build-time with these props:
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    /** Optionally pass remark/rehype plugins */
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

/**
 * Statically render a page for each of these paths at build time:
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
};

/** Props passed to `PostPage` */
type PostPageProps = {
  /** Parsed blog post which will be passed straight through to `MDXRemote` */
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  /** The frontmatter parsed as an object. Type of this object is by convention only */
  frontMatter: BlogPostFrontMatter;
};

/**
 * Component which represents each blog post page
 */
export default function PostPage({ source, frontMatter }: PostPageProps) {
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <div className="max-w-prose mx-auto px-4">
        <header>
          <nav className="mt-4 mb-8">
            <Link href="/">
              <a>👈 Go back home</a>
            </Link>
          </nav>
        </header>
        <article className="prose prose-blue mb-20">
          <header>
            <h1>{frontMatter.title}</h1>
            <h4 className="italic">{frontMatter.description}</h4>
          </header>
          <main>
            <MDXRemote {...source} components={components} />
          </main>
        </article>
      </div>
    </>
  );
}
