import { useState, useEffect } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);
    setMatches(media.matches);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};