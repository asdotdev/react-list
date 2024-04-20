import { CSSProperties, ReactNode, RefObject, useEffect, useRef } from "react";
import {
    CommonProps,
    ListWrapperProps,
    ListComponent,
    EndElement,
    getListContentContainerStyle,
    getInvertedStyle,
    HIDE_SCROLLBAR
} from "../";
import ListEmpty from "./ListEmpty";

export function ListWrapper(
    props: ListWrapperProps &
        CommonProps & {
            children: ReactNode;
            uListRef?: RefObject<HTMLUListElement>;
            isEmpty?: boolean;
        }
) {
    const containerRef = useRef<HTMLDivElement>(null);

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
        uListRef,
        isEmpty
    } = props;

    const ListContainerStyle: CSSProperties = {
        background,
        overflow: isEmpty && loading ? "hidden" : "scroll",
        position: "relative",
        width: width || "100%",
        height: height || "100%",
        ...getInvertedStyle(inverted)
    };

    if (!width || !height) {
        console.warn(
            `Include "width" and "height" props for the self-scrollable component to work properly.`
        );
    }

    useEffect(() => {
        if (
            !isEmpty &&
            intialScrollIndex &&
            containerRef.current &&
            uListRef?.current?.children &&
            uListRef.current.children[intialScrollIndex]
        ) {
            const targetElement = uListRef.current.children[
                intialScrollIndex
            ] as HTMLLIElement;

            console.warn(
                horizontal ? targetElement.offsetLeft : 0,
                horizontal ? 0 : targetElement.offsetTop
            );
            containerRef.current.scrollTo(
                horizontal ? targetElement.offsetLeft : 0,
                horizontal ? 0 : targetElement.offsetTop
            );
        }
    }, [containerRef, uListRef, intialScrollIndex, horizontal, isEmpty]);

    return (
        <div
            ref={containerRef}
            style={ListContainerStyle}
            aria-label="list-container"
            className="scrollable"
        >
            {hideScrollabar && <style>{HIDE_SCROLLBAR}</style>}
            {isEmpty ? (
                <ListEmpty
                    ListSkeletonComponent={ListSkeletonComponent}
                    ListEmptyComponent={ListEmptyComponent}
                    inverted={inverted}
                    loading={loading}
                />
            ) : (
                <div
                    aria-label="list-content-container"
                    style={getListContentContainerStyle(horizontal)}
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
