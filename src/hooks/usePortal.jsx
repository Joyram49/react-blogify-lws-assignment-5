// import { useEffect } from "react";
// import { createPortal } from "react-dom";

// const Portal = ({ children }) => {
//   const mountElement = document.getElementById("portal-root");
//   const elementDiv = document.createElement("div");

//   useEffect(() => {
//     mountElement.appendChild(elementDiv);

//     return () => mountElement.removeChild(elementDiv);
//   }, [elementDiv, mountElement]);

//   return createPortal(children, elementDiv);
// };

// export default Portal;

import { useEffect, useRef } from "react";

const usePortal = () => {
  const portalRootId = "portal-root";
  const mountElement = useRef(
    document.getElementById(portalRootId) || document.body
  );
  const elementDiv = useRef(document.createElement("div"));

  useEffect(() => {
    const { current: elementDivCurrent } = elementDiv;
    mountElement.current.appendChild(elementDivCurrent);

    return () => mountElement.current.removeChild(elementDivCurrent);
  }, [portalRootId]);

  return elementDiv.current;
};

export { usePortal };
