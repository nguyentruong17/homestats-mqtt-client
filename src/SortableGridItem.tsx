import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { GridItem, type GridItemProps } from '@chakra-ui/react';

export type SortableGridItemType = {
    color: string;
    colSpan?: number;
    id: string | number;
    rowSpan?: number;
    sx?: GridItemProps['sx'];
}

export const SortableGridItem: React.FC<SortableGridItemType> = ({
    color,
    colSpan = 1,
    id,
    rowSpan = 1,
    sx = {}
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <GridItem
            bg={color}
            colSpan={colSpan}
            onClick={(e) => console.log('you clicked sortable item: ', e)}
            ref={setNodeRef}
            rowSpan={rowSpan}
            pointerEvents={'auto'}
            sx={{
                ...sx
            }}
            style={style}
            {...attributes}
            {...listeners}
        >
            {id}
        </GridItem>
    );
};
