export const name = "Defaults";

export const desc =
    "Use the <code>show</code> prop to toggle. Default transition (slideFade), duration (250ms), delay (0ms), and easing (ease).";

export const code = `
// import { Showtime } from "react-showtime";

function Container() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Showtime show={show}>
        {(ref) => (
          <RandomEmoji ref={ref} />
        )}
      </Showtime>
      <RandomEmoji />
      <Button 
        onClick={() => setShow((current) => !current)}
        label={show ? "Hide" : "Show"}
      />
    </>
  );
}
`;
