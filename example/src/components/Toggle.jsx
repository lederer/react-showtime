/** @jsxImportSource theme-ui */

import HookIcon from "../img/hook.svg?react";
import ComponentIcon from "../img/component.svg?react";
import ToggleIcon from "../img/toggle.svg?react";

const sx = {
    container: {
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "9.2rem",
        "@media (max-width: 900px)": {
            bg: "white",
        },
    },
    labelButton: {
        appearance: "none",
        flex: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        bg: "transparent",
        px: 0,
        fontFamily: "Pompiere, cursive",
        fontSize: "3.2rem",
        textTransform: "uppercase",
        color: "text",
        cursor: "pointer",
        "@media (max-width: 500px)": {
            fontSize: "2.4rem",
        },
    },
    labelIcon: {
        flex: "none",
        mx: 1,
        opacity: 0.8,
        width: "1em",
        height: "1em",
    },
    toggleButton: {
        appearance: "none",
        flex: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        mx: 1,
        px: 0,
        border: "none",
        color: "ticket",
        bg: "transparent",
        fontSize: "inherit",
        cursor: "pointer",
    },
    toggleIcon: {
        width: "4rem",
        height: "4rem",
    },
};

function Toggle({ isHookMode, setIsHookMode, ...props }) {
    return (
        <div sx={sx.container} {...props}>
            <button sx={sx.labelButton} onClick={() => setIsHookMode(true)}>
                Hook
                <HookIcon sx={sx.labelIcon} alt="" />
            </button>
            <button
                sx={sx.toggleButton}
                onClick={() => setIsHookMode((current) => !current)}
                title={`Switch to ${
                    isHookMode ? "component" : "hook"
                } examples`}
            >
                <ToggleIcon
                    sx={{
                        ...sx.toggleIcon,
                        transform: isHookMode ? "rotate(180deg)" : null,
                    }}
                />
            </button>
            <button sx={sx.labelButton} onClick={() => setIsHookMode(false)}>
                <ComponentIcon sx={sx.labelIcon} alt="" />
                Component
            </button>
        </div>
    );
}

export default Toggle;
