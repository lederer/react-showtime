export const name = "Preset";

export const desc =
    "Pass a preset name to the <code>transition</code> prop. Here we pass the <code>slide</code> preset.";

export const code = `
// import { Showtime } from "react-showtime";

function Container() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Showtime show={show} transition="slide">
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
