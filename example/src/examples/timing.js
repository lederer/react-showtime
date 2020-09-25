export const name = "Timing";

export const desc =
    "Use <code>duration</code>, <code>delay</code>, and <code>easing</code> to customize timing.";

export const hook = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime({
    transition: "scale",
    duration: 600,
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

export const component = `
// import { Showtime } from "react-showtime";

function Container() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Showtime 
        show={show}
        transition="scale"
        duration={600}
        delay={250}
        easing="linear"
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
