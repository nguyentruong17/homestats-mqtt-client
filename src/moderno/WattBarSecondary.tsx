import React from 'react';
import {
    Center,
    Grid,
    GridItem,
    Heading,
} from '@chakra-ui/react';
import {
    Bar
} from './BarSecondary';
import { useMqttContext } from 'src/contexts';
import { getMetadataForSensorId } from 'src/utils';

// export type WattBarSecondaryProps = {
//     messages: TopicMessage[];
// };

export const WattBarSecondary = () => {
    const {lastMessage} = useMqttContext();
    const wattCpuMetadataFn = getMetadataForSensorId('wattage_cpu__measure');
    const wattGpuMetadataFn = getMetadataForSensorId('wattage_gpu__measure');

    const getDataPointFromId = (id: string) => lastMessage!
        .payload
        .find((sensorObject) => sensorObject.Id === id)?.Value ?? 0;

    const wattCpuMaxValue = wattCpuMetadataFn('maxValue') as number;
    const wattGpuMaxValue = wattGpuMetadataFn('maxValue') as number;

    const currentWattCpu = getDataPointFromId('wattage_cpu__measure');
    const currentWattGpu = getDataPointFromId('wattage_gpu__measure');

    const pertOpts = {
        style: 'percent',
        maximumFractionDigits: 2
    };

    const currentWattCpuPerct = Intl.NumberFormat('en-US', pertOpts).format(currentWattCpu / wattCpuMaxValue);
    const currentWattGpuPerct = Intl.NumberFormat('en-US', pertOpts).format(currentWattGpu / wattGpuMaxValue);

    return (
        <Grid
            templateAreas={`
                'header'
                'bars'
            `}
            templateRows={'24px 1fr'}
        >
            <GridItem area={'header'}>
                <Heading fontSize={'sm'}>{'WATT 80PG-750W'}</Heading>
            </GridItem>
            <GridItem area={'bars'}>
                <Grid
                    templateAreas={`
                        'cpu c-bar c-pert'
                        'gpu g-bar g-pert'
                    `}
                    templateColumns={'1fr 2fr 1fr'}
                    templateRows={'1fr 1fr'}
                >
                    
                    <GridItem area={'cpu'}>
                        <Center height={'100%'} color={'gray.500'} fontWeight={'bold'}>{'CPU'}</Center>
                    </GridItem>
                    <GridItem area={'c-bar'}>
                        <Bar
                            data={currentWattCpu}
                            maxValue={wattCpuMaxValue}
                        />
                    </GridItem>
                    <GridItem area={'c-pert'}>
                        <Center height={'100%'} fontSize={'xl'} color={'gray.400'} fontWeight={'bold'}>{currentWattCpuPerct}</Center>
                    </GridItem>

                    <GridItem area={'gpu'}>
                        <Center height={'100%'} color={'gray.500'} fontWeight={'bold'}>{'GPU'}</Center>
                    </GridItem>
                    <GridItem area={'g-bar'}>
                        <Bar
                            data={currentWattGpu}
                            maxValue={wattGpuMaxValue}
                        />
                    </GridItem>
                    <GridItem area={'g-pert'}>
                        <Center height={'100%'} fontSize={'xl'} color={'gray.400'} fontWeight={'bold'}>{currentWattGpuPerct}</Center>
                    </GridItem>
                </Grid>
            </GridItem>
        </Grid>
    );
};
