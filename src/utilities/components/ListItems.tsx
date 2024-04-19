import React from "react";
import {
    CommonProps,
    ListItemsProps,
    defauldKeyExtractor,
    getInvertedCSS,
    getSizeCSS,
    NO_OF_ITEMS
} from "../";

export function ListItems<ItemT>(
    props: {
        data: Array<ItemT>;
    } & ListItemsProps<ItemT> &
        CommonProps
) {
    const {
        data,
        renderItem,
        keyExtractor,
        noOfItems,
        horizontal,
        inverted,
        gapBetweenItems
    } = props;

    return (
        <ul
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
                ...getSizeCSS(horizontal)
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
                        ...getSizeCSS(horizontal),
                        ...getInvertedCSS(inverted)
                    }}
                >
                    {renderItem({ item, index })}
                </li>
            ))}
        </ul>
    );
}
