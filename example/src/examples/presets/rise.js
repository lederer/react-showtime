export const name = "rise";

export const desc =
    "Nice for dialogs. Rise up and fade in. Fade out and drop down.";

export const code = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [isMounted, ref, show, hide] = useShowtime("rise");

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
