import { CSSProperties, ReactNode, RefObject, useRef } from "react";
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
    const isInitialLoad = useRef<boolean>(true);
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
        initialScrollIndex,
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

    function onInitialLoad() {
        if (isInitialLoad.current) {
            if (
                !loading &&
                !isEmpty &&
                initialScrollIndex &&
                uListRef?.current?.children &&
                uListRef.current.children[initialScrollIndex]
            ) {
                const targetElement = uListRef.current.children[
                    initialScrollIndex
                ] as HTMLLIElement;

                containerRef.current &&
                    containerRef.current.scrollTo(
                        horizontal ? targetElement.offsetLeft : 0,
                        horizontal ? 0 : targetElement.offsetTop
                    );
            } else {
                console.warn(
                    `Provided prop "initialScrollIndex" is out of bound on initial load.`
                );
            }
            isInitialLoad.current = false;
        }
    }

    return (
        <div
            ref={containerRef}
            style={ListContainerStyle}
            aria-label="list-container"
            className="scrollable"
            onLoad={onInitialLoad}
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
