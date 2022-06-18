import {useCallback, useEffect, useRef, useState} from "react";

export default function useStateCb<T>(initialState: T): [T, (state: T, cb?: (s: T) => void) => void] {
  const [state, setState] = useState<T>(initialState);
  const cbRef = useRef<any>(null); // init mutable ref container for callbacks

  const setStateCallback = useCallback((state: T, cb?: (s: T) => void) => {
    cbRef.current = cb
    setState(state);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
}
