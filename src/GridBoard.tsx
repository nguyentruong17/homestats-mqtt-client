import React from 'react';
import { Grid } from '@chakra-ui/react';
import { useMultiDrop } from 'react-dnd-multi-backend';

import type { CSSProperties, RefObject } from 'react';


export const GridBoard: React.FC<{
    children: React.ReactNode,
    logs: RefObject<Element>
}> = ({
    children,
    logs
}) => {
    const [, { html5: [html5Props, html5Drop], touch: [touchProps, touchDrop] }] = useMultiDrop<DragContent, void, { isOver: boolean, canDrop: boolean }>({
        accept: 'box',
        drop: (item) => {
            console.log({item})
            const message = `Dropped: ${item.color}`;
            if (logs.current) {
                logs.current.innerHTML += `${message}<br />`
            }
        },
        collect: (monitor) => {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }
        },
    });

    // const html5DropStyle: CSSProperties = {
    //     backgroundColor: (html5Props.isOver && html5Props.canDrop) ? '#f3f3f3' : '#bbbbbb',
    //     display: 'inline-block',
    //     margin: '5px',
    //     width: '90px',
    //     height: '90px',
    //     textAlign: 'center',
    //     userSelect: 'none',
    // };

    // const touchDropStyle: CSSProperties = {
    //     backgroundColor: (touchProps.isOver && touchProps.canDrop) ? '#f3f3f3' : '#bbbbbb',
    //     display: 'inline-block',
    //     margin: '5px',
    //     width: '90px',
    //     height: '90px',
    //     textAlign: 'center',
    //     userSelect: 'none',
    // };

    return (
        <Grid
            border='1px dashed black'
            columnGap={2}
            h='100%'
            rowGap={2}
            templateColumns='repeat(12, 1fr)'
            templateRows='repeat(8, 1fr)'
        >
            {children}
        </Grid>
    );
};
