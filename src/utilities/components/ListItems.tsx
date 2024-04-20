import { CSSProperties, RefObject } from "react";
import {
    CommonProps,
    ListItemsProps,
    defauldKeyExtractor,
    getInvertedStyle,
    getSizeStyle,
    NO_OF_ITEMS,
    ItemProps
} from "../";

export function ListItems<ItemT>(
    props: {
        data: Array<ItemT>;
        uListRef?: RefObject<HTMLUListElement>;
        stickyItemStyle?: (info: ItemProps<ItemT>) => CSSProperties;
    } & ListItemsProps<ItemT> &
        CommonProps
) {
    const {
        data,
        uListRef,
        stickyItemStyle,
        renderItem,
        keyExtractor,
        noOfItems,
        horizontal,
        inverted,
        gapBetweenItems
    } = props;

    return (
        <ul
            ref={uListRef}
            style={{
                display: "grid",
                gridAutoFlow: horizontal ? "column" : "row",
                ...(horizontal
                    ? {
                          gridTemplateRows: `repeat(${
                              noOfItems || NO_OF_ITEMS
                          }, minmax(0, 1fr))`,
                          gridAutoColumns: "max-content"
                      }
                    : {
                          gridTemplateColumns: `repeat(${
                              noOfItems || NO_OF_ITEMS
                          }, minmax(0, 1fr))`,
                          gridAutoRows: "max-content"
                      }),
                listStyleType: "none",
                gap: gapBetweenItems,
                ...getSizeStyle(horizontal)
            }}
        >
            {data.map((item: ItemT, index: number) => (
                <li
                    key={
                        keyExtractor
                            ? keyExtractor({ item, index })
                            : defauldKeyExtractor(item as object, index, "item")
                    }
                    style={{
                        ...getSizeStyle(horizontal),
                        ...getInvertedStyle(inverted),
                        ...(stickyItemStyle && stickyItemStyle({ item, index }))
                    }}
                >
                    {renderItem({ item, index })}
                </li>
            ))}
        </ul>
    );
}
