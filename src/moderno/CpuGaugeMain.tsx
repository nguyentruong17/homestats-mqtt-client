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

// };

export const CpuGaugeMain = () => {
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
                <Heading fontSize={'sm'}>{'AMD Ryzen 7 5700X'}</Heading>
            </GridItem>
            <GridItem area={'gauge'}>
                <Center h={'100%'}>
                    <Gauge
                        data={getDataPointFromId('temp_cpu__measure')}
                        style={{
                            width: '80%'
                        }}
                        unit={getMetadataForSensorId('temp_cpu__measure')('unit') as string}
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
                            data={getDataPointFromId('sys_cpu__utilization')}
                            maxValue={getMetadataForSensorId('sys_cpu__utilization')('maxValue') as number}
                            unit={getMetadataForSensorId('sys_cpu__utilization')('unit') as string}
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
                            data={getDataPointFromId('fan_cpu__measure')}
                            maxValue={getMetadataForSensorId('fan_cpu__measure')('maxValue') as number}
                            unit={getMetadataForSensorId('fan_cpu__measure')('unit') as string}
                        />
                    </GridItem>
                </Grid>
            </GridItem>
        </Grid>
    );
};
