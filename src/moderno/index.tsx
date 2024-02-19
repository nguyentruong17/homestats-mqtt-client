import React from 'react';
import {
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { CpuGaugeMain } from './CpuGaugeMain';
import { GpuGaugeMain } from './GpuGaugeMain';

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
                'cpu gpu'
                'ram vram volt'
            `}
            gridTemplateColumns={'repeat(2, minmax(0, 1fr))'}
            gridTemplateRows={'2fr 1fr'}
        >
            <GridItem area={'cpu'}>
                <CpuGaugeMain messages={messages}/>
            </GridItem>
            <GridItem area={'gpu'}>
                <GpuGaugeMain messages={messages}/>
            </GridItem>
            <GridItem area={'ram'}>
                Ram
            </GridItem>
            <GridItem area={'vram'}>
                Vram
            </GridItem>
            <GridItem area={'volt'}>
                Volt
            </GridItem>
        </Grid>
    );
};
