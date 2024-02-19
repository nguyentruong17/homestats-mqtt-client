import React from 'react';
import {
    Center,
    Grid,
    GridItem,
    Heading
} from '@chakra-ui/react';
import {
    Bar,
    Gauge
} from './GaugeMain';
import { useMqttContext } from 'src/contexts';
import { getMetadataForSensorId } from 'src/utils';

// export type CpuGaugeMainProps = {
//     messages: TopicMessage[];
// };

export const GpuGaugeMain = () => {
    const {lastMessage} = useMqttContext();

    const getDataPointFromId = (id: string) => lastMessage!
        .payload
        .find((sensorObject) => sensorObject.Id === id)?.Value ?? 0;

    return (
        <Grid
            h={'100%'}
            templateAreas={`
                'header header'
                'gauge bars'
            `}
            templateColumns={'repeat(2, minmax(0, 1fr))'}
            templateRows={'24px 1fr'}
        >
            <GridItem area={'header'}>
                <Heading fontSize={'sm'}>{'Nvidia Geforce RTX 3070'}</Heading>
            </GridItem>
            <GridItem area={'gauge'}>
                <Center h={'100%'}>
                    <Gauge
                        data={getDataPointFromId('temp_gpu__measure')}
                        style={{
                            width: '80%'
                        }}
                        unit={getMetadataForSensorId('temp_gpu__measure')('unit') as string}
                    />
                </Center>
            </GridItem>
            <GridItem area={'bars'}>
                <Grid
                    minH={0}
                    h={'100%'}
                    templateRows='repeat(3, 1fr)'
                >
                    <GridItem>
                        <Bar
                            data={getDataPointFromId('sys_gpu__mem_usage')}
                            maxValue={getMetadataForSensorId('sys_gpu__mem_usage')('maxValue') as number}
                            unit={getMetadataForSensorId('sys_gpu__mem_usage')('unit') as string}
                        />
                    </GridItem>
                    <GridItem>
                        <Bar
                            data={getDataPointFromId('sys_cpu__clock')}
                            maxValue={getMetadataForSensorId('sys_cpu__clock')('maxValue') as number}
                            unit={getMetadataForSensorId('sys_cpu__clock')('unit') as string}
                        />
                    </GridItem>
                    <GridItem>
                        <Bar
                            data={getDataPointFromId('fan_gpu__fan1')}
                            maxValue={getMetadataForSensorId('fan_gpu__fan1')('maxValue') as number}
                            unit={getMetadataForSensorId('fan_gpu__fan1')('unit') as string}
                        />
                    </GridItem>
                </Grid>
            </GridItem>
        </Grid>
    );
};
