import {
    Box,
    Icon,
    Spinner,
} from '@chakra-ui/react'
import { SiPcgamingwiki } from 'react-icons/si'
import { GraphComponent } from './GraphComponent'

import type{ TopicMessage } from './App'

type SecondComponentProps = {
    messages: TopicMessage[]
}

export const SecondComponent = ({
    messages
}: SecondComponentProps) => {
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
        )
    }

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDir: 'row',
                flexGrow: 1,
                justifyContent: 'center',
                gap: '5%',
            }}
        >
            <GraphComponent
                id={'temp_cpu__measure'}
                messages={messages}
                style={{
                    display: 'flex',
                    height: 202,
                    width: 202
                }}
            />
            <GraphComponent
                id={'temp_gpu__measure'}
                messages={messages}
                style={{
                    display: 'flex',
                    height: 202,
                    width: 202
                }}
            />
        </Box>
    )
}
