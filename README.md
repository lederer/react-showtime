# react-showtime

Mount and unmount React elements with CSS transitions.

[![NPM](https://img.shields.io/npm/v/react-showtime.svg)](https://www.npmjs.com/package/react-showtime) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-showtime
```

## Usage

### Hook

```jsx
import React from "react";

import { useShowtime } from "react-showtime";

const HookExample = () => {
    const [isMounted, ref, show, hide] = useShowtime();

    return (
        <>
            <button onClick={() => (isMounted ? hide() : show())}>
                Toggle
            </button>
            {isMounted && <div ref={ref}>Hi there</div>}
        </>
    );
};
```

### Component

```jsx
import React, { useState } from "react";

import { Showtime } from "react-showtime";

const ComponentExample = () => {
    const [show, setShow] = useState(true);

    return (
        <>
            <button onClick={() => setShow((current) => !current)}>
                Toggle
            </button>
            <Showtime show={show}>
                {(ref) => <div ref={ref}>Oh hi</div>}
            </Showtime>
        </>
    );
};
```
