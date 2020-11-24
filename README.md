# React Showtime 🎟️&nbsp;🥁&nbsp;🎭

### Mount & unmount with CSS transitions

React Showtime makes it easy to apply CSS transitions to the appearance and disappearance of React elements. It automatically handles mounting and unmounting to allow time for transitions to occur.

👯&emsp;Choose between `useShowtime` hook and `<Showtime />` component.<br/>
💃&emsp;Feels familiar: `useShowtime` is a near-drop-in replacement for conditional rendering with a state boolean.<br/>
💅&emsp;Specify _showing_ styles however you like – inline, emotion, styled-components, classnames, you name it.<br/>
💨&emsp;Sensible API for defining _hidden_ styles and custom transitions.<br/>
🎩&emsp;Included transitions: `slideFade`, `slide`, `fade`, `rise`, `scale`.<br/>
🎭&emsp;Symmetric or asymmetric show/hide transitions.<br/>
🕴&emsp;Zero dependencies. 5.7k gzipped.

The essential insight of React Showtime is that the one-two sequence of React's `useLayoutEffect` and `useEffect` hooks is nicely suited to the one-two sequence of mounting a component with _hidden_ CSS values and then applying _showing_ CSS values to trigger the transition. As for hiding, transition event handlers trigger unmounting once the "hide" transition is complete.

### What React Showtime is not

React Showtime is **not for transitions that do not involve mounting/unmounting**. It was created specifically as a shim for conditional rendering.

React Showtime is **not for sophisticated animations**, as it executes via CSS `transition`, not `animation`. Consider a more full-featured library like react-spring if you need keyframes or additional sophistication.

## Getting Started

### Installation

```sh
yarn add react-showtime
```

```sh
npm install react-showtime
```

### tl;dr

1. Choose between the `useShowtime` hook or the `Showtime` component. The component is better for list items or if you need to listen for events (`onShowing`, `onHidden`).
1. Define your `transition` by describing the item's _hidden_ styles with a CSS object literal. Or just pass the name of an included transition (`slideFade`, `slide`, `fade`, `rise`, `scale`).
1. Attach the supplied `ref` to your containing element. If using the hook, conditionally render your item with the supplied `isMounted` boolean.
1. Call the hook's `show()` and `hide()` functions – or toggle the component's `show` prop – as needed.

Adjust transition timing via `duration`, `delay`, `easing`.

You can also define asymmetric show/hide transitions (`showTransition`, `hideTransition`) and timing (`showDuration`, `showDelay`, `showEasing`, `hideDuration`, `hideDelay`, `hideEasing`).

## Usage

### Hook vs Component

As a rule of thumb, since <a href="https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level">you can't call hooks inside loops</a>, use the hook when dealing with a singleton item that needs to conditionally appear or disappear (eg, a notification), and use the component when you've an indeterminate set of children that need to individually transition in and out of the DOM (eg, a list of messages).

#### useShowtime hook

The hook is designed to integrate with React's conditional rendering idiom. It returns an array/object containing a `ref` that must be attached to your element or component, an `isMounted` boolean that will conditionally render it, and `show()` and `hide()` functions for you to call as needed.

```jsx
import React from "react";
import { useShowtime } from "react-showtime";

const HookExample = () => {
    const [ref, isMounted, show, hide] = useShowtime();

    // Or use object destructuring...
    // const {ref, isMounted, show, hide} = useShowtime();

    const toggle = () => (isMounted ? hide() : show());

    return (
        <div>
            <button onClick={toggle}>Toggle</button>
            {isMounted && <div ref={ref}>Hi there</div>}
        </div>
    );
};
```

Your element or component will start off _showing_ by default. Pass `{ startHidden: true }` to override that.

Pass `{ startWithTransition: true }` to automatically execute the `show` transition when the item initially mounts. It will be ignored if `startHidden` is `true`.

#### Showtime component

`Showtime` is a <a href="https://reactjs.org/docs/render-props.html">render prop component</a>. Its only child must be a function that accepts a `ref` parameter. Pass `ref` to your element or component.

Toggle the `show` boolean prop to trigger show/hide.

```jsx
import React, { useState } from "react";
import { Showtime } from "react-showtime";

const ComponentExample = () => {
    const [show, setShow] = useState(true);

    const toggle = () => setShow((current) => !current);

    return (
        <div>
            <button onClick={toggle}>Toggle</button>
            <Showtime show={show}>
                {(ref) => <div ref={ref}>Oh hi</div>}
            </Showtime>
        </div>
    );
};
```

Pass `startWithTransition={true}` to automatically execute the `show` transition when the item initially mounts. It will be ignored if `show` is initially set to `false`.

### Transitions

If you accept all defaults, you'll get a `slideFade` transition with a `250ms` duration, `16ms` delay, and `"ease"` easing:

```jsx
// Hook
const [ref, isMounted, show, hide] = useShowtime();
```

```jsx
// Component
<Showtime show={true}>...</Showtime>
```

#### Included transitions

React Showtime includes a set of pre-configured transitions: `slideFade`, `slide`, `fade`, `rise`, `scale`.

Choose one by passing its name as the hook's sole parameter or to the component's `transition` prop.

```jsx
// Hook
const [ref, isMounted, show, hide] = useShowtime("slide");
```

```jsx
// Component
<Showtime transition="fade" show={true}>
    ...
</Showtime>
```

The hook also accepts an object instead of a string, in which case pass `{ transition: ... }`:

```jsx
const [ref, isMounted, show, hide] = useShowtime({ transition: "slide" });
```

#### Timing

Adjust the transition's timing via `duration`, `delay`, and `easing`.

`duration` and `delay` accept integers (interpreted as `milliseconds`), floats (interpreted as `seconds`), or strings (eg, `"1s"` or `"300ms"`.)

`easing` accepts any valid <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function">CSS `transition-timing-function`</a> value.

```jsx
// Hook
const [ref, isMounted, show, hide] = useShowtime({
    transition: "rise",
    duration: 1000,
    delay: 250,
    easing: "linear",
});
```

```jsx
// Component
<Showtime
    show={true}
    transition="scale"
    duration={500}
    delay={50}
    easing="ease-out"
>
```

If you need different timings across show and hide transitions, use `showDuration`, `showDelay`, `showEasing`, and `hideDuration`, `hideDelay`, `hideEasing`.

#### Custom transitions

To define a custom transition, pass a CSS object literal describing the item's _hidden_ state to the `transition` prop(erty).

Each value can be a string, number, or object. Strings and numbers will be passed through as CSS.

As an example, here's how you might define a _revolve_ transition, where showing would mount the item then fade it in while spinning it around the y-axis. Hiding would do the reverse.

```jsx
// Hook
const [ref, isMounted, show, hide] = useShowtime({
    transition: {
        transform: "rotate3d(0, 1, 0, 180deg)",
        opacity: 0,
    },
    ...
});
```

```jsx
// Component
<Showtime
    transition={{
        transform: "rotate3d(0, 1, 0, 180deg)",
        opacity: 0,
    }}
    ...
>
```

##### Per-property timing

You can pass an object instead of a string or number as a CSS property's value. It should contain `{ value, duration, delay, easing }` properties.

`value` is required and will be passed through as the CSS property's value.

The other properties are optional and will be applied to that property's transition timing, overriding any inherited timing values.

In this example, the `right` and `top` CSS properties will have a `350ms` transition duration and the default `"ease"` easing, while `opacity` will take `400ms` using `"linear"` easing.

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

    // ...
};
```

#### Asymmetric transitions with `showTransition` and `hideTransition`

The `showTransition` and `hideTransition` properties allow you to use different transitions for showing and hiding. This is useful if, say, a notification should slide down from above, but fade away when dismissed.

Like `transition`, these properties accept a string (included transition) or object (custom transition). They override `transition` if that's also passed in.

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

    // ...
};
```

### Attaching the ref

React Showtime provides a `ref` that must end up attached to the element you're showing/hiding. It uses the ref to directly assign CSS transition properties and _hidden_ styles to the element, and to listen for transition events.

If you are transitioning an _element_ directly, you can just pass the provided `ref` as a prop.

If you are transitioning a _custom component_, consider updating the component to use [ref forwarding](https://reactjs.org/docs/forwarding-refs.html) to pass the ref down to the component's outermost element.

If you are transitioning a _component you cannot edit_ and that does not forward refs to its outermost element, attach the `ref` to a wrapper div.

#### Attaching multiple refs

There may be times when you need to attach your own ref to the element or component, along with React Showtime's ref. You can do this using a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs).

```jsx
import React, { useRef } from "react";
import { useShowtime } from "react-showtime";

const MultipleRefsExample = () => {
    const myRef = useRef();
    const [showtimeRef, isMounted, show, hide] = useShowtime();

    const setRefs = (node) => {
        myRef.current = node;
        showtimeRef.current = node;
    };

    const toggle = () => (isMounted ? hide() : show());

    return (
        <>
            <button onClick={toggle}>Toggle</button>
            {isMounted && <div ref={setRefs}>Hi there</div>}
        </>
    );
};
```

### Events

The `Showtime` component accepts handlers for `onHidden` and `onShowing`. Other lifecycle events are being considered.

The `useShowtime` hook currently does not accept any event handlers.

## API

All timing-related numbers are interpreted as `milliseconds` if integer, and `seconds` if float.

### useShowtime hook

The `useShowtime` hook accepts a single parameter, which can be either of:

-   a string referring to an [included transition](#included-transitions)
-   an object with the following properties:

| Name                  | Type                         | Req'd | Default       | Description                                                                                               |
| --------------------- | ---------------------------- | ----- | ------------- | --------------------------------------------------------------------------------------------------------- |
| `startHidden`         | `boolean`                    | no    | `false`       | Hide the element initially                                                                                |
| `startWithTransition` | `boolean`                    | no    | `false`       | Execute `show` transition on initial mount. Ignored if `startHidden` is `true`.                           |
| `transition`          | `string` or `CSS Properties` | no    | `"slideFade"` | [Included transition](#included-transitions) or object defining custom transition (see below)             |
| `showTransition`      | `string` or `CSS Properties` | no    | `"slideFade"` | [Included transition](#included-transitions) or object defining custom transition (see below)             |
| `hideTransition`      | `string` or `CSS Properties` | no    | `"slideFade"` | [Included transition](#included-transitions) or object defining custom transition (see below)             |
| `duration`            | `number` or `string`         | no    | `250`         | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)               |
| `delay`               | `number` or `string`         | no    | `16`          | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)                     |
| `easing`              | `string`                     | no    | `"ease"`      | [Transition timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) |
| `showDuration`        | `number` or `string`         | no    |               | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)               |
| `showDelay`           | `number` or `string`         | no    |               | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)                     |
| `showEasing`          | `string`                     | no    |               | [Transition timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) |
| `hideDuration`        | `number` or `string`         | no    |               | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)               |
| `hideDelay`           | `number` or `string`         | no    |               | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)                     |
| `hideEasing`          | `string`                     | no    |               | [Transition timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) |

### Showtime component

| Name                  | Type                         | Req'd | Default       | Description                                                                                               |
| --------------------- | ---------------------------- | ----- | ------------- | --------------------------------------------------------------------------------------------------------- |
| `show`                | `boolean`                    | yes   |               | Toggle this to show/hide the element or component                                                         |
| `startWithTransition` | `boolean`                    | no    | `false`       | Execute `show` transition on initial mount. Ignored if `show` initially set to `false`.                   |
| `transition`          | `string` or `CSS Properties` | no    | `"slideFade"` | [Included transition](#included-transitions) or object defining custom transition (see below)             |
| `showTransition`      | `string` or `CSS Properties` | no    | `"slideFade"` | [Included transition](#included-transitions) or object defining custom transition (see below)             |
| `hideTransition`      | `string` or `CSS Properties` | no    | `"slideFade"` | [Included transition](#included-transitions) or object defining custom transition (see below)             |
| `duration`            | `number` or `string`         | no    | `250`         | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)               |
| `delay`               | `number` or `string`         | no    | `16`          | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)                     |
| `easing`              | `string`                     | no    | `"ease"`      | [Transition timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) |
| `showDuration`        | `number` or `string`         | no    |               | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)               |
| `showDelay`           | `number` or `string`         | no    |               | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)                     |
| `showEasing`          | `string`                     | no    |               | [Transition timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) |
| `hideDuration`        | `number` or `string`         | no    |               | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)               |
| `hideDelay`           | `number` or `string`         | no    |               | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)                     |
| `hideEasing`          | `string`                     | no    |               | [Transition timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) |
| `onHidden`            | `function`                   | no    |               | Called when hide transition complete.                                                                     |
| `onShowing`           | `function`                   | no    |               | Called when show transition complete.                                                                     |

### Transition objects

#### CSS Properties

| Name                    | Type                                  | Req'd | Default | Description                                                                 |
| ----------------------- | ------------------------------------- | ----- | ------- | --------------------------------------------------------------------------- |
| [Any CSS property name] | `string`, `number`, or `CSS Property` | yes   |         | Use camelCase for names. String and number values passed directly to style. |

#### CSS Property

| Name       | Type                 | Req'd | Default   | Description                                                                                               |
| ---------- | -------------------- | ----- | --------- | --------------------------------------------------------------------------------------------------------- |
| `value`    | `string` or `number` | yes   |           | Any CSS property name.                                                                                    |
| `duration` | `number` or `string` | no    | inherited | [Transition duration](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)               |
| `delay`    | `number` or `string` | no    | inherited | [Transition delay](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)                     |
| `easing`   | `string`             | no    | inherited | [Transition timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) |

## Development

React Showtime was built with [create-react-hook](https://github.com/Hermanya/create-react-hook) using [this blog post](https://www.twilio.com/blog/release-custom-react-component-hook-effect-npm-package) as a guiding reference.

Be sure to reflect any API changes in test fixtures, the demo app in `example/`, and this readme.

To get started:

1.  `yarn link` here to set up a local link for the `react-showtime` package.
2.  `yarn link react-showtime` in `example` to install the locally linked `react-showtime` package.
3.  `yarn start` here to watch for local changes to `react-showtime`,
4.  `yarn start` in `example/` to watch for changes to the demo site and run a dev server.
