import React from 'react';
import {
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { CpuGaugeMain } from './CpuGaugeMain';
import { GpuGaugeMain } from './GpuGaugeMain';
import { RamBarSecondary } from './RamBarSecondary';
import { VramBarSecondary } from './VramBarSecondary';
import { WattBarSecondary } from './WattBarSecondary';

import type { TopicMessage } from '../App'

type GaugeMaintProps = {
    messages: TopicMessage[];
}

export const Moderno = ({
    messages
}: GaugeMaintProps) => {
    return (
        <Grid
            templateAreas={`
                'main'
                'secondary'
            `}
            templateRows={'2fr 1fr'}
            h={'100%'}
        >
            <GridItem area={'main'}>
                <Grid
                    h={'100%'}
                    templateColumns={'repeat(2, 1fr)'}
                >
                    <GridItem colSpan={1}>
                        <CpuGaugeMain messages={messages} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <GpuGaugeMain messages={messages} />
                    </GridItem>
                </Grid>
            </GridItem>
            <GridItem area={'secondary'}>
                <Grid
                    h={'100%'}
                    templateColumns='repeat(3, 1fr)'
                >
                    <GridItem colSpan={1}>
                        <RamBarSecondary messages={messages} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <VramBarSecondary messages={messages} />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <WattBarSecondary messages={messages} />
                    </GridItem>
                </Grid>
            </GridItem>
        </Grid>
    );
};
