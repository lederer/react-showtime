import React, { useState } from "react";

import { useShowtime, Showtime } from "react-showtime";

import "./App.css";

function Add(props) {
    return (
        <button className="add" {...props}>
            +
        </button>
    );
}

function Remove(props) {
    return (
        <button className="remove" {...props}>
            x
        </button>
    );
}

function HookDemo() {
    const [isMounted, ref, show, hide] = useShowtime();

    return (
        <section>
            <div>{isMounted || <Add onClick={show} />}</div>
            {isMounted && (
                <div ref={ref}>
                    <Remove onClick={hide} />
                    Hook
                </div>
            )}
            <div></div>
        </section>
    );
}

function ComponentDemo() {
    const [show, setShow] = useState(true);

    return (
        <section>
            <div>
                {show || (
                    <Add
                        onClick={() => {
                            setShow(true);
                        }}
                    />
                )}
            </div>
            <Showtime
                show={show}
                onHidden={() => console.log("hidden")}
                onShowing={() => console.log("showing")}
            >
                {(ref) => (
                    <div ref={ref}>
                        <Remove onClick={() => setShow(false)} />
                        Component
                    </div>
                )}
            </Showtime>
            <div></div>
        </section>
    );
}

function App() {
    const [demo, setDemo] = useState("hook");

    return (
        <>
            <nav>
                <button
                    className={demo === "hook" ? "on" : null}
                    onClick={() => setDemo("hook")}
                >
                    Hook
                </button>
                <button
                    className={demo === "component" ? "on" : null}
                    onClick={() => setDemo("component")}
                >
                    Component
                </button>
            </nav>
            {demo === "hook" && <HookDemo />}
            {demo === "component" && <ComponentDemo />}
        </>
    );
}

export default App;
