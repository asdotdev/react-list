import { useRef } from "react";
import { SectionListProps } from "./SectionList.types";
import {
    ListWrapper,
    ListItems,
    SectionTitle,
    defauldKeyExtractor,
    getListWrapperStyle
} from "../../utilities";

export default function SectionList<ItemT>(props: SectionListProps<ItemT>) {
    const itemsContainerRef = useRef<HTMLDivElement>(null);

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
        intialScrollIndex,
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
        intialScrollIndex,
        ListEmptyComponent,
        ListHeaderComponent,
        ListFooterComponent,
        ListLoadingComponent,
        ListSkeletonComponent,
        isEmpty: !sections.length,
        stickyListHeaderEnabled,
        stickyListFooterEnabled,
        itemsContainerRef
    };

    const listWrapperStyle = getListWrapperStyle(horizontal);

    return (
        <ListWrapper {...listWrapperProps}>
            <div
                aria-label="list-items-container"
                ref={itemsContainerRef}
                style={listWrapperStyle}
            >
                {sections.map((section, index) => (
                    <div
                        key={defauldKeyExtractor(section, index, "section")}
                        aria-label="list-section"
                        style={listWrapperStyle}
                        className="sections"
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
                    </div>
                ))}
            </div>
        </ListWrapper>
    );
}
