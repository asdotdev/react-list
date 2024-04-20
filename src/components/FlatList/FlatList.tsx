import { CSSProperties, useRef } from "react";
import { FlatListProps } from "./FlatList.types";
import {
    ListWrapper,
    ListItems,
    getStickOnInset,
    ItemProps
} from "../../utilities";

export default function FlatList<ItemT>(props: FlatListProps<ItemT>) {
    const uListRef = useRef<HTMLUListElement>(null);

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

    function stickyItemStyle({ index }: ItemProps<ItemT>): CSSProperties {
        return stickyItemsIndices?.includes(index)
            ? {
                  position: "sticky",
                  ...getStickOnInset(
                      stickItemsAt || "start",
                      horizontal,
                      inverted
                  ),
                  zIndex: index
              }
            : {};
    }

    const listItemsProps = {
        data,
        uListRef,
        renderItem,
        keyExtractor,
        stickyItemStyle,
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
        uListRef
    };

    return (
        <ListWrapper {...listWrapperProps}>
            <ListItems {...listItemsProps} />
        </ListWrapper>
    );
}
