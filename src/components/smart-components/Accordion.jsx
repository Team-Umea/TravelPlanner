import React, { useRef, useState, useEffect } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function Accordion({ headline, children }) {
  const [isExtended, setIsExtended] = useState(false);
  const childrenRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useOutsideClick(childrenRef, () => setIsExtended(false));

  useEffect(() => {
    if (childrenRef.current) {
      setContentHeight(isExtended ? childrenRef.current.scrollHeight : 0);
    }
  }, [isExtended]);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">{headline}</h2>
        <button onClick={() => setIsExtended((prev) => !prev)}>
          {isExtended ? <GoChevronUp size={24} /> : <GoChevronDown size={24} />}
        </button>
      </div>
      <div
        ref={childrenRef}
        style={{ maxHeight: contentHeight }}
        className={`overflow-hidden transition-max-height duration-[400ms] ease-in-out mb-8`}>
        {children}
      </div>
    </div>
  );
}
