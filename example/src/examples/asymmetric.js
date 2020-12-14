export const name = "Asymmetric";

export const desc =
    "Use different transitions for showing and hiding with <code>showTransition</code> and <code>hideTransition</code>.";

export const hook = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime({
    showTransition: {
      transform: "translateY(400px) rotate(180deg)",
      opacity: 0,
    },
    hideTransition: "fade",
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
  const [show, setShow] = useState(true);

  return (
    <>
      <Showtime
        show={show}
        showTransition={{
          transform: "translateY(400px) rotate(180deg)",
          opacity: 0,
        }}
        hideTransition="fade"
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
