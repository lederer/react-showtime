export const name = "Preset";

export const desc =
    "Passing a preset name uses it with the default transition, duration, delay, and easing. Here we pass the <code>slide</code> preset.";

export const code = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [isMounted, ref, show, hide] = useShowtime("slide");

  return (
    <>
      {isMounted && <RandomEmoji ref={ref} />}
      <RandomEmoji />
      <Button 
        onClick={isMounted ? hide : show}
        label={isMounted ? "Hide" : "Show"}
      />
    </>
  );
}
`;
