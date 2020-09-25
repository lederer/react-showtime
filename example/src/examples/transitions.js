export const complex = true;

export const name = "Transitions";

export const desc =
    "Pass a transition name, here using default duration, delay, and easing.";

const transitions = [
    { name: "slideFade", hasSecondItem: true },
    { name: "slide", hasSecondItem: true },
    { name: "fade" },
    { name: "rise" },
    { name: "scale" },
];

export const hook = {};
transitions.forEach(({ name, hasSecondItem }) => {
    hook[name] = `
// import { useShowtime } from "react-showtime";

function Container() {
  const [ref, isMounted, show, hide] = useShowtime("${name}");

  return (
    <>
      {isMounted && <RandomEmoji ref={ref} />}
      ${hasSecondItem ? "<RandomEmoji />" : ""}
      <Button 
        onClick={isMounted ? hide : show}
        label={isMounted ? "Hide" : "Show"}
      />
    </>
  );
}
`;
});

export const component = {};
transitions.forEach(({ name, hasSecondItem }) => {
    component[name] = `
// import { Showtime } from "react-showtime";

function Container() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Showtime show={show} transition="${name}">
        {(ref) => (
          <RandomEmoji ref={ref} />
        )}
      </Showtime>
      ${hasSecondItem ? "<RandomEmoji />" : ""}
      <Button 
        onClick={() => setShow((current) => !current)}
        label={show ? "Hide" : "Show"}
      />
    </>
  );
}
`;
});
