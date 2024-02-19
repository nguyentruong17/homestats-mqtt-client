import {
	useEffect,
	useState
} from 'react';
import * as mqtt from 'mqtt';
import {
	Grid,
	GridItem
} from '@chakra-ui/react';
import { Header } from './components';
import { MainView } from './MainView';

export type TopicMessagePayload = {
	Id: string;
	Label: string;
	Value: number;
};

export type TopicMessage = {
	delimitter: string;
	payload: TopicMessagePayload[];
	sent: string;
};

export type Subscription = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	qos: any;
	topic: string;
};

const subscription = {
	topic: 'bedroom/torrent7',
	qos: 0
};

export const App = () => {
	const [client, setClient] = useState<mqtt.MqttClient | undefined>();
	const [connectStatus, setConnectStatus] = useState('Connect');
	// const [isSubed, setIsSub] = useState(false)
	const [messages, setMessages] = useState<TopicMessage[]>([]);

	// disconnect
	// https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
	const mqttDisconnect = () => {
		if (!client) return;
		try {
			client.end(false, () => {
				setConnectStatus('Connect');
				console.log('Disconnected successfully');
			});
		} catch (error) {
			console.log('Disconnect error:', error);
		}
	};

	// https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
	const mqttUnSub = (subscription: Subscription) => {
		if (!client) return;

		const { topic, qos } = subscription;
		client.unsubscribe(topic, { qos }, (error) => {
			if (error) {
				console.log('Unsubscribe error', error);
				return;
			}
			console.log(`Unsubscribed topic: ${topic}`);
		});
	}

	const mqttSub = (mqttClient: mqtt.MqttClient, subscription: Subscription) => {
		if (!mqttClient) return;

		// topic & QoS for MQTT subscribing
		const { topic, qos } = subscription;
		// subscribe topic
		// https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
		mqttClient.subscribe(topic, { qos }, (error) => {
			if (error) {
				console.log('Subscribe to topics error', error);
				return;
			}
			console.log(`Subscribed to topics: ${topic}`);
			// setIsSub(true)
		});
	}

	const handleStart = async () => {
		try {
			const cli = await mqtt.connectAsync('ws://192.168.0.62:9001', {
				connectTimeout: 10 * 1000, // 10s
				clientId: 'React-Torrent7-JS',
			});

			setClient(cli);

			mqttSub(cli, subscription);
		} catch (e) {
			console.error('connect to broker error: ', e);
		}
	}

	const handleEnd = () => {
		mqttUnSub(subscription);
		mqttDisconnect();

		setMessages([]);
	};

	useEffect(() => {
		if (!client) return;

		// https://github.com/mqttjs/MQTT.js#event-connect
		client.on('connect', () => {
			setConnectStatus('Connected')
			console.log('Connected to broker')
		})

		// https://github.com/mqttjs/MQTT.js#event-error
		client.on('error', (err) => {
			console.error('Connection error to broker: ', err)
			client.end()
		})

		// https://github.com/mqttjs/MQTT.js#event-reconnect
		client.on('reconnect', () => {
			console.error('Connection reconnecting to broker...')
			setConnectStatus('Reconnecting')
		})

		// https://github.com/mqttjs/MQTT.js#event-message
		client.on('message', (topic, message) => {
			// const payload = { topic, message: message.toString() }
			// setPayload(payload)

			const str = message.toString()
			const json = JSON.parse(str) as TopicMessage

			console.log(`Received message at: ${json.sent} from topic: ${topic}`)

			setMessages((cur) => [
				json,
				...cur
			])
		})
	}, [client]);

	useEffect(() => {
		if (messages.length <= 200) return;

		setMessages((cur) => cur.slice(0, 100));
	}, [messages.length]);

	return (
		<Grid
			templateAreas={`
				'header header'
                'main main'
			`}
			gridTemplateRows={'36px 1fr'}
			gridTemplateColumns={'1fr 1fr'}
			h='100vh'
			w='100vw'
			gap='1'
		>
			<GridItem
				area={'header'}
			>
				<Header
					onEndBtnClick={handleEnd}
					messages={messages}
					onStartBtnClick={handleStart}
				/>
			</GridItem>
			<GridItem
				area={'main'}
				sx={{
					height: '100%'
				}}
			>
				<MainView messages={messages} />
			</GridItem>
		</Grid>
	);
};
