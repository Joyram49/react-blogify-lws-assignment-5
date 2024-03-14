// import { useEffect, useState } from "react";
// import { useAuth } from "./useAuth";

// const useAuthCheck = () => {
//   const { setAuth } = useAuth();
//   const [authChecked, setAuthChecked] = useState(false);

//   const handleStorageChange = () => {
//     const authInfo = localStorage?.getItem("authInfo");
//     if (authInfo) {
//       const localAuth = JSON.parse(authInfo);
//       if (localAuth?.accessToken && localAuth?.user) {
//         setAuth(localAuth);
//       }
//     }
//     setAuthChecked(true);
//   };

//   useEffect(() => {
//     // Check for authentication information on initial render
//     handleStorageChange();

//     // Add event listener for changes in local storage
//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       // Remove event listener on component unmount
//       window.removeEventListener("storage", handleStorageChange);
//     };

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [setAuthChecked, setAuth]);

//   return authChecked;
// };

// export { useAuthCheck };

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const useAuthCheck = () => {
  const { setAuth } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const authInfo = localStorage?.getItem("authInfo");
    if (authInfo) {
      const localAuth = JSON.parse(authInfo);
      if (localAuth?.accessToken && localAuth?.user) {
        setAuth(localAuth);
      }
    }
    setAuthChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuthChecked]);

  return authChecked;
};
export { useAuthCheck };
