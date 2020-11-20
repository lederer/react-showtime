export const name = "Extravaganza";

export const desc =
    "A whole bunch of stuff… Asymmetric transitions. Per-property timing. Start hidden.";

export const hook = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime({
      startHidden: true,
      showTransition: {
        transform: "translateY(-200%)",
      },
      showDuration: 200,
      showEasing: "cubic-bezier(0.16, 2.04, 0.41, 1.67)",
      hideTransition: {
        transform: "translateX(300%)",
        opacity: {
          value: 0,
          delay: 100,
          duration: 200,
        },
      },
      hideDuration: 300,
      hideEasing: "cubic-bezier(0, -0.4, 0.54, -0.34)",
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
        showTransition={{
          transform: "translateY(-200%)",
        }}
        showDuration={200}
        showEasing="cubic-bezier(0.16, 2.04, 0.41, 1.67)"
        hideTransition={{
          transform: "translateX(300%)",
          opacity: {
            value: 0,
            delay: 100,
            duration: 200,
          },
        }}
        hideDuration={300}
        hideEasing="cubic-bezier(0, -0.4, 0.54, -0.34)"
      >
        <RandomEmoji />
      </Showtime>
      <Button
        onClick={() => setShow((current) => !current)}
        label={show ? "Hide" : "Show"}
      />
    </>
  );
}
`;
