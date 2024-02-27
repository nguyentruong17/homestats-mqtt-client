import React from 'react';
import { useMultiDrag, useMultiDrop } from 'react-dnd-multi-backend';
import { GridItem } from '@chakra-ui/react';

import type { GridItemProps } from '@chakra-ui/react';

type DndGridItemProps = {
    color: string;
    colSpan?: number;
    findGridItem: (id: string | number) => { index: number };
    id: string | number;
    moveGridItem: (id: string | number, to: number) => void;
    rowSpan?: number;
    sx?: GridItemProps['sx'];
}

type DragContent = {
    id: string | number;
    originalIndex: number;
}

export const DndGridItem: React.FC<DndGridItemProps> = ({
    color,
    colSpan = 1,
    findGridItem,
    id,
    moveGridItem,
    rowSpan = 1,
    sx = {}
}) => {
    const originalIndex = findGridItem(id).index;

    const [
        [dragProps, dragRef],
        {
            html5: [html5Props, html5Drag],
            touch: [touchProps, touchDrag]
        }
    ] = useMultiDrag<DragContent, void, { isDragging: boolean }>({
        type: 'dndgriditem',
        item: { id, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        end: (item, monitor) => {
            const { id: droppedId, originalIndex } = item
            const didDrop = monitor.didDrop()
            if (!didDrop) {
                moveGridItem(droppedId, originalIndex)
            }
        },
    });

    const [
        [dropProps, dropRef],
        {
            html5: [html5DropStyle, html5Drop],
            touch: [touchDropStyle, touchDrop]
        }
    ] = useMultiDrop<DragContent, void, unknown>({
        accept: 'dndgriditem',
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                const { index: overIndex } = findGridItem(id)
                moveGridItem(draggedId, overIndex)
            }
        },
    });

    const opacity = dragProps.isDragging ? 0.3 : 1;

    return (
        <GridItem
            bg={color}
            colSpan={colSpan}
            ref={(node) => dragRef(dropRef(node))}
            rowSpan={rowSpan}
            sx={{
                ...sx,
                opacity
            }}
        >
            {id}
        </GridItem>
    );
};
