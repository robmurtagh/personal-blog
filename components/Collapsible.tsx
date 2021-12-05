import { useState } from "react";

/**
 * A more/less expandable panel
 */
export default function Collapsible({ header, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <span className="flow-root my-0">
        <button
          type="button"
          className="w-full flex items-center justify-start text-blue-600"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <IconMinus /> : <IconPlus />}
          <span className="pl-1">{isExpanded ? "Less 😱" : "More 🥱"}</span>
        </button>
      </span>
      {isExpanded && <div>{children}</div>}
    </div>
  );
}

function IconPlus() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconMinus() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  );
}
