import { ReactElement, ReactNode } from "react";
import { getInvertedStyle } from "../utils";
import { LIST_SIZE } from "../constants";

export default function ListEmpty(props: {
    ListSkeletonComponent?: ReactElement | ReactNode;
    ListEmptyComponent?: ReactElement | ReactNode;
    inverted?: boolean;
    loading?: boolean;
}) {
    const { ListSkeletonComponent, ListEmptyComponent, inverted, loading } =
        props;

    return (
        <div
            aria-label="list-empty-container"
            style={{
                width: LIST_SIZE,
                height: LIST_SIZE,
                ...getInvertedStyle(inverted)
            }}
        >
            {loading
                ? ListSkeletonComponent
                    ? ListSkeletonComponent
                    : null
                : ListEmptyComponent
                  ? ListEmptyComponent
                  : null}
        </div>
    );
}
