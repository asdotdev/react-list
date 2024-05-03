import { CSSProperties, ReactElement, ReactNode } from "react";

export type ItemProps<ItemT> = {
    item: ItemT;
    index: number;
};

export type ListItemsProps<ItemT> = {
    renderItem: (info: ItemProps<ItemT>) => ReactNode;
    keyExtractor?: (info: ItemProps<ItemT>) => string;
    gapBetweenItems?: CSSProperties["gap"];
    noOfItems?: number;
};

export type ListWrapperProps = {
    loading?: boolean;
    hideScrollabar?: boolean;
    onEndReached?: () => void;
    onEndReachedIgnored?: boolean;
    onEndReachedThreshold?: number;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    background?: CSSProperties["background"];
    ListSkeletonComponent?: ReactElement | ReactNode;
    ListLoadingComponent?: ReactElement | ReactNode;
    ListHeaderComponent?: ReactElement | ReactNode;
    ListFooterComponent?: ReactElement | ReactNode;
    ListEmptyComponent?: ReactElement | ReactNode;
    stickyListHeaderEnabled?: boolean;
    stickyListFooterEnabled?: boolean;
    initialScrollIndex?: number;
};

export type CommonProps = {
    inverted?: boolean;
    horizontal?: boolean;
};

export type ListProps<ItemT> = ListItemsProps<ItemT> &
    ListWrapperProps &
    CommonProps;
