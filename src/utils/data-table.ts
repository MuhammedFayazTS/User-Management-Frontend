import { Column } from "@tanstack/react-table";

export function getCommonPinningStyles<TData>({
  column,
}: {
  column: Column<TData>;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-5px 0 5px -5px rgba(0,0,0,0.1)"
      : isFirstRightPinnedColumn
      ? "5px 0 5px -5px rgba(0,0,0,0.1)"
      : undefined,
    position: isPinned ? "sticky" : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    background: isPinned ? "white" : undefined,
  };
}
