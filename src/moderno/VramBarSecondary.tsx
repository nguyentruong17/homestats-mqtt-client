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
import { useMqttContext } from 'src/contexts';
import { getMetadataForSensorId } from 'src/utils';

// export type VramBarSecondaryProps = {
//     messages: TopicMessage[];
// };

export const VramBarSecondary = () => {
    const {lastMessage} = useMqttContext();
    const ramMetadataFn = getMetadataForSensorId('sys_gpu__mem_usage');

    const getDataPointFromId = (id = 'sys_gpu__mem_usage') => lastMessage!
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
                <Heading fontSize={'sm'}>{'VRAM GDDR6-1815'}</Heading>
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
                    <Text>{'U: '}</Text>
                    <Text>{`${currentRamUsage} ${ramUnit}`}</Text>
                </Flex>
                <Flex justifyContent={'space-between'}>
                    <Text>{'F: '}</Text>
                    <Text>{`${currentRamFree} ${ramUnit}`}</Text>
                </Flex>
            </GridItem>
            <GridItem area={'pert'}>
                <Center height={'100%'} fontSize={'2xl'}>{currentRamUsagePerct}</Center>
            </GridItem>
        </Grid>
    );
};
