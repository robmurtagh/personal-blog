import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

/**
 * A Prism code renderer for syntax highlighting code snippets:
 * https://prismjs.com/
 */
export default function Code({ className, children }) {
  const languageClass = className.split(" ").find((x) => x.startsWith("language-")) || "";
  const language = languageClass.replace("language-", "");

  return (
    <Highlight {...defaultProps} theme={theme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`overflow-x-scroll p-4 ${className}`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
