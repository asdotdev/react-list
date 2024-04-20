import { ReactElement, ReactNode } from "react";
import { getInvertedStyle } from "../utils";

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
                width: "100%",
                height: "100%",
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
