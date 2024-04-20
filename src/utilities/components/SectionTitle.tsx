import { ReactNode } from "react";
import { getStickOnInset, getInvertedStyle, HIGHER_Z_INDEX } from "../";

export function SectionTitle(props: {
    title: string;
    inverted?: boolean;
    horizontal?: boolean;
    CoustomSectionTitle?: ReactNode;
    stickySectionTitleEnabled?: boolean;
}) {
    const {
        title,
        inverted,
        horizontal,
        CoustomSectionTitle,
        stickySectionTitleEnabled
    } = props;

    function LineSpan() {
        return (
            <span
                aria-hidden
                style={{
                    height: 1,
                    flex: 1,
                    background: "white"
                }}
            />
        );
    }

    return (
        <div
            aria-label="list-section-title"
            style={{
                ...getInvertedStyle(inverted),
                ...(stickySectionTitleEnabled && {
                    position: "sticky",
                    ...getStickOnInset("both", horizontal, inverted),
                    zIndex: HIGHER_Z_INDEX
                })
            }}
        >
            {CoustomSectionTitle ? (
                CoustomSectionTitle
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "8px 12px",
                        gap: 12
                    }}
                >
                    <LineSpan />
                    {title}
                    <LineSpan />
                </div>
            )}
        </div>
    );
}
