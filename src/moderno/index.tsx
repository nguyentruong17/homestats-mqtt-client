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

export const Moderno = () => (
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
                    <CpuGaugeMain/>
                </GridItem>
                <GridItem colSpan={1}>
                    <GpuGaugeMain/>
                </GridItem>
            </Grid>
        </GridItem>
        <GridItem area={'secondary'}>
            <Grid
                h={'100%'}
                templateColumns='repeat(3, 1fr)'
            >
                <GridItem colSpan={1}>
                    <RamBarSecondary/>
                </GridItem>
                <GridItem colSpan={1}>
                    <VramBarSecondary/>
                </GridItem>
                <GridItem colSpan={1}>
                    <WattBarSecondary/>
                </GridItem>
            </Grid>
        </GridItem>
    </Grid>
);

export const ITEMS: {
    id: number;
    component: () => React.ReactElement;
    colSpan: number;
    rowSpan: number;
}[] = [
    {
        id: 1,
        component: CpuGaugeMain,
        colSpan: 6,
        rowSpan: 4
    },
    {
        id: 2,
        component: GpuGaugeMain,
        colSpan: 6,
        rowSpan: 4
    },
    {
        id: 3,
        component: RamBarSecondary,
        colSpan: 4,
        rowSpan: 2
    },
    {
        id: 4,
        component: VramBarSecondary,
        colSpan: 4,
        rowSpan: 2
    },
    {
        id: 5,
        component: WattBarSecondary,
        colSpan: 4,
        rowSpan: 2
    }
];
