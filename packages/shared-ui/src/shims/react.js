const React = typeof window !== 'undefined' ? window.React : null;

if (typeof window !== 'undefined' && !React) {
  console.warn("React global not found. Make sure host-app exposes window.React");
}

export default React;
export const {
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
  useReducer,
  useImperativeHandle,
  useLayoutEffect,
  useDebugValue,
  useDeferredValue,
  useTransition,
  useId,
  useSyncExternalStore,
  useInsertionEffect,
  createContext,
  forwardRef,
  memo,
  Fragment,
  StrictMode,
  Suspense,
  Children,
  cloneElement,
  createElement,
  isValidElement,
  version
} = React || {};
