import React from 'react';

type HandleMQLChange = (this: MediaQueryList, env: MediaQueryListEvent) => any;

const useMediaQuery = (query: string) => {
  const initialState =
    (window && window.matchMedia && window.matchMedia(query).matches) || false;
  const [match, setMatch] = React.useState(initialState);

  const mqlRef = React.useRef<MediaQueryList | null>(null);
  if (!mqlRef.current && window && window.matchMedia) {
    mqlRef.current = window.matchMedia(query);
  }
  React.useEffect(() => {
    const { current: mql } = mqlRef;

    const handleChange: HandleMQLChange = ({ matches }) => {
      setMatch(matches);
    };

    if (mql) {
      mql.addListener(handleChange);
    }

    return () => {
      if (mql) {
        mql.removeListener(handleChange);
      }
    };
  }, [setMatch]);

  return match;
};

export default useMediaQuery;
