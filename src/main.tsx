import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { theme } from './theme';
import { MqttContextProvider } from './contexts';
import { App } from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<DndProvider options={HTML5toTouch}>
				<MqttContextProvider>
					<App />
				</MqttContextProvider>
			</DndProvider>
		</ChakraProvider>
	</React.StrictMode>
);
