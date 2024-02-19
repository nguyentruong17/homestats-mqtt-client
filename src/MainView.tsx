import {
    Box,
    Icon,
    Spinner,
} from '@chakra-ui/react'
import { SiPcgamingwiki } from 'react-icons/si'
import { Moderno } from './moderno';
import { useMqttContext } from './contexts';

// type SecondComponentProps = {
//     messages: TopicMessage[]
// }

export const MainView = () => {
    const {messages} = useMqttContext();

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
        <Moderno/>
    );
};
