export const name = "Asymmetric";

export const desc =
    "Use different transitions for showing and hiding with <code>transition.beforeShow</code> and <code>transition.afterShow</code>.";

export const code = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [isMounted, ref, show, hide] = useShowtime({
      transition: {
        beforeShow: {
          transform: "translateY(400px) rotate(180deg)",
          opacity: 0,
        },
        afterShow: "fade",
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
