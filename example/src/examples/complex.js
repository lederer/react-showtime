export const name = "Extravaganza";

export const desc =
    "A whole bunch of stuff… Asymmetric transitions. Per-property timing. Start hidden.";

export const hook = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime({
      startHidden: true,
      transition: {
        hiddenBefore: {
          transform: "translateY(-100%)",
          duration: 200,
          easing: "cubic-bezier(0.16, 2.04, 0.41, 1.67)",
        },
        hiddenAfter: {
          transform: "translateX(300%)",
          opacity: {
            value: 0,
            delay: 50,
            duration: 200,
          },
          duration: 400,
          easing: "cubic-bezier(0.02, -0.31, 0.55, -0.34)",
        },
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

export const component = `
// import { Showtime } from "react-showtime";

function Container() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Showtime 
        show={show}
        transition={{
          hiddenBefore: {
            transform: "translateY(-100%)",
            duration: 200,
            easing: "cubic-bezier(0.16, 2.04, 0.41, 1.67)",
          },
          hiddenAfter: {
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
