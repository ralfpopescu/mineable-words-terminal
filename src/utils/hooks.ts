import { useLocation } from "react-router";

export const useQueryParams = () => {
    return new URLSearchParams(useLocation().search);
  }

export const setQueryParams = () => {
    const location = useLocation();
}