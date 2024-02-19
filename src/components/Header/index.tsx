import {useEffect, useState} from 'react';
import {
    Button,
    Flex,
    Icon,
    Stack,
    Text
} from '@chakra-ui/react';
import { MdOutlineAddChart } from 'react-icons/md';
import { ToggleColorModeBtn } from './ToggleColorModeBtn';
import { getCurrentTime } from 'src/utils';

export type HeaderProps = {
    onEndBtnClick: () => void;
    onStartBtnClick: () => void;
};

export const Header = ({
    onEndBtnClick,
    onStartBtnClick
}: HeaderProps) => {
    const [time, setTime] = useState(getCurrentTime());

    useEffect(() => {
        const interval = setInterval(() => {
            const curTime = getCurrentTime();

            setTime(curTime);
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Flex
            alignItems={'center'}
            flexDir={'row'}
            justifyContent={'space-between'}
            h='100%'
            p='.25rem'
        >
            <Flex>
                {/* <Tag size='lg' colorScheme='red' borderRadius='full'>
                    <TagLabel>{time}</TagLabel>
                </Tag> */}
                <Text fontSize='xs'>{time}</Text>
            </Flex>
            <Flex>
                <Stack direction='row' spacing={4} align='center' justify={'center'}>
                    <Button
                        onClick={() => {}}
                        size='sm'
                    >
                        <Icon as={MdOutlineAddChart} />
                    </Button>
                    <ToggleColorModeBtn />
                    <Button
                        // colorScheme='teal'
                        onClick={onStartBtnClick}
                        size='sm'
                        variant='outline'
                    >
                        {'Start'}
                    </Button>
                    <Button
                        // colorScheme='red'
                        onClick={onEndBtnClick}
                        size='sm'
                        variant='ghost'
                    >
                        {'End'}
                    </Button>
                </Stack>
            </Flex>
        </Flex>
    );
};
