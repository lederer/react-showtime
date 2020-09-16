export const name = "Timing";

export const desc =
    "Use <code>duration</code>, <code>delay</code>, and <code>easing</code> props.";

export const code = `
// import { Showtime } from "react-showtime";

function Container() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Showtime 
        show={show}
        transition="scale"
        duration={500}
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
