import { useEffect, useRef } from "react";
import { FlatListProps } from "./FlatList.types";
import { ListWrapper, ListItems, getStickOnInset } from "../../utilities";

export default function FlatList<ItemT>(props: FlatListProps<ItemT>) {
    const itemsContainerRef = useRef<HTMLDivElement>(null);

    const {
        data,
        keyExtractor,
        renderItem,
        noOfItems,
        horizontal,
        inverted,
        loading,
        gapBetweenItems,
        onEndReached,
        onEndReachedIgnored,
        onEndReachedThreshold,
        hideScrollabar,
        width,
        height,
        background,
        intialScrollIndex,
        ListEmptyComponent,
        ListHeaderComponent,
        ListFooterComponent,
        ListLoadingComponent,
        ListSkeletonComponent,
        stickyListHeaderEnabled,
        stickyListFooterEnabled,
        stickyItemsIndices,
        stickItemsAt
    } = props;

    const listItemsProps = {
        data,
        renderItem,
        keyExtractor,
        noOfItems,
        horizontal,
        inverted,
        gapBetweenItems
    };

    const listWrapperProps = {
        horizontal,
        inverted,
        loading,
        gapBetweenItems,
        onEndReached,
        onEndReachedIgnored,
        onEndReachedThreshold,
        hideScrollabar,
        width,
        height,
        background,
        intialScrollIndex,
        ListEmptyComponent,
        ListHeaderComponent,
        ListFooterComponent,
        ListLoadingComponent,
        ListSkeletonComponent,
        isEmpty: !data.length,
        stickyListHeaderEnabled,
        stickyListFooterEnabled,
        itemsContainerRef
    };

    useEffect(() => {
        if (stickyItemsIndices) {
            const targetElements: Array<{
                indice: number;
                element: HTMLElement;
            }> = [];

            stickyItemsIndices.forEach((indice) => {
                if (itemsContainerRef.current?.firstElementChild) {
                    targetElements.push({
                        indice,
                        element: itemsContainerRef.current.firstElementChild
                            .children[indice] as HTMLElement
                    });
                }
            });

            const stickyInset = getStickOnInset(
                stickItemsAt || "start",
                horizontal,
                inverted
            );

            targetElements.forEach(({ indice, element }) => {
                element.style.position = "sticky";
                element.style.left = stickyInset.left;
                element.style.top = stickyInset.top;
                element.style.right = stickyInset.right;
                element.style.bottom = stickyInset.bottom;
                element.style.zIndex = `${indice}`;
            });
        }
    }, [
        itemsContainerRef,
        stickyItemsIndices,
        stickItemsAt,
        horizontal,
        inverted
    ]);

    return (
        <ListWrapper {...listWrapperProps}>
            <div aria-label="list-items-container" ref={itemsContainerRef}>
                <ListItems {...listItemsProps} />
            </div>
        </ListWrapper>
    );
}
