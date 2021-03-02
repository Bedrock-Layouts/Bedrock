import React from "react";

type HandleMQLChange = (this: MediaQueryList, env: MediaQueryListEvent) => void;

const useMediaQuery = (query: string) => {
  const [match, setMatch] = React.useState(false);

  const mqlRef = React.useRef<MediaQueryList | null>(null);

  React.useEffect(() => {
    let shouldUpdate = true;

    if (window && window.matchMedia) {
      mqlRef.current = window.matchMedia(query);
    }
    const { current: mql } = mqlRef;

    if (mql && match !== mql.matches) {
      setMatch(mql.matches);
    }

    const handleChange: HandleMQLChange = ({ matches }) => {
      if (shouldUpdate) setMatch(matches);
    };

    mql?.addEventListener("change", handleChange);

    return () => {
      shouldUpdate = false;
      mql?.removeEventListener("change", handleChange);
    };
  }, [query, match, setMatch]);

  return match;
};

export default useMediaQuery;
