import React from 'react';

type HandleMQLChange = (this: MediaQueryList, env: MediaQueryListEvent) => any;

const useMediaQuery = (query: string) => {
  const [match, setMatch] = React.useState(false);

  const mqlRef = React.useRef<MediaQueryList | null>(null);

  React.useEffect(() => {
    let shouldUpdate = true;

    mqlRef.current = window.matchMedia(query);
    const { current: mql } = mqlRef;

    if (match !== mql.matches) {
      setMatch(mql.matches);
    }

    const handleChange: HandleMQLChange = ({ matches }) => {
      if (shouldUpdate) setMatch(matches);
    };

    if (mql) mql.addListener(handleChange);

    return () => {
      shouldUpdate = false;
      if (mql) mql.removeListener(handleChange);
    };
  }, [query, match]);

  return match;
};

export default useMediaQuery;
