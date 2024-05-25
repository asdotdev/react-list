import { ListProps } from "../../utilities/ListProps";

export type StickOnProps = "start" | "end" | "both";

export type FlatListProps<ItemT> = ListProps<ItemT> & {
    data: Array<ItemT>;
    stickyItemsIndices?: Array<number>;
    stickItemsAt?: StickOnProps;
};
