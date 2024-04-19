import { CSSProperties, RefObject } from "react";
import { StickOnProps } from "../components/FlatList/FlatList.types";

export function defauldKeyExtractor(
    item: object | string | number | boolean,
    index: number,
    keyword: string
): string {
    if (
        typeof item === "object" &&
        "key" in item &&
        typeof item.key == "string"
    ) {
        return item.key;
    }
    if (
        typeof item === "object" &&
        "id" in item &&
        typeof item.id == "string"
    ) {
        return item.id;
    }
    return `${keyword}-${index}`;
}

export type StickyInset = {
    left: string;
    top: string;
    right: string;
    bottom: string;
};

export function getThresholdMargin(
    buffer: number,
    containerRef: RefObject<HTMLDivElement>,
    onEndReachedThreshold?: number,
    hasBoundry?: boolean,
    horizontal?: boolean
): string {
    if (
        containerRef.current &&
        onEndReachedThreshold &&
        onEndReachedThreshold >= 0 &&
        onEndReachedThreshold <= 1
    ) {
        const rootWidth: number = hasBoundry
            ? containerRef.current.clientWidth
            : window.innerWidth;
        const rootHeight: number = hasBoundry
            ? containerRef.current.clientHeight
            : window.innerHeight;

        const scrollWidth: number = containerRef.current.scrollWidth;
        const scrollHeight: number = containerRef.current.scrollHeight;

        const xMargin: number = Math.min(
            rootWidth * onEndReachedThreshold,
            scrollWidth - rootWidth
        );
        const yMargin: number = Math.min(
            rootHeight * onEndReachedThreshold,
            scrollHeight - rootHeight
        );

        return `${horizontal ? 0 : yMargin - buffer}px ${
            horizontal ? xMargin - buffer : 0
        }px`;
    } else {
        return "0px 0px";
    }
}

export function getStickOnInset(
    stickOn: StickOnProps,
    horizontal?: boolean,
    inverted?: boolean
): StickyInset {
    const inset: StickyInset = {
        left: "unset",
        top: "unset",
        right: "unset",
        bottom: "unset"
    };

    if (horizontal) {
        if (stickOn === "both") {
            inset.left = "0px";
            inset.right = "0px";
        } else {
            if (inverted) {
                if (stickOn === "end") {
                    inset.left = "0px";
                } else {
                    inset.right = "0px";
                }
            } else {
                if (stickOn === "end") {
                    inset.right = "0px";
                } else {
                    inset.left = "0px";
                }
            }
        }
    } else {
        if (stickOn === "both") {
            inset.top = "0px";
            inset.bottom = "0px";
        } else {
            if (inverted) {
                if (stickOn === "end") {
                    inset.top = "0px";
                } else {
                    inset.bottom = "0px";
                }
            } else {
                if (stickOn === "end") {
                    inset.bottom = "0px";
                } else {
                    inset.top = "0px";
                }
            }
        }
    }

    return inset;
}

export function getInvertedCSS(inverted?: boolean): CSSProperties {
    return inverted ? { transform: "scale(-1)" } : {};
}

export function getSizeCSS(horizontal?: boolean): CSSProperties {
    return horizontal
        ? {
              height: "100%"
          }
        : {
              width: "100%"
          };
}

export function getListWrapperStyle(horizontal?: boolean): CSSProperties {
    return {
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        ...getSizeCSS(horizontal)
    };
}
