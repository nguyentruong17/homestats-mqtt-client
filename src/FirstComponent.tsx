import {
    Box,
    Icon,
    Spinner,
    StatGroup,
} from '@chakra-ui/react'
import { SiPcgamingwiki } from 'react-icons/si'
import { StatComponent } from './StatComponent'

import type { TopicMessage } from './App'

type FirstComponentProps = {
    messages: TopicMessage[]
}

export const FirstComponent = ({
    messages
}: FirstComponentProps) => {
    const nowMessage = messages[0];
    const prevMessage = messages[1];

    if (!nowMessage || !prevMessage) {
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

    const messageProps = {
        nowMessage,
        prevMessage
    }

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDir: 'column',
                flexGrow: 1,
                gap: '10%',
            }}
        >
            <StatGroup
                sx={{
                    // display: 'flex',
                    // flexDir: 'row',
                    // flexGrow: 1,
                    // gap: '10%',
                    // w: '100%'
                }}
            >
                <StatComponent
                    id={'temp_cpu__measure'}
                    {...messageProps}
                />
                <StatComponent
                    id={'temp_gpu__measure'}
                    {...messageProps}
                />
            </StatGroup>
            <StatGroup
                sx={{
                    // display: 'flex',
                    // flexDir: 'row',
                    // flexGrow: 1,
                    // gap: '10%',
                    // w: '100%'
                }}
            >
                <StatComponent
                    id={'sys_mem__usage'}
                    {...messageProps}
                />
                <StatComponent
                    id={'sys_gpu__mem_usage'}
                    {...messageProps}
                />
            </StatGroup>
        </Box>
    )
}
