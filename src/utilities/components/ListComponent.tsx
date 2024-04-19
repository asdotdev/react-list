import { ReactElement, ReactNode } from "react";
import { getInvertedCSS, getStickOnInset, HIGHER_Z_INDEX } from "../";

export function ListComponent(props: {
    Component?: ReactElement | ReactNode;
    horizontal?: boolean;
    inverted?: boolean;
    isSticky?: boolean;
    name?: "header" | "footer";
}) {
    const { Component, horizontal, inverted, isSticky, name } = props;

    return Component ? (
        <div
            aria-label={`"list-${name}"`}
            style={{
                ...getInvertedCSS(inverted),
                ...(isSticky && {
                    position: "sticky",
                    zIndex: HIGHER_Z_INDEX,
                    ...getStickOnInset(
                        name === "header"
                            ? "start"
                            : name === "footer"
                              ? "end"
                              : "both",
                        horizontal,
                        inverted
                    )
                })
            }}
        >
            {Component}
        </div>
    ) : null;
}
