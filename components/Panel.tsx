/**
 * A visually raised panel for summaries etc
 */
export default function Panel({ children }) {
  return (
    <div className="bg-blue-100 border-blue-500 rounded-lg text-blue-900 px-7 py-3 my-10 shadow-lg text-lg font-medium">
      {children}
    </div>
  );
}
