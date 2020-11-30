export const name = "Defaults";

export const desc =
    "Default transition (slideFade), duration (250ms), delay (0ms), and easing (ease).";

export const hook = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime();

  return (
    <>
      {isMounted && <RandomEmoji ref={ref} />}
      <RandomEmoji />
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
      <Showtime show={show}>
        <RandomEmoji />
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
