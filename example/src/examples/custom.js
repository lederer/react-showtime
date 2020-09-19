export const name = "Custom transitions";

export const desc =
    "Define a custom transition's hidden state in <code>transition.hidden</code>.";

export const hook = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime({
      transition: {
        hidden: {
          transform: "translateY(400px) rotate(180deg)",
          opacity: 0,
        }
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
