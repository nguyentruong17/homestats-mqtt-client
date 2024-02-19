import { useToken } from '@chakra-ui/react';
import { ReactECharts } from 'src/echarts';

import type { CSSProperties } from 'react';
import type { ReactEChartsProps } from 'src/echarts/ReactECharts';

type BarProps = {
    data: number;
    maxValue?: number;
    style?: CSSProperties;
    unit: string;
}

export const Bar = ({
    data,
    maxValue = 100,
    style,
    unit
}: BarProps) => {
    const [purple100, purple500, purple600, gray400, gray500] = useToken(
        // the key within the theme, in this case `theme.colors`
        'colors',
        // the subkey(s), resolving to `theme.colors.red.100`
        ['purple.100', 'purple.500', 'purple.600', 'gray.400', 'gray.500'],
        // a single fallback or fallback array matching the length of the previous arg
    );

    const option: ReactEChartsProps['option'] = {
        tooltip: {
            show: false
        },
        grid: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
        },
        xAxis: {
            type: 'value',
            min: 0,
            max: maxValue,
            show: false
        },
        yAxis: {
            type: 'category',
            show: false
        },
        series: [{
            type: 'bar',
            barWidth: '5%',
            data: [data],
            label: {
                show: true,
                fontSize: 12,
                position: 'start',
                offset: [0, 12 * 1.5],
                formatter: `{value|{c}} {unit|${unit}}`,
                rich: {
                    value: {
                        fontSize: '.8rem',
                        fontWeight: 'bolder',
                        color: gray400
                    },
                    unit: {
                        fontSize: '.5rem',
                        color: gray500
                    }
                }
            },
            showBackground: true,
            itemStyle: {
                color: purple500,
                shadowColor: purple600,
                shadowBlur: 5,
                shadowOffsetX: 1,
                shadowOffsetY: 1
            },
            backgroundStyle: {
                color: purple100,
                // shadowColor: purple600,
                // shadowBlur: 5,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2
            }
        }]
    };

    return (
        <ReactECharts
            option={option}
            style={style}
        />
    );
};
