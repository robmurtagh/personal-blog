import React from "react";
import Typed from "typed.js";

/**
 * A component which simulates a user typing, and erasing
 * text on a terminal.
 */
export default function TypedText({ strings }: { strings: string[] }) {
  /** A reference which will subsequently point to the DOM node we'll be updating */
  const domElement = React.useRef(null);
  /** A reference which will subsequently point to the instance of 'TypedJS' */
  const typedInstance = React.useRef(null);

  React.useEffect(() => {
    const options = {
      strings,
      typeSpeed: 50,
      backSpeed: 50,
    };

    /** elRef refers to the <span> rendered below  */
    typedInstance.current = new Typed(domElement.current, options);

    return () => {
      /** Make sure to destroy Typed instance during cleanup to prevent memory leaks */
      typedInstance.current.destroy();
    };
  }, [strings]);

  return <span className="whitespace-normal" ref={domElement} />;
}
