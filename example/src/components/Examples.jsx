/** @jsx jsx */
import { jsx } from "theme-ui";
import { forwardRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const sx = {
    examples: {
        bg: "tint",
    },
    section: {
        height: "120rem",
        mb: 4,
        pt: 2,
    },
    name: {
        my: 4,
        fontFamily: "Pompiere, cursive",
        fontSize: 8,
        textAlign: "center",
    },
};

const INTERSECTION_THRESHOLD = [0, 0.25, 0.5, 0.75, 1];

const Section = forwardRef(({ name, id, ...props }, ref) => {
    return (
        <section id={id} ref={ref} sx={sx.section} {...props}>
            <h2 sx={sx.name}>{name}</h2>
        </section>
    );
});

function Examples({ onActiveSectionChange, ...props }) {
    const [hookRef, , hookEntry] = useInView({
        threshold: INTERSECTION_THRESHOLD,
    });

    const [componentRef, , componentEntry] = useInView({
        threshold: INTERSECTION_THRESHOLD,
    });

    const [presetsRef, , presetsEntry] = useInView({
        threshold: INTERSECTION_THRESHOLD,
    });

    useEffect(() => {
        if (
            !hookEntry?.intersectionRatio &&
            !componentEntry?.intersectionRatio &&
            !presetsEntry?.intersectionRatio
        ) {
            return;
        }

        const sections = [
            {
                name: "hook",
                ratio: hookEntry?.intersectionRatio || 0,
            },
            {
                name: "component",
                ratio: componentEntry?.intersectionRatio || 0,
            },
            {
                name: "presets",
                ratio: presetsEntry?.intersectionRatio || 0,
            },
        ];

        onActiveSectionChange(
            sections.reduce((a, b) => (a.ratio > b.ratio ? a : b)).name
        );
    }, [hookEntry, componentEntry, presetsEntry, onActiveSectionChange]);

    return (
        <article sx={sx.examples} {...props}>
            <Section id="hook" ref={hookRef} name="useShowtime() Hook" />
            <Section
                id="component"
                ref={componentRef}
                name="&lt;Showtime /&gt; component"
            />
            <Section id="presets" ref={presetsRef} name="Preset Transitions" />
        </article>
    );
}

export default Examples;
