# React Showtime 🎟️ 🥁 🎭

### Mount & unmount with CSS transitions

React Showtime makes it easy to apply CSS transitions to the appearance and disappearance of React elements and components. It automatically handles mounting and unmounting to allow time for transitions to occur.

👯&emsp;Choose between `useShowtime` hook and `<Showtime />` component.<br/>
💃&emsp;Feels familiar: `useShowtime` is a near-drop-in replacement for conditional rendering with a state boolean.<br/>
💅&emsp;Specify _showing_ styles however you like – inline, Emotion, styled-components, classnames, you name it.<br/>
💨&emsp;Sensible API for defining _hidden_ styles and custom transitions.<br/>
🎩&emsp;Preset transitions: `slideFade`, `slide`, `fade`, `rise`, `scale`, `scaleTop`.<br/>
🎭&emsp;Symmetric or asymmetric show/hide transitions.<br/>
🕴&emsp;Zero dependencies. 21k unpacked.

The essential insight of React Showtime is that the one-two sequence of React's `useLayoutEffect` and `useEffect` hooks is nicely suited to the one-two sequence of mounting a component with _hidden_ CSS values and then applying _showing_ CSS values to trigger the transition. As for hiding, transition event handlers trigger unmounting once the "hide" transition is complete.

### What React Showtime is not

React Showtime is **not for transitions that do not involve mounting/unmounting**. It was created specifically as a sort of shim for conditional rendering.

React Showtime is **not for sophisticated animations**. Consider a more full-featured library like react-spring for those.

## Getting Started

```bash
yarn add react-showtime
```

```bash
npm install react-showtime
```

Choose from the `useShowtime` hook or the `Showtime` component.

### useShowtime hook

```jsx
import React from "react";

import { useShowtime } from "react-showtime";

const HookExample = () => {
    // Choose from object or array destructuring…
    // const {isMounted, ref, show, hide} = useShowtime();
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

You must pass `ref` down to your element or component and use `isMounted` to conditionally render it. Use `show()` and `hide()` to trigger the transitions.

The element or component will start off _showing_ by default. Pass `{ startHidden: true }` to keep it hidden initially. See [API](#api) below for more settings.

`useShowtime`'s return value can be destructured as an array or object. Array destructuring is convenient if you have multiple calls to `useShowtime` and so need to name their return values differently.

### Showtime component

The `Showtime` component may be a better solution when many children need to transition in and out of the DOM, so you don't need to manage a bevy of calls to `useShowtime`.

`Showtime` is a render prop component. It requires a single child that is a function that accepts a `ref` parameter. Pass `ref` to your element or component.

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

### Attaching the ref

As you can see above, React Showtime provides a `ref` that must end up attached to the element you're showing/hiding. It uses the ref to directly assign CSS transition properties and _hidden_ styles to the element and to listen for transition events.

If you are transitioning an _element_ directly, you can just pass the provided `ref` as a prop.

If you are transitioning a _custom component_, consider updating the component to use [ref forwarding](https://reactjs.org/docs/forwarding-refs.html) to pass the ref down to the component's outermost element.

If you are transitioning a _component you cannot edit_ and that does not forward refs to its outermost element, attach the `ref` to a wrapper div.

## Configuration

### TL;DR

To use a [preset transition](#preset-transitions) with the default duration (`250ms`), delay (`0ms`), and easing (`"ease"`):

```jsx
useShowtime("slide");
```

```jsx
<Showtime transition="fade">
```

To use a preset with custom duration, delay, or easing:

```jsx
useShowtime({
    transition: "rise",
    duration: 1000,
    delay: 250,
    easing: "linear",
});
```

```jsx
<Showtime
    transition="scale"
    duration={500}
    delay={50}
    easing="ease-out"
>
```

To use a [custom transition](#custom-transitions) instead of a preset:

```jsx
useShowtime({
    transition: {
        hidden: { … },
        hiddenBefore: …,
        hiddenAfter: …,
    },
    …
});
```

```jsx
<Showtime
    transition={{
        hidden: { … },
        hiddenBefore: …,
        hiddenAfter: …,
    }}
    …
>
```

### Preset transitions

React Showtime offers some preset transitions:

-   `slideFade` (default)
-   `slide`
-   `fade`
-   `rise`
-   `scale`
-   `scaleTop`

Specify a preset by passing its name as the sole parameter to `useShowtime` or as the value of `Showtime`'s `transition` prop.

`useShowtime` also accepts an object instead of a string, in which case pass `{ transition: <transition name> }`.

```jsx

  // Hook
  const [isMounted, ref, show, hide] = useShowtime("scale");

  // Component
  <Showtime show={show} transition="scale">
    ...
```

### Transition timing

By default, React Showtime uses a `transition-duration` of `250ms` and `transition-function` of `ease`, with no `transition-delay`.

You can pass other values via `useShowtime`'s object parameter or `Showtime`'s props…

```jsx

    // Hook
    const [isMounted, ref, show, hide] = useShowtime({
        duration: 500,
        delay: 100,
        easing: "ease-out",
    });

    // Component
    <Showtime
        show={show}
        transition="scale"
        duration={500}
        delay={150}
        easing="ease-out"
    >
        ...
    };
```

### Custom transitions

You can forego React Showtime's preset transitions in favor of your own custom transitions. Pass an object to the `transition` prop(erty) with one or more of the following properties: `hidden`, `hiddenBefore`, `hiddenAfter`.

#### `transition.hidden`

The `hidden` property of the `transition` object should be an object literal of the CSS properties and values that define your element or component's hidden state.

It also accepts optional `duration`, `delay`, and `easing` properties, which will override any corresponding properties passed in at the top-level.

Each CSS property can be a string, number, or object. Strings and numbers will be passed through as CSS, and will be transitioned according to any duration, delay, and easing values inherited or passed in as siblings.

If an object is passed in as a CSS property value, it should contain `{ value, duration, delay, easing }` properties. `value` is required and will be passed through as CSS. The other properties are optional and will be applied to that property's transition, overriding any inherited transition values.

Do not include a `transition` property on the `hidden` object. Although it is a valid CSS property, it will be ignored, since React Showtime uses its own API to define transitions.

Eg…

```jsx
const HookExample = () => {
    const [isMounted, ref, show, hide] = useShowtime({
        transition: {
            hidden: {
                duration: 350,
                right: "100vw",
                top: "-100vh",
                opacity: {
                    value: 0,
                    duration: 400,
                    easing: "linear",
                },
            },
        },
    });

    // ...
};
```

#### Asymmetric transitions with `transition.hiddenBefore` and `transition.hiddenAfter`

The `hiddenBefore` and `hiddenAfter` properties of the `transition` object conform to approximately the same structural definition as the `hidden` property. `hiddenBefore` defines how the element or component is hidden prior to being shown, and `hiddenAfter` defines how it is hidden after being shown. This is useful if, say, a notification should slide down from above, but fade away when dismissed.

`hiddenBefore` and `hiddenAfter` will be merged onto `hidden` if it is passed in as well, so you can still define shared properies in one place.

There are a couple of differences between the structure of `hiddenBefore`/`hiddenAfter` and `hidden`, which allow you to use a preset for an asymmetric transition:

-   You can pass a string to `hiddenBefore`/`hiddenAfter` instead of an object. The string must be the name of a preset transiton.
-   The `hiddenBefore`/`hiddenAfter` object can contain a `transition` key. Its value must be the name of a preset transition, and it will _not_ be passed on to the CSS transiton property. This way you can specify a preset and also pass in optional custom values for `duration`, `delay`, or `easing`.

Eg…

```jsx
const HookExample = () => {
    const [isMounted, ref, show, hide] = useShowtime({
        transition: {
            hiddenBefore: "fade", // or { transition: "fade", delay: 100, … }
            hiddenAfter: {
                duration: 350,
                right: "100vw",
                top: "-100vh",
                opacity: 0,
            },
        },
    });

    // ...
};
```

If you want to use the same transition for showing and hiding, but with different duration, delay, or easing, just define the transition once in `hidden` and then define `duration`, `delay`, or `easing` values in `hiddenBefore` and `hiddenAfter`.

### Events

The `Showtime` component accepts handlers for `onHidden` and `onShowing`. Other lifecycle events are being considered.

The `useShowtime` hook currently does not accept any event handlers.

## API

### useShowtime hook

The `useShowtime` hook accepts a single parameter, which can be either of:

-   a string referring to a [preset transition](#preset-transitions)
-   an object with the following properties:

| Name        | Type                       | Req'd? | Default     | Description                                                                                                                 |
| ----------- | -------------------------- | ------ | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| startHidden | boolean                    | no     | `false`     | Hide the element initially                                                                                                  |
| duration    | number or string           | no     | `250`       | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| delay       | number or string           | no     | `0`         | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| easing      | string                     | no     | "ease"      | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |
| transition  | string or transitionObject | no     | "slideFade" | [Preset transition](#preset-transitions) or object defining custom transition (see below)                                   |

### Showtime component

| Name       | Type                       | Req'd? | Default     | Description                                                                                                                 |
| ---------- | -------------------------- | ------ | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| show       | boolean                    | yes    |             | Toggle this to show/hide the element or component                                                                           |
| duration   | number or string           | no     | `250`       | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| delay      | number or string           | no     | `0`         | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| easing     | string                     | no     | "ease"      | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |
| transition | string or transitionObject | no     | "slideFade" | [Preset transition](#preset-transitions) or object defining custom transition (see below)                                   |
| onHidden   | function                   | no     |             | Called when hide transition complete.                                                                                       |
| onShowing  | function                   | no     |             | Called when show transition complete.                                                                                       |

### Transition objects

#### transitionObject

| Name         | Type                           | Req'd? | Description                                                    |
| ------------ | ------------------------------ | ------ | -------------------------------------------------------------- |
| hidden       | transitionProperties           | no     | Styles and transition timing of before and after hidden state. |
| hiddenBefore | string or transitionProperties | no     | Styles and transition timing of hiddenBefore hidden state.     |
| hiddenAfter  | string or transitionProperties | no     | Styles and transition timing of hiddenAfter hidden state.      |

#### transitionProperties

| Name               | Type                           | Req'd? | Default   | Description                                                                                                                 |
| ------------------ | ------------------------------ | ------ | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| duration           | number or string               | no     | inherited | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| delay              | number or string               | no     | inherited | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| easing             | string                         | no     | inherited | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |
| [Any CSS property] | string, number, or cssProperty | yes    |           | Use camelCase for names. String and number values passed directly to style.                                                 |

#### cssProperty

| Name     | Type             | Req'd? | Default   | Description                                                                                                                 |
| -------- | ---------------- | ------ | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| value    | string or number | yes    |           | Any CSS property name.                                                                                                      |
| duration | number or string | no     | inherited | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| delay    | number or string | no     | inherited | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| easing   | string           | no     | inherited | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |

## Development

React Showtime was built with [create-react-hook](https://github.com/Hermanya/create-react-hook) using [this blog post](https://www.twilio.com/blog/release-custom-react-component-hook-effect-npm-package) as a guiding reference.

Any API changes should be reflected in the demo app in `example/` and in this readme.

### Getting started

1.  `yarn start` in `src/` to watch for changes there.
2.  Then `yarn start` in `example/` to watch for changes there and run a dev server.
