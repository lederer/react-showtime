export const name = "Asymmetric";

export const desc =
    "Use different transitions for showing and hiding with <code>transition.hiddenBefore</code> and <code>transition.hiddenAfter</code>.";

export const hook = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime({
      transition: {
        hiddenBefore: {
          transform: "translateY(400px) rotate(180deg)",
          opacity: 0,
        },
        hiddenAfter: "fade",
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
