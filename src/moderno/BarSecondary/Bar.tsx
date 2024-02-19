import { useToken } from '@chakra-ui/react';
import { ReactECharts } from 'src/echarts';

import type { CSSProperties } from 'react';
import type { ReactEChartsProps } from 'src/echarts/ReactECharts';

type BarProps = {
    data: number;
    maxValue?: number;
    style?: CSSProperties;
}

export const Bar = ({
    data,
    maxValue = 100,
    style
}: BarProps) => {
    const [purple100, purple500, purple600] = useToken(
        // the key within the theme, in this case `theme.colors`
        'colors',
        // the subkey(s), resolving to `theme.colors.red.100`
        ['purple.100', 'purple.500', 'purple.600', 'gray.400', 'gray.500'],
        // a single fallback or fallback array matching the length of the previous arg
    );

    const option: ReactEChartsProps['option'] = {
        tooltip: {},
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
            // barWidth: '40%',
            data: [data],
            label: {
                show: false
            },
            showBackground: true,
            itemStyle: {
                color: purple500,
                shadowColor: purple600,
                shadowBlur: 5,
                shadowOffsetX: 2,
                shadowOffsetY: 2
            },
            backgroundStyle: {
                color: purple100
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
