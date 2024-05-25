import { useRef } from "react";
import { SectionListProps } from "./SectionList.types";
import {
    ListItems,
    ListWrapper,
    SectionTitle,
    defauldKeyExtractor,
    getListContentContainerStyle
} from "../../utilities";

export default function SectionList<ItemT>(props: SectionListProps<ItemT>) {
    const uListRef = useRef<HTMLUListElement>(null);

    const {
        data: sections,
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
        initialScrollIndex,
        ListEmptyComponent,
        ListHeaderComponent,
        ListFooterComponent,
        ListLoadingComponent,
        ListSkeletonComponent,
        stickyListHeaderEnabled,
        stickyListFooterEnabled,
        coustomSectionTitle,
        stickySectionTitleEnabled
    } = props;

    const listItemsProps = {
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
        initialScrollIndex,
        ListEmptyComponent,
        ListHeaderComponent,
        ListFooterComponent,
        ListLoadingComponent,
        ListSkeletonComponent,
        isEmpty: !sections.length,
        stickyListHeaderEnabled,
        stickyListFooterEnabled,
        uListRef
    };

    const listWrapperStyle = getListContentContainerStyle(horizontal);

    return (
        <ListWrapper {...listWrapperProps}>
            <ul
                ref={uListRef}
                style={{ ...listWrapperStyle, listStyleType: "none" }}
            >
                {sections.map((section, index) => (
                    <li
                        key={defauldKeyExtractor(section, index, "section")}
                        style={listWrapperStyle}
                    >
                        <SectionTitle
                            title={section.title}
                            inverted={inverted}
                            horizontal={horizontal}
                            CoustomSectionTitle={
                                coustomSectionTitle &&
                                coustomSectionTitle({ ...section, index })
                            }
                            stickySectionTitleEnabled={
                                stickySectionTitleEnabled
                            }
                        />
                        <ListItems data={section.data} {...listItemsProps} />
                    </li>
                ))}
            </ul>
        </ListWrapper>
    );
}
