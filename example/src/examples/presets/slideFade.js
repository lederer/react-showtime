export const name = "slideFade";

export const desc = "Slide open and fade in. Fade out and slide closed.";

export const code = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [isMounted, ref, show, hide] = useShowtime("slideFade");

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
