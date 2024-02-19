import React from 'react';
import {
    Grid,
    GridItem,
    Heading,
    VStack
} from '@chakra-ui/react';
import {
    Bar,
    Gauge
} from './GaugeMain';
import { getMetadataForSensorId } from 'src/utils';

import type { TopicMessage } from 'src/App';

export type CpuGaugeMainProps = {
    messages: TopicMessage[];
};

export const CpuGaugeMain = ({
    messages
}: CpuGaugeMainProps) => {
    const getDataPointFromId = (id: string) => messages[0]
        .payload
        .find((sensorObject) => sensorObject.Id === id)?.Value ?? 0;

    return (
        <Grid
            templateAreas={`
                'header header'
                'gauge bars'
            `}
            gridTemplateRows={'24px 1fr'}
            gridTemplateColumns={'repeat(2, minmax(0, 1fr))'}
        >
            <GridItem area={'header'}>
                <Heading fontSize={'sm'}>{'AMD Ryzen 7 5700X'}</Heading>
            </GridItem>
            <GridItem area={'gauge'}>
                <Gauge
                    data={getDataPointFromId('temp_cpu__measure')}
                    style={{
                        height: `${0.7 * 100}%`,
                        paddingTop: `${(1-0.7) / 2 * 100}%`
                    }}
                    unit={getMetadataForSensorId('temp_cpu__measure')('unit') as string}
                />
            </GridItem>
            <GridItem area={'bars'}>
                <VStack
                    align='stretch'
                    spacing={4}
                >
                    <Bar
                        data={getDataPointFromId('sys_cpu__utilization')}
                        maxValue={getMetadataForSensorId('sys_cpu__utilization')('maxValue') as number}
                        unit={getMetadataForSensorId('sys_cpu__utilization')('unit') as string}
                    />
                    <Bar
                        data={getDataPointFromId('sys_cpu__clock')}
                        maxValue={getMetadataForSensorId('sys_cpu__clock')('maxValue') as number}
                        unit={getMetadataForSensorId('sys_cpu__clock')('unit') as string}
                    />
                    <Bar
                        data={getDataPointFromId('fan_cpu__measure')}
                        maxValue={getMetadataForSensorId('fan_cpu__measure')('maxValue') as number}
                        unit={getMetadataForSensorId('fan_cpu__measure')('unit') as string}
                    />
                </VStack>
            </GridItem>
        </Grid>
    );
};
