import React, { useState, Ref } from "react";

import { Showtime, useShowtime } from "..";

function App() {
    const [pRef, isPMounted, showP, hideP] = useShowtime<HTMLParagraphElement>(
        "slide"
    );
    const [show, setShow] = useState(true);
    const toggle = () => setShow(current => !current);
    return (
        <div className="App">
            <header className="App-header">
                <Showtime show={show}>
                    {(ref: Ref<HTMLImageElement>) => (
                        <img
                            ref={ref}
                            src="../img/azavea.svg"
                            className="App-logo"
                            alt="logo"
                        />
                    )}
                </Showtime>
                <button onClick={toggle}>Toggle Logo!</button>
                {isPMounted && (
                    <p ref={pRef}>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                )}
                <button onClick={() => (isPMounted ? hideP() : showP())}>
                    Toggle Instructions
                </button>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
