import { renderHook } from "@testing-library/react";
import useSettings from "../useSettings";
import fixtures from "./fixtures/useSettings";

test.each(fixtures)("%s", (_, input, expected) => {
    const {
        result: {
            current: {
                startHidden,
                startWithTransition,
                showTransition,
                hideTransition,
            },
        },
    } = renderHook(() => useSettings(input));

    // booleans
    expect(startHidden).toBe(expected.startHidden);
    expect(startWithTransition).toBe(expected.startWithTransition);

    // showTransition
    expect(showTransition.styles).toStrictEqual(expected.showTransition.styles);
    expect(showTransition.instantStyles).toStrictEqual(
        expected.showTransition.instantStyles
    );
    expect(
        showTransition.cssTransitionProperty.split(/,\s(?![^()]*\))/).sort()
    ).toStrictEqual(expected.showTransition.cssTransitionProperty.sort());

    // hideTransition
    expect(hideTransition.styles).toStrictEqual(expected.hideTransition.styles);
    expect(hideTransition.instantStyles).toStrictEqual(
        expected.hideTransition.instantStyles
    );
    expect(
        hideTransition.cssTransitionProperty.split(/,\s(?![^()]*\))/).sort()
    ).toStrictEqual(expected.hideTransition.cssTransitionProperty.sort());
});
