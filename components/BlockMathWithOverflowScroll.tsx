import { BlockMath } from "react-katex";

/**
 * Katex block math, but handles overflow properly for small screens
 */
export default function BlockMathWithOverflowScroll({ ...props }) {
  return (
    <div className="overflow-x-scroll">
      <BlockMath {...props} />
    </div>
  );
}
