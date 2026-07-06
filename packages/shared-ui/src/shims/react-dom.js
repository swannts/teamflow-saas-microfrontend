const ReactDOM = typeof window !== 'undefined' ? window.ReactDOM : null;

if (typeof window !== 'undefined' && !ReactDOM) {
  console.warn("ReactDOM global not found. Make sure host-app exposes window.ReactDOM");
}

export default ReactDOM;
export const {
  createRoot,
  hydrateRoot,
  findDOMNode,
  render,
  unmountComponentAtNode,
  createPortal,
  flushSync,
  version
} = ReactDOM || {};
