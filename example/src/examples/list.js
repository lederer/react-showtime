export const noInline = true;

export const name = "Lists";

export const desc =
    "The <code>&lt;Showtime&gt;</code> component's <code>onHidden</code> handler makes it well suited for growable lists of dismissable items.";

export const component = `
// import { Showtime } from "react-showtime";

function Item({onHidden, ...props}) {
  const [show, setShow] = useState(true);
  return (
    <Showtime
      startWithTransition
      show={show}
      onHidden={onHidden}
      {...props}
    >
      {(ref) => (
        <RandomEmoji ref={ref} onClose={() => setShow(false)} />
      )}
    </Showtime>
  );
}

function Container() {
  const [items, setItems] = useState([Date.now()]);
  return (
    <>
      {items.map(item => (
        <Item
          key={item}
          onHidden={() => 
            items.splice(items.indexOf(item), 1)
          }
        />
      ))}
      <Button 
        onClick={() => 
          setItems((current) => [Date.now(), ...current])
        }
        label="Add"
      />
    </>
  );
}

render(<Container />)
`;
