import React from 'react';
import {
	Box,
	Center,
	Grid,
	GridItem
} from '@chakra-ui/react';
import { useMqttContext } from './contexts';
import { Header } from './components';
// import { MainView } from './MainView';
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
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableGridItem } from './SortableGridItem';

import type { DragEndEvent } from '@dnd-kit/core';

const ITEMS = [
	{
		id: 1,
		text: 'Write a cool JS library',
		color: '#FC8181'
	},
	{
		id: 2,
		text: 'Make it generic enough',
		color: '#F6AD55',
		colSpan: 2
	},
	{
		id: 3,
		text: 'Write README',
		color: '#F6E05E',
		rowSpan: 2
	},
	{
		id: 4,
		text: 'Create some examples',
		color: '#68D391',
		colSpan: 3,
		rowSpan: 3
	},
	{
		id: 5,
		text: 'Spam in Twitter and IRC to promote it',
		color: '#4FD1C5',
		colSpan: 5
	},
	{
		id: 6,
		text: '???',
		color: '#63b3ed',
		rowSpan: 4
	},
	{
		id: 7,
		text: 'PROFIT',
		color: '#76E4F7',
		colSpan: 2,
		rowSpan: 3
	},
	{
		id: 8,
		text: '',
		color: '#B794F4'
	},
]

export const App = () => {
	const {
		handleEnd,
		handleStart
	} = useMqttContext();

	const [gridItems, setGridItems] = React.useState(ITEMS);

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
	}

	return (
		<Grid
			templateAreas={`
				'header'
                'main'
			`}
			templateRows={'36px 1fr'}
			h='100vh'
			w='100vw'
			gap={1}
			p={2}
			pt={0}
		>
			<GridItem
				area={'header'}
			>
				<Header
					onEndBtnClick={handleEnd}
					onStartBtnClick={handleStart}
				/>
			</GridItem>
			<GridItem
				area={'main'}
			>
				{/* <ControlledStack
					items={items}
					addItem={() => setItems([...items, { id: `item-${items.length + 1}`, color: 'red.300' }])}
				/> */}
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
									strategy={verticalListSortingStrategy}
								>
									{gridItems.map((item) => <SortableGridItem key={item.id} {...item} sx={{ zIndex: 1 }} />)}
								</SortableContext>
							</DndContext>
						</Grid>
					</GridItem>
				</Grid>
			</GridItem>
		</Grid>
	);
};
