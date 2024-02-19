import {
    Box,
    Icon,
    Spinner,
} from '@chakra-ui/react'
import { SiPcgamingwiki } from 'react-icons/si'
import { Moderno } from './moderno';

import type { TopicMessage } from './App'

type SecondComponentProps = {
    messages: TopicMessage[]
}

export const MainView = ({
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
        );
    }

    return (
        <Moderno
            messages={messages}
        />
    );
};
