import { useLocation } from "@remix-run/react";

export const usePathnameSearchParams = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const searchParams = new URLSearchParams([["redirectTo", pathname]]);

  return searchParams;
};
