export const name = "Custom transitions";

export const desc =
    "Define a custom transition's <em>hidden</em> state via the <code>transition</code> property.";

export const hook = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime({
      transition: {
        transform: "translateY(400px) rotate(180deg)",
        opacity: 0,
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
  const [show, setShow] = useState(true);

  return (
    <>
      <Showtime
        show={show}
        transition={{
          transform: "translateY(400px) rotate(180deg)",
          opacity: 0,
        }}
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
