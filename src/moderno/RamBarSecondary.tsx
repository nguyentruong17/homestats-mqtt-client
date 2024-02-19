import React from 'react';
import {
    Center,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text
} from '@chakra-ui/react';
import {
    Bar
} from './BarSecondary';
import { getMetadataForSensorId } from 'src/utils';
import { useMqttContext } from 'src/contexts';

// import type { TopicMessage } from 'src/App';

// export type RamBarSecondaryProps = {
//     messages: TopicMessage[];
// };

export const RamBarSecondary = () => {
    const {lastMessage} = useMqttContext();
    // const [purple100, purple500, purple600] = useToken(
    //     // the key within the theme, in this case `theme.colors`
    //     'colors',
    //     // the subkey(s), resolving to `theme.colors.red.100`
    //     ['purple.100', 'purple.500', 'purple.600', 'gray.400', 'gray.500'],
    //     // a single fallback or fallback array matching the length of the previous arg
    // );


    const ramMetadataFn = getMetadataForSensorId('sys_mem__usage');

    const getDataPointFromId = (id = 'sys_mem__usage') => lastMessage!
        .payload
        .find((sensorObject) => sensorObject.Id === id)?.Value ?? 0;

    const ramMaxValue = ramMetadataFn('maxValue') as number;
    const ramUnit = ramMetadataFn('unit');
    const currentRamUsage = getDataPointFromId();
    const currentRamFree = ramMaxValue - currentRamUsage;
    const currentRamUsagePerct = Intl.NumberFormat('en-US', {
        style: 'percent',
        maximumFractionDigits: 2
    }).format(currentRamUsage / ramMaxValue);
    
    return (
        <Grid
            templateAreas={`
                'header header'
                'bar bar'
                'stats pert'
            `}
            templateColumns={'repeat(2, 1fr)'}
            templateRows={'24px 1fr 2fr'}
        >
            <GridItem area={'header'}>
                <Heading fontSize={'sm'}>{'RAM DDR4-3600'}</Heading>
            </GridItem>
            <GridItem
                area={'bar'}
            >
                <Bar
                    data={getDataPointFromId()}
                    maxValue={ramMaxValue}
                />
            </GridItem>
            <GridItem area={'stats'} px={4}>
                <Flex justifyContent={'space-between'}>
                    <Text color={'gray.600'} fontWeight={'bold'}>{'U: '}</Text>
                    <Text color={'gray.500'} fontWeight={'bold'}>{`${currentRamUsage} ${ramUnit}`}</Text>
                </Flex>
                <Flex justifyContent={'space-between'}>
                    <Text color={'gray.600'} fontWeight={'bold'}>{'F: '}</Text>
                    <Text color={'gray.500'} fontWeight={'bold'}>{`${currentRamFree} ${ramUnit}`}</Text>
                </Flex>
            </GridItem>
            <GridItem area={'pert'}>
                <Center height={'100%'} fontSize={'2xl'} color={'purple.400'}>{currentRamUsagePerct}</Center>
            </GridItem>
        </Grid>
    );
};
