# @asdotdev/react-list

This library provides a scrollable interface for rendering lists in `<FatList />` for the need of section support, use `<SectionList />`, along with features like

-   Infinite Scroll
-   Header / Footer
-   Vertical / Horizontal
-   Inverted
-   Sticky

## Before you start!

I want to enhance this library and would love to hear your feedback on whether it needs improvement, has bugs, features to be added in the next version or anything else. Your input is crucial in guiding the development, so please share your ideas on the additions or changes you'd like to see. Read the [Contributing Guide](#contributing-guide)

## Installation

```
npm i @asdotdev/react-list

yarn add @asdotdev/react-list

pnpm add @asdotdev/react-list

bun add @asdotdev/react-list
```

## Props

_Note: Asterisk (\*) in props column represent required field._
| Prop | type | | Description | Default |
| ----------------- | --------------------------------------- | ------------------------ | ---------------------------------------------------- | ------- |
| | **_FlatList_** | **_SectionList_** | | |
| data \* | `Array<ItemT>` | `Array<SectionT<ItemT>>` | List of data to render | undefined |
| renderItem \* | `(info: ItemProps<ItemT>) => ReactNode` | | Node to renders each item into the list | undefined |
| keyExtractor | `(info: ItemProps<ItemT>) => string` | | Unique ID to pass each item | index |
| horizontal | `boolean` || Renders the list horizontally | false |
| inverted | `boolean` || Inverted render of the entire list | false |
| hideScrollabar | `boolean` || Whether to show the list scrollbar or not | false |
| width | `CCSSProperties["width"]` || Width of the list | undefined |
| height | `CCSSProperties["height"]` || Height of the list | undefined |
| background | `CCSSProperties["background"]` || Background of the list| undefined |
| gapBetweenItems | `CCSSProperties["gap"]` || Space between the items on the list | undefined |
| intialScrollIndex | `number` || Scroll to the item (section in SectionList) at the index | undefined |
| onEndReached | `function` || Function to execute on reaching the end of the list | undefined |
| onEndReachedIgnored | `boolean` || Ignore observing whether the end of the list is reached or not | false |
| onEndReachedThreshold | `number` || Run onEndReached before reaching the end of the list (0 - 1) | 0 |
| noOfItems | `number` || Number of items in each row (column when horizontal) | 1 |
| loading | `boolean` || Prevent calling onEndReached until the last call is completed and show the end loader component | false |
| ListLoadingComponent | `ReactElement \| ReactNode` || Component to appear at the end of the list while loading is true | undefined |
| ListHeaderComponent | `ReactElement \| ReactNode` || Component to appear at the start of the list | undefined |
| ListFooterComponent | `ReactElement \| ReactNode` || Component to appear at the end of the list | undefined |
| ListEmptyComponent | `ReactElement \| ReactNode` || Component to appear when data has no element | undefined |
| ListSkeletonComponent | `ReactElement \| ReactNode` || Component to appear on initial load of the list (also need loading prop) | undefined |
| stickyListHeaderEnabled | `boolean` || Stick the header at the start of the list when scrolling | false |
| stickyListFooterEnabled | `boolean` || Stick the footer at the end of the list when scrolling | false |
| stickyItemsIndices | `Array<number>` | `NA` | Stick the items on each index of the list when scrolling | undefined |
| stickItemsAt | `start \| end \| both` | `NA` | Stick the items at the start \ end \ both of the list | start |
| stickySectionTitleEnabled | `NA` | `boolean` | Stick the title of each section at the start of the list when scrolling | false |
| coustomSectionTitle | `NA` | `(info: SectionProps<ItemT>) => ReactNode` | Node to render in place of default section title component for each section title | undefined |

## Contributing Guide

Read the [CONTRIBUTING](https://github.com/asdotdev/react-list/blob/master/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements.

## License

@asdotdev/react-list is MIT licensed, as found in the [LICENSE](https://github.com/asdotdev/react-list/blob/master/LICENSE) file.
