export const name = "scaleTop";

export const desc =
    "Slide open and scale in from the top. Slide closed and scale out to the top.";

export const code = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [isMounted, ref, show, hide] = useShowtime("scaleTop");

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
