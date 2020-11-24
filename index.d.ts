import { FunctionComponent, MutableRefObject } from "react";

import * as CSS from "csstype";

export = Showtime;
export as namespace Showtime;

declare namespace Showtime {
    export type PredefinedTransition = "slideFade" | "slide" | "fade" | "rise" | "scale"

    export interface TransitionProperties {
        value: string;
        duration?: CSS.Property.TransitionDuration;
        delay?: CSS.Property.TransitionDelay;
        easing?: CSS.Property.TransitionTimingFunction;
    }

    export type Transition =
        PredefinedTransition |
        { [key: string]: string | number | TransitionProperties };

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

    export interface ShowtimeProps extends ShowtimeSettings {
        show: boolean;
        onHidden?: () => void;
        onShowing?: () => void;
    }

    export function useShowtime<T>(settings: PredefinedTransition | ShowtimeSettings):
        [MutableRefObject<T>, boolean, () => void, () => void];

    export type ShowtimeComponent = FunctionComponent<ShowtimeProps>;
}
