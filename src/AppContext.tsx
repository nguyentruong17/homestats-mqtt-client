/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import * as mqtt from 'mqtt'

type AppContextProviderProps = { children: ReactNode }

export interface TopicMessagePayload {
    Id: string;
    Label: string;
    Value: number;
}

export interface TopicMessage {
    sent: string;
    delimitter: string;
    payload: TopicMessagePayload[];
}

const AppContext = createContext<{
    messages: TopicMessage[]
} | undefined>(undefined)

const client = mqtt.connect('ws://192.168.0.62:9001', {
    connectTimeout: 10 * 1000, // 10s
    clientId: 'React-Torrent7-JS',
});

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [messages, setMessages] = useState<TopicMessage[]>([]);

    useEffect(() => {

        client.on('connect', () => {
            client.subscribe('bedroom/torrent7', (err) => {
                if (!err) {
                    console.log('subscribed!')
                }
            })
        })

        client.on('message', (topic, message) => {
            // message is Buffer
            // console.log(message.toString())
            const parsedMsg = message.toString() 
            const jsonMsg = JSON.parse(parsedMsg) as TopicMessage

            const latestTimestamp = messages[0]?.sent ?? '0'
            const curTimestamp = jsonMsg.sent

            if (latestTimestamp === curTimestamp) return

            setMessages(cur => [
                jsonMsg,
                ...cur,
            ])
        })

        // return () => {
        //     client.unsubscribe('bedroom/torrent7', error => {
        //         if (error) {
        //             console.log('Unsubscribe error', error)
        //             return
        //         }
        //     });

        //     client.end();
        // }
    }, [])

    useEffect(() => {
        if (messages.length <= 200) return

        setMessages((cur) => cur.slice(0, 100));
    }, [messages.length]);

    // const oldestTimestamp = messages[messages.length - 1]?.sent ?? '0'

    // console.log({
    //     messages,
    //     oldestTimestamp
    // })

    const value = useMemo(() => ({
        messages
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [
        messages
    ]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider')
    }
    return context
}

export {
    AppContextProvider,
    useAppContext
}