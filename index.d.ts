import { MutableRefObject, ReactElement, Ref } from "react";

import * as CSS from "csstype";

export as namespace Showtime;

export type PredefinedTransition = "slideFade" | "slide" | "fade" | "rise" | "scale"

export interface TransitionProperty {
    value: string;
    duration?: CSS.Property.TransitionDuration;
    delay?: CSS.Property.TransitionDelay;
    easing?: CSS.Property.TransitionTimingFunction;
}

export type Transition =
    PredefinedTransition |
    { [key: string]: string | number | TransitionProperty };

export interface ShowtimeSettings {
    startHidden?: boolean;
    startWithTransition?: boolean;
    transition?: Transition;
    showTransition?: Transition;
    hideTransition?: Transition;
    duration?: CSS.Property.TransitionDuration;
    delay?: CSS.Property.TransitionDelay;
    easing?: CSS.Property.TransitionTimingFunction;
    showDuration?: CSS.Property.TransitionDuration;
    showDelay?: CSS.Property.TransitionDelay;
    showEasing?: CSS.Property.TransitionTimingFunction;
    hideDuration?: CSS.Property.TransitionDuration;
    hideDelay?: CSS.Property.TransitionDelay;
    hideEasing?: CSS.Property.TransitionTimingFunction;
}

export interface ShowtimeProps<T> extends ShowtimeSettings {
    children: JSX.Element | ((ref: Ref<T>) => JSX.Element);
    show: boolean;
    onHidden?: () => void;
    onShowing?: () => void;
}

export function useShowtime<T>(settings?: PredefinedTransition | ShowtimeSettings):
    [MutableRefObject<T>, boolean, () => void, () => void];

export function Showtime<T>(props: ShowtimeProps<T>): ReactElement<ShowtimeProps<T>>;
