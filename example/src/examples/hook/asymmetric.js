export const name = "Asymmetric";

export const desc =
    "Use different transitions for showing and hiding with <code>transition.hiddenBefore</code> and <code>transition.hiddenAfter</code>.";

export const code = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime({
      transition: {
        hiddenBefore: {
          transform: "translateY(400px) rotate(180deg)",
          opacity: 0,
        },
        hiddenAfter: "fade",
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
