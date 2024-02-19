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

export const GpuGaugeMain = ({
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
                <Heading fontSize={'sm'}>{'Nvidia Geforce RTX 3070'}</Heading>
            </GridItem>
            <GridItem
                area={'gauge'}
            >
                <Gauge
                    data={getDataPointFromId('temp_gpu__measure')}
                    style={{
                        height: `${0.7 * 100}%`,
                        paddingTop: `${(1-0.7) / 2 * 100}%`
                    }}
                    unit={getMetadataForSensorId('temp_gpu__measure')('unit') as string}
                />
            </GridItem>
            <GridItem
                area={'bars'}
            >
                <VStack
                    align='stretch'
                    spacing={4}
                >
                    <Bar
                        data={getDataPointFromId('sys_gpu__mem_usage')}
                        maxValue={getMetadataForSensorId('sys_gpu__mem_usage')('maxValue') as number}
                        unit={getMetadataForSensorId('sys_gpu__mem_usage')('unit') as string}
                    />
                    <Bar
                        data={getDataPointFromId('voltage_gpu__measure')}
                        maxValue={getMetadataForSensorId('voltage_gpu__measure')('maxValue') as number}
                        unit={getMetadataForSensorId('voltage_gpu__measure')('unit') as string}
                    />
                    <Bar
                        data={getDataPointFromId('fan_gpu__fan1')}
                        maxValue={getMetadataForSensorId('fan_gpu__fan1')('maxValue') as number}
                        unit={getMetadataForSensorId('fan_gpu__fan1')('unit') as string}
                    />
                </VStack>
            </GridItem>
        </Grid>
    );
};
