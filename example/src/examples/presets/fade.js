export const name = "fade";

export const desc = "Fade in/out.";

export const code = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [isMounted, ref, show, hide] = useShowtime("fade");

  return (
    <>
      {isMounted && <RandomEmoji ref={ref} />}
      <Button 
        onClick={isMounted ? hide : show}
        label={isMounted ? "Hide" : "Show"}
      />
    </>
  );
}
`;
