import { ListProps } from "../../utilities/ListProps";

export type StickOnProps = "start" | "end" | "both";

export interface FlatListProps<ItemT> extends ListProps<ItemT> {
    data: Array<ItemT>;
    stickyItemsIndices?: Array<number>;
    stickItemsAt?: StickOnProps;
}
