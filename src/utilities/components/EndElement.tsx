import { ReactElement, ReactNode, RefObject, useEffect, useRef } from "react";
import {
    getThresholdMargin,
    getInvertedStyle,
    END_ELEMENT_SIZE,
    END_ELEMENT_BUFFER,
    LIST_SIZE
} from "../";

type EndReachedProps = {
    onEndReached?: () => void;
    onEndReachedThreshold?: number;
    ListLoadingComponent?: ReactElement | ReactNode;
    containerRef: RefObject<HTMLDivElement>;
    hasBoundry?: boolean;
    horizontal?: boolean;
    inverted?: boolean;
    loading?: boolean;
};

export function EndElement(props: EndReachedProps) {
    const targetRef = useRef<HTMLDivElement>(null);

    const {
        containerRef,
        onEndReached,
        ListLoadingComponent,
        onEndReachedThreshold,
        hasBoundry,
        horizontal,
        inverted,
        loading
    } = props;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0] &&
                    entries[0].isIntersecting &&
                    !loading &&
                    onEndReached
                ) {
                    onEndReached();
                }
            },
            {
                root: hasBoundry ? containerRef.current : null,
                rootMargin: getThresholdMargin(
                    (targetRef.current
                        ? horizontal
                            ? targetRef.current.clientWidth
                            : targetRef.current.clientHeight
                        : END_ELEMENT_SIZE) + END_ELEMENT_BUFFER,
                    containerRef,
                    onEndReachedThreshold,
                    hasBoundry,
                    horizontal
                )
            }
        );

        if (observer && targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            observer && observer.disconnect();
        };
    }, [
        targetRef,
        containerRef,
        onEndReached,
        onEndReachedThreshold,
        hasBoundry,
        horizontal,
        inverted,
        loading
    ]);

    return (
        <div
            style={{
                pointerEvents: "none",
                ...getInvertedStyle(inverted)
            }}
            ref={targetRef}
            aria-hidden
        >
            {loading && ListLoadingComponent ? (
                ListLoadingComponent
            ) : (
                <div
                    style={{
                        width: horizontal ? END_ELEMENT_SIZE : LIST_SIZE,
                        height: horizontal ? LIST_SIZE : END_ELEMENT_SIZE
                    }}
                />
            )}
        </div>
    );
}
