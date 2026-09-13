export const SnapshotPicker = ({ network }) => {
  const origin = "https://snapshots.unitynodes.com";
  const frame = useRef(null);
  const [height, setHeight] = useState(580);

  // The widget follows the docs theme and reports its own height, so the iframe never scrolls and
  // never shows the opaque canvas corners a color-scheme mismatch paints behind a rounded iframe.
  const sendTheme = () => {
    const win = frame.current && frame.current.contentWindow;
    const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    if (win) win.postMessage({ type: "unitynodes:theme", theme }, origin);
  };

  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== origin || !frame.current || event.source !== frame.current.contentWindow) return;
      const data = event.data || {};
      if (data.type === "unitynodes:height" && data.height > 100 && data.height < 4000) setHeight(Math.ceil(data.height));
      if (data.type === "unitynodes:ready") sendTheme();
    };
    window.addEventListener("message", onMessage);
    const observer = new MutationObserver(sendTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    sendTheme();
    return () => {
      window.removeEventListener("message", onMessage);
      observer.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={frame}
      src={`${origin}/${network}/widget.html`}
      title="Snapshot picker"
      width="100%"
      allow="clipboard-write"
      onLoad={sendTheme}
      style={{ height: `${height}px`, border: "none", background: "transparent", display: "block", borderRadius: "14px" }}
    />
  );
};
