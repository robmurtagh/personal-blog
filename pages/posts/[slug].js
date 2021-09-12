import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";

/**
 * Documented here:
 * https://mdxjs.com/getting-started#table-of-components
 */
const components = {
  a: ({ as, href, ...otherProps }) => (
    <Link as={as} href={href}>
      <a {...otherProps} />
    </Link>
  ),
  img: ({ src, alt }) => <img src={src} alt={alt} className="w-full" />,
  code: Code,
  // Conditional loading example (`import dynamic from "next/dynamic";`):
  // TestComponent: dynamic(() => import("../../components/TestComponent")),
  Head,
};

function Code({ className, children }) {
  const languageClass = className.split(" ").find((x) => x.startsWith("language-")) || "";
  const language = languageClass.replace("language-", "");

  return (
    <Highlight {...defaultProps} theme={theme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`overflow-x-scroll p-4 ${className}`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

const PostPage = ({ source, frontMatter }) => {
  return (
    <div className="max-w-prose mx-auto px-4">
      <header>
        <nav className="mt-4 mb-8">
          <Link href="/">
            <a>👈 Go back home</a>
          </Link>
        </nav>
      </header>
      <article className="prose prose-blue">
        <header>
          <h1>{frontMatter.title}</h1>
          <h4 className="italic">{frontMatter.description}</h4>
        </header>
        <main>
          <MDXRemote {...source} components={components} />
        </main>
      </article>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
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

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
