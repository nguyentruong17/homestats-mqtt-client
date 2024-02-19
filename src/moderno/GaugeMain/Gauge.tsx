import { useToken } from '@chakra-ui/react';
import { ReactECharts } from 'src/echarts';

import type { CSSProperties } from 'react';
import type { ReactEChartsProps } from 'src/echarts/ReactECharts';

export type GaugeProps = {
    data: number;
    maxValue?: number;
    style?: CSSProperties;
    unit: string;
};

export const Gauge = ({
    data,
    maxValue = 100,
    style,
    unit
}: GaugeProps) => {
    const [, purple500, purple600, gray400, gray500] = useToken(
        // the key within the theme, in this case `theme.colors`
        'colors',
        // the subkey(s), resolving to `theme.colors.red.100`
        ['purple.100', 'purple.500', 'purple.600', 'gray.400', 'gray.500'],
        // a single fallback or fallback array matching the length of the previous arg
    );
    
    const option: ReactEChartsProps['option'] = {
        series: [
            {
                type: 'gauge',
                startAngle: 220,
                endAngle: -40,
                min: 0,
                max: maxValue,
                radius: '100%',
                splitNumber: 12,
                itemStyle: {
                    color: purple500,
                    shadowColor: purple600,
                    shadowBlur: 10,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                progress: {
                    show: true,
                    roundCap: true,
                    // width: 18
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    show: false,
                    roundCap: true,
                    // lineStyle: {

                    // }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    width: '60%',
                    lineHeight: 40,
                    height: 40,
                    offsetCenter: [0, 0],
                    valueAnimation: true,
                    formatter: function (value) {
                        return '{value|' + value.toFixed(0) + `}{unit|${unit}}`;
                    },
                    rich: {
                        value: {
                            fontSize: '3rem',
                            fontWeight: 'bolder',
                            color: gray400
                        },
                        unit: {
                            fontSize: '1.5rem',
                            color: gray500,
                            padding: [0, 0, -20, 10]
                        }
                    }
                },
                data: [data]
            }
        ]
    };

    return (
        <ReactECharts
            option={option}
            style={style}
        />
    );
};
