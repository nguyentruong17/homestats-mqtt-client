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
                formatter: `{c} ${unit}`
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
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
