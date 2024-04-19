import { CSSProperties, ReactNode, RefObject, useEffect, useRef } from "react";
import {
    CommonProps,
    ListWrapperProps,
    ListComponent,
    EndElement,
    getListWrapperStyle,
    getInvertedCSS,
    HIDE_SCROLLBAR
} from "../";

export function ListWrapper(
    props: ListWrapperProps &
        CommonProps & {
            children: ReactNode;
            itemsContainerRef: RefObject<HTMLDivElement>;
            isEmpty?: boolean;
        }
) {
    const {
        children,
        horizontal,
        onEndReached,
        onEndReachedIgnored,
        onEndReachedThreshold,
        hideScrollabar,
        loading,
        width,
        height,
        inverted,
        background,
        intialScrollIndex,
        ListEmptyComponent,
        ListHeaderComponent,
        ListFooterComponent,
        ListLoadingComponent,
        ListSkeletonComponent,
        stickyListHeaderEnabled,
        stickyListFooterEnabled,
        itemsContainerRef,
        isEmpty
    } = props;

    const ListWrapperCSS: CSSProperties = {
        background,
        overflow: isEmpty && loading ? "hidden" : "scroll",
        position: "relative",
        width: width || "100%",
        height: height || "100%",
        ...getInvertedCSS(inverted)
    };

    if (!width || !height) {
        console.warn(
            `Include "width" and "height" props for the self-scrollable component to work properly.`
        );
    }

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (
            intialScrollIndex &&
            containerRef.current &&
            itemsContainerRef.current?.firstElementChild
        ) {
            const targetElement = itemsContainerRef.current.firstElementChild
                .children[intialScrollIndex] as HTMLElement;

            containerRef.current.scrollTo(
                horizontal ? targetElement.offsetLeft : 0,
                horizontal ? 0 : targetElement.offsetTop
            );
        }
    }, [
        containerRef,
        itemsContainerRef,
        intialScrollIndex,
        horizontal,
        inverted
    ]);

    return (
        <div
            ref={containerRef}
            style={ListWrapperCSS}
            aria-label="list-container"
            className="scrollable"
        >
            {hideScrollabar && <style>{HIDE_SCROLLBAR}</style>}
            {isEmpty && loading && ListSkeletonComponent ? (
                ListSkeletonComponent
            ) : isEmpty && ListEmptyComponent ? (
                ListEmptyComponent
            ) : (
                <div
                    aria-label="list-content-container"
                    style={getListWrapperStyle(horizontal)}
                >
                    <ListComponent
                        name="header"
                        Component={ListHeaderComponent}
                        isSticky={stickyListHeaderEnabled}
                        horizontal={horizontal}
                        inverted={inverted}
                    />
                    {children}
                    <ListComponent
                        name="footer"
                        Component={ListFooterComponent}
                        isSticky={stickyListFooterEnabled}
                        horizontal={horizontal}
                        inverted={inverted}
                    />
                    {!onEndReachedIgnored && (
                        <EndElement
                            onEndReached={onEndReached}
                            onEndReachedThreshold={onEndReachedThreshold}
                            ListLoadingComponent={ListLoadingComponent}
                            containerRef={containerRef}
                            horizontal={horizontal}
                            inverted={inverted}
                            loading={loading}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
