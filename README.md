# React Showtime 🎟️ 🥁 🎭

### Mount & unmount with CSS transitions

React Showtime makes it easy to apply CSS transitions to the appearance and disappearance of React elements and components. It automatically handles mounting and unmounting to allow time for transitions to occur.

👯&emsp;Choose between `useShowtime` hook and `<Showtime />` component.<br/>
💃&emsp;Feels familiar: `useShowtime` is a near-drop-in replacement for conditional rendering with a state boolean.<br/>
💅&emsp;Specify _showing_ styles however you like – inline, Emotion, styled-components, classnames, you name it.<br/>
💨&emsp;Sensible API for defining _hidden_ styles and custom transitions.<br/>
🎩&emsp;Included transitions: `slideFade`, `slide`, `fade`, `rise`, `scale`.<br/>
🎭&emsp;Symmetric or asymmetric show/hide transitions.<br/>
🕴&emsp;Zero dependencies. 21k unpacked.

The essential insight of React Showtime is that the one-two sequence of React's `useLayoutEffect` and `useEffect` hooks is nicely suited to the one-two sequence of mounting a component with _hidden_ CSS values and then applying _showing_ CSS values to trigger the transition. As for hiding, transition event handlers trigger unmounting once the "hide" transition is complete.

### What React Showtime is not

React Showtime is **not for sophisticated animations**, as it works purely with CSS `transition`, not `animation`. Consider a more full-featured library like react-spring for those.

React Showtime is **not for transitions that do not involve mounting/unmounting**. It was created specifically as a sort of shim for conditional rendering. (That said, if you set `startWithTransition` to `true` and ignore the `isMounted`, `show`, and `hide` return values, it will execute a single transition on the initial mount, which can be nice for, say, adding flair to an initial page load.)

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
    // const {ref, isMounted, show, hide} = useShowtime();
    const [ref, isMounted, show, hide] = useShowtime();

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

The element or component will start off _showing_ by default. Pass `{ startHidden: true }` to keep it _hidden_ initially. If `startHidden` is `false`, you can also pass `{ startWithTransition: true }` to transition in the intial appearance. See [API](#api) below for more settings.

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

To use a [named transition](#transitions) with the default duration (`250ms`), delay (`0ms`), and easing (`"ease"`):

```jsx
const [ref, isMounted, show, hide] = useShowtime("slide");
```

```jsx
<Showtime transition="fade">…</Showtime>
```

To use a named transition with custom duration, delay, or easing:

```jsx
const [ref, isMounted, show, hide] = useShowtime({
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

To use a [custom transition](#custom-transitions), pass an object to `transition` defining the item's _hidden_ state:

```jsx
const [ref, isMounted, show, hide] = useShowtime({
    transition: {
        opacity: 0,
        …
    },
    …
});
```

```jsx
<Showtime
    transition={{
        opacity: 0,
        …
    }}
    …
>
```

### Transitions

React Showtime includes some pre-configured, named transitions:

-   `slideFade` <em>default</em>
-   `slide`
-   `fade`
-   `rise`
-   `scale`

Specify a transition by passing its name as the sole parameter to `useShowtime` or as the value of `Showtime`'s `transition` prop.

`useShowtime` also accepts an object instead of a string, in which case pass `{ transition: <name> }`.

```jsx
// Hook (string)
const [ref, isMounted, show, hide] = useShowtime("scale");

// Hook (object)
const [ref, isMounted, show, hide] = useShowtime({ transition: "scale" });

// Component
<Showtime show={show} transition="scale">…
```

### Transition timing

By default, React Showtime uses a `transition-duration` of `250ms` and `transition-function` of `ease`, with no `transition-delay`.

You can pass other values via `useShowtime`'s object parameter or `Showtime`'s props. Use `duration`, `delay`, and `easing` to control both show and hide transitions. Or use `showDuration`, `showDelay`, `showEasing`, `hideDuration`, `hideDelay`, `hideEasing` for more fine-grained control over show and hide.

```jsx

  // Hook
const [ref, isMounted, show, hide] = useShowtime({
    duration: 500,
    delay: 100,
    easing: "ease-out",
});

// Component
<Showtime
    show={show}
    duration={500}
    delay={150}
    easing="ease-out"
>
    …
};
```

### Custom transitions

Defining a custom transition essentially boils down to describing the item's _hidden_ state with a CSS object literal.

#### Define symmetric transitions with `transition`

The `transition` property accepts an object that define your element or component's _hidden_ state.

Each CSS property can be a string, number, or object. Strings and numbers will be passed through as CSS.

If an object is passed in as a CSS property value, it should contain `{ value, duration, delay, easing }` properties. `value` is required and will be passed through as CSS. The other properties are optional and will be applied to that property's transition, overriding any inherited duration, delay, and easing values.

Do not include a `transition` property on the `transition` object, even though it is a valid CSS property. It will be ignored, since React Showtime assumes control of that property.

Eg…

```jsx
const HookExample = () => {
    const [ref, isMounted, show, hide] = useShowtime({
        duration: 350,
        transition: {
            right: "100vw",
            top: "-100vh",
            opacity: {
                value: 0,
                duration: 400,
                easing: "linear",
            },
        },
    });

    // …
};
```

#### Define asymmetric transitions with `showTransition` and `hideTransition`

The `showTransition` and `hideTransition` properties define how the element or component is hidden prior to being shown or after being hidden, respectively. This is useful if, say, a notification should slide down from above, but fade away when dismissed.

Like `transition` these properties accept a string (named transition) or object (custom transition). They override `transition` if that's also passed in.

Eg…

```jsx
const HookExample = () => {
    const [ref, isMounted, show, hide] = useShowtime({
        showTransition: "fade",
        hideTransition: {
            right: "100vw",
            top: "-100vh",
            opacity: 0,
        },
        hideDuration: 350,
    });

    // …
};
```

### Events

The `Showtime` component accepts handlers for `onHidden` and `onShowing`. Other lifecycle events are being considered.

The `useShowtime` hook currently does not accept any event handlers.

## API

### useShowtime hook

The `useShowtime` hook accepts a single parameter, which can be either of:

-   a string referring to a [named transition](#transitions)
-   an object with the following properties:

| Name                  | Type                         | Req'd? | Default       | Description                                                                                                                 |
| --------------------- | ---------------------------- | ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `startHidden`         | `boolean`                    | no     | `false`       | Hide the element initially                                                                                                  |
| `startWithTransition` | `boolean`                    | no     | `false`       | Transition in the initial appearance. Ignored if `startHidden` is `true`.                                                   |
| `transition`          | `string` or `CSS Properties` | no     | `"slideFade"` | [Named transition](#transitions) or object defining custom transition (see below)                                           |
| `showTransition`      | `string` or `CSS Properties` | no     | `"slideFade"` | [Named transition](#transitions) or object defining custom transition (see below)                                           |
| `hideTransition`      | `string` or `CSS Properties` | no     | `"slideFade"` | [Named transition](#transitions) or object defining custom transition (see below)                                           |
| `duration`            | `number` or `string`         | no     | `250`         | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| `delay`               | `number` or `string`         | no     | `0`           | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| `easing`              | `string`                     | no     | `"ease"`      | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |
| `showDuration`        | `number` or `string`         | no     | `250`         | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| `showDelay`           | `number` or `string`         | no     | `0`           | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| `showEasing`          | `string`                     | no     | `"ease"`      | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |
| `hideDuration`        | `number` or `string`         | no     | `250`         | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| `hideDelay`           | `number` or `string`         | no     | `0`           | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| `hideEasing`          | `string`                     | no     | `"ease"`      | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |

### Showtime component

| Name                  | Type                         | Req'd? | Default       | Description                                                                                                                 |
| --------------------- | ---------------------------- | ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `show`                | `boolean`                    | yes    |               | Toggle this to show/hide the element or component                                                                           |
| `startWithTransition` | `boolean`                    | no     | `false`       | Transition in the initial appearance. Ignored if `show` initially set to `false`.                                           |
| `transition`          | `string` or `CSS Properties` | no     | `"slideFade"` | [Named transition](#transitions) or object defining custom transition (see below)                                           |
| `showTransition`      | `string` or `CSS Properties` | no     | `"slideFade"` | [Named transition](#transitions) or object defining custom transition (see below)                                           |
| `hideTransition`      | `string` or `CSS Properties` | no     | `"slideFade"` | [Named transition](#transitions) or object defining custom transition (see below)                                           |
| `duration`            | `number` or `string`         | no     | `250`         | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| `delay`               | `number` or `string`         | no     | `0`           | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| `easing`              | `string`                     | no     | `"ease"`      | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |
| `showDuration`        | `number` or `string`         | no     | `250`         | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| `showDelay`           | `number` or `string`         | no     | `0`           | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| `showEasing`          | `string`                     | no     | `"ease"`      | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |
| `hideDuration`        | `number` or `string`         | no     | `250`         | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| `hideDelay`           | `number` or `string`         | no     | `0`           | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| `hideEasing`          | `string`                     | no     | `"ease"`      | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |
| `onHidden`            | `function`                   | no     |               | Called when hide transition complete.                                                                                       |
| `onShowing`           | `function`                   | no     |               | Called when show transition complete.                                                                                       |

### Transition objects

#### CSS Properties

| Name               | Type                                  | Req'd? | Default | Description                                                                 |
| ------------------ | ------------------------------------- | ------ | ------- | --------------------------------------------------------------------------- |
| [Any CSS property] | `string`, `number`, or `CSS Property` | yes    |         | Use camelCase for names. String and number values passed directly to style. |

#### CSS Property

| Name       | Type                 | Req'd? | Default   | Description                                                                                                                 |
| ---------- | -------------------- | ------ | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `value`    | `string` or `number` | yes    |           | Any CSS property name.                                                                                                      |
| `duration` | `number` or `string` | no     | inherited | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration). Integers are `ms`, floats `s`. |
| `delay`    | `number` or `string` | no     | inherited | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay). Integers are `ms`, floats `s`.       |
| `easing`   | `string`             | no     | inherited | [Transition timing](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)                            |

`

## Development

React Showtime was built with [create-react-hook](https://github.com/Hermanya/create-react-hook) using [this blog post](https://www.twilio.com/blog/release-custom-react-component-hook-effect-npm-package) as a guiding reference.

Be sure to reflect any API changes in the demo app in `example/` and in this readme.

To get started:

1.  `yarn start` in `src/` to watch for changes there.
2.  Then `yarn start` in `example/` to watch for changes there and run a dev server.
