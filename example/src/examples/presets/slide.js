export const name = "slide";

export const desc = "Slide open/closed.";

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
