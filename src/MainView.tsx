import { useState } from 'react';
import {
    Box,
    Center,
    Grid,
    GridItem,
    Icon,
    Spinner,
} from '@chakra-ui/react';
import { SiPcgamingwiki } from 'react-icons/si';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy
} from '@dnd-kit/sortable';
import { SortableGridItem } from './SortableGridItem';
import { ITEMS } from './moderno';
import { useMqttContext } from './contexts';

import type { DragEndEvent } from '@dnd-kit/core';

export const MainView = () => {
    const {messages} = useMqttContext();
    const [gridItems, setGridItems] = useState(ITEMS);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!active.id || !over?.id) {
            console.log({
                activeId: active.id,
                overId: over?.id
            });

            return;
        }

        if (active.id !== over.id) {
            setGridItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    if (!messages.length) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDir: 'row',
                    columnGap: '1rem'
                }}
            >
                <Icon
                    as={SiPcgamingwiki}
                    boxSize={'4rem'}
                />
                <Spinner
                    color='teal.50'
                    emptyColor='teal.300'
                    size='xl'
                    speed='0.5s'
                    thickness='.5rem'
                />
            </Box>
        );
    }

    return (
        <Grid
            border='2px dashed black'
            columnGap={2}
            h='100%'
            rowGap={2}
            templateColumns='repeat(12, 1fr)'
            templateRows='repeat(6, 1fr)'
        >
            {[...Array(12 * 6).keys()].map((k) => {
                const count = k + 1;
                const rowStart = Math.floor(k / 12) + 1;
                const colStart = k % 12 + 1;

                // console.log({
                // 	count,
                // 	rowStart,
                // 	colStart
                // })
                return (
                    <GridItem
                        gridColumn={`${colStart} / ${colStart + 1}`}
                        gridRow={`${rowStart} / ${rowStart + 1}`}
                        key={`base-${count}`}
                        sx={{
                            border: '1px dotted teal'
                        }}
                        onClick={() => console.log('you clicked: ', count)}
                    // colSpan={1}
                    // rowSpan={1}
                    >
                        <Center>{`+${count}`}</Center>
                    </GridItem>
                );
            })}
            <GridItem
                bg='rgba(255, 255, 255, 0.2)'
                gridColumnStart={1}
                gridRowStart={1}
                colSpan={12}
                rowSpan={6}
                pointerEvents={'none'}
            // zIndex={1}
            >
                <Grid
                    // border='2px dashed black'
                    columnGap={2}
                    h='100%'
                    rowGap={2}
                    templateColumns='repeat(12, 1fr)'
                    templateRows='repeat(6, 1fr)'
                // pointerEvents={'auto'}
                >
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={gridItems}
                            strategy={rectSortingStrategy}
                        >
                            {gridItems.map((item) => (
                                <SortableGridItem key={item.id} {...item} sx={{ zIndex: 1 }}>
                                    {item.component}
                                </SortableGridItem>
                            ))}
                        </SortableContext>
                    </DndContext>
                </Grid>
            </GridItem>
        </Grid>
    );
};
