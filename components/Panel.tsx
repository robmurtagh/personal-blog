/**
 * A visually raised panel for summaries etc
 */
export default function Panel({ className, children }) {
  return (
    <div className={`bg-blue-100 border-blue-500 border-l-4 rounded-lg px-7 py-3 my-10 shadow-lg ${className}`}>
      {children}
    </div>
  );
}
