import { ReactNode } from "react";
import { ListProps } from "../../utilities/ListProps";

export type SectionT<ItemT> = {
    [key: string]: object | string | number | boolean;
    data: Array<ItemT>;
    title: string;
};

export type SectionProps<ItemT> = SectionT<ItemT> & {
    index: number;
};

export interface SectionListProps<ItemT> extends ListProps<ItemT> {
    data: Array<SectionT<ItemT>>;
    coustomSectionTitle?: (info: SectionProps<ItemT>) => ReactNode;
    stickySectionTitleEnabled?: boolean;
}
