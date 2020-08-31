# react-showtime

> Easily mount and unmount React components with CSS transitions.

[![NPM](https://img.shields.io/npm/v/react-showtime.svg)](https://www.npmjs.com/package/react-showtime) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-showtime
```

## Usage

```jsx
import React, { Component } from "react";

import { useMyHook } from "react-showtime";

const Example = () => {
    const example = useMyHook();
    return <div>{example}</div>;
};
```

## License

Apache-2.0 © [Azavea](https://github.com/azavea)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
