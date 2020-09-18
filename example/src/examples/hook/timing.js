export const name = "Timing";

export const desc =
    "Pass an object with <code>transition</code>, <code>duration</code>, <code>delay</code>, and <code>easing</code>. All are optional.";

export const code = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime({
      transition: "scale",
      duration: 500,
      delay: 250,
      easing: "linear",
  });

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
