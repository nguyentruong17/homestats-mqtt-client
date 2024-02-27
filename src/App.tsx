import React from 'react';
import {
	Box,
	Grid,
	GridItem
} from '@chakra-ui/react';
import { GridStack as GridStackInstance } from 'gridstack';
import { useMqttContext } from './contexts';
import { Header } from './components';
// import { MainView } from './MainView';
import { GridBoard } from './GridBoard';
import { DndGridItem } from './DndGridItem';

import 'gridstack/dist/gridstack.css';

import type { GridStack } from 'gridstack';

type ItemType = { id: string | number, color?: string; };

const Item = ({ id, color }: ItemType) => <Box bg={color} h='100%'>{id}</Box>

const ControlledStack = ({ items, addItem }: { items: ItemType[], addItem: React.MouseEventHandler<HTMLButtonElement> }) => {
	const refs = React.useRef<{ [key: string | number]: React.RefObject<HTMLDivElement> }>({});
	const gridRef = React.useRef<GridStack | undefined>(undefined);

	if (Object.keys(refs.current).length !== items.length) {
		items.forEach(({ id }) => {
			refs.current[id] = refs.current[id] || React.createRef();
		})
	}

	React.useEffect(() => {
		gridRef.current =
			gridRef.current ||
			GridStackInstance.init(
				{
					float: true,
				},
				'.controlled'
			)
		const grid = gridRef.current;
		grid.batchUpdate();
		grid.removeAll(false);
		items.forEach(({ id }) => grid.makeWidget(refs.current[id].current!));
		grid.commit();
	}, [items]);

	return (
		<div>
			<button onClick={addItem}>Add new widget</button>
			<div className={`grid-stack controlled`}>
				{items.map((item) => {
					return (
						<div ref={refs.current[item.id]} key={item.id} className={'grid-stack-item'}>
							<div className='grid-stack-item-content'>
								<Item {...item} />
							</div>
						</div>
					)
				})}
			</div>
		</div>
	);
};

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

	const [items, setItems] = React.useState<ItemType[]>([
		{ id: 'item-1', color: 'green.400' },
		{ id: 'item-2', color: 'blue.400' }
	]);

	const [gridItems, setGridItems] = React.useState(ITEMS);

	const findGridItem = React.useCallback(
		(id: string | number) => {
			const item = gridItems.filter((item) => item.id === id)[0]
			return {
				item,
				index: gridItems.indexOf(item),
			}
		},
		[gridItems],
	)

	const moveGridItem = React.useCallback(
		(id: string | number, atIndex: number) => {
			const { item, index } = findGridItem(id);
			console.log({index, atIndex, item})

			setGridItems((items) => {
				const results = items.slice();
				const firstItem = items[index];
				results[index] = items[atIndex];
				results[atIndex] = firstItem;

				return results;
			})
		},
		[findGridItem, setGridItems],
	)

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
					border='1px dashed black'
					columnGap={2}
					h='100%'
					rowGap={2}
					templateColumns='repeat(12, 1fr)'
					templateRows='repeat(6, 1fr)'
				>
					{gridItems.map((item) => (
						<DndGridItem
							key={item.id}
							moveGridItem={moveGridItem}
							findGridItem={findGridItem}
							{...item}
						/>
					))}
				</Grid>
			</GridItem>
		</Grid>
	);
};
