export const name = "Asymmetric";

export const desc = "Use different transitions for showing and hiding.";

export const code = `
// import { Showtime } from "react-showtime";

function Container() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Showtime 
        show={show}
        transition={{
          hiddenBefore: {
            transform: "translateY(400px) rotate(180deg)",
            opacity: 0,
          },
          hiddenAfter: "fade",
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
