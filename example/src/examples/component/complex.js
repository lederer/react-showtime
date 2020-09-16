export const name = "Extravaganza";

export const desc =
    "Asymmetric transitions. Per-property timing. Do your thing.";

export const code = `
// import { Showtime } from "react-showtime";

function Container() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Showtime 
        show={show}
        transition={{
          beforeShow: {
            transform: "translateY(-100%)",
            duration: 200,
            easing: "cubic-bezier(0.16, 2.04, 0.41, 1.67)",
          },
          afterShow: {
            transform: "translateX(300%)",
            opacity: {
                value: 0,
                delay: 50,
                duration: 200,
            },
            duration: 400,
            easing: "cubic-bezier(0.02, -0.31, 0.55, -0.34)",
          },
        }}
      >
          {(ref) => (
            <RandomEmoji ref={ref} />
          )}
      </Showtime>
      <Button 
        onClick={() => setShow((current) => !current)}
        label={show ? "Hide" : "Show"}
      />
    </>
  );
}
`;
