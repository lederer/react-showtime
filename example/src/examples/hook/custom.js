export const name = "Custom transitions";

export const desc =
    "Define a custom transition via the <code>transition.hidden</code> property.";

export const code = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [isMounted, ref, show, hide] = useShowtime({
      transition: {
        hidden: {
          transform: "translateY(400px) rotate(180deg)",
          opacity: 0,
        }
      },
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
