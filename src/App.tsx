import React from 'react';
import {
	Grid,
	GridItem
} from '@chakra-ui/react';
import { useMqttContext } from './contexts';
import { Header } from './components';
import { MainView } from './MainView';

export const App = () => {
	const {
		handleEnd,
		handleStart
	} = useMqttContext();

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
				<MainView/>
			</GridItem>
		</Grid>
	);
};
