export const name = "Custom transitions";

export const desc =
    "Define a custom transition via the <code>hidden</code> property of the <code>transition</code> prop.";

export const code = `
// import { Showtime } from "react-showtime";

function Container() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Showtime 
        show={show}
        transition={{
          hidden: {
            transform: "translateY(400px) rotate(180deg)",
            opacity: 0,
          }
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
