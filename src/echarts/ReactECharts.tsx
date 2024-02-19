import { useRef, useEffect } from 'react';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { init, getInstanceByDom, use } from 'echarts/core';
import { ScatterChart, LineChart, BarChart, GaugeChart } from 'echarts/charts';
import {
    LegendComponent,
    GridComponent,
    TooltipComponent,
    ToolboxComponent,
    TitleComponent,
    DataZoomComponent,
} from 'echarts/components';

import type { CSSProperties } from 'react'
import type { ECharts, ComposeOption, SetOptionOpts } from 'echarts/core';
import type {
    BarSeriesOption,
    LineSeriesOption,
    ScatterSeriesOption,
    GaugeSeriesOption
} from 'echarts/charts';
import type { TitleComponentOption, GridComponentOption } from 'echarts/components';
import type { LiquidFillGaugeOption } from '../type';

use([
    BarChart,
    CanvasRenderer, // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.
    DataZoomComponent, // Used in Line Graph Charts
    GridComponent,
    LegendComponent,
    LineChart,
    ScatterChart,
    SVGRenderer,
    TitleComponent,
    ToolboxComponent, // A group of utility tools, which includes export, data view, dynamic type switching, data area zooming, and reset.
    TooltipComponent,
    GaugeChart
]);

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | GridComponentOption
    | ScatterSeriesOption
    | GaugeSeriesOption
>;

export interface ReactEChartsProps {
    loading?: boolean;
    option: EChartsOption | LiquidFillGaugeOption;
    settings?: SetOptionOpts;
    style?: CSSProperties;
    theme?: 'light' | 'dark';
}

export const ReactECharts = ({
    option,
    style,
    settings,
    loading,
    theme,
}: ReactEChartsProps): JSX.Element => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let chart: ECharts | undefined;
    
        if (chartRef.current) {
            chart = init(chartRef.current, theme);
        }

        const resizeChart = () => {
            chart?.resize();
        };

        const resizeObserver = new ResizeObserver(() => {
            resizeChart();
        });

        // what if chartRef.current is undefined?
        resizeObserver.observe(chartRef.current!);

        // window.addEventListener('resize', resizeChart);

        return () => {
            if (chartRef.current) {
                resizeObserver.unobserve(chartRef.current);
            } else {
                resizeObserver.disconnect();
            }

            chart?.dispose();
            // window.removeEventListener('resize', resizeChart);
        };
    }, [theme]);

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = getInstanceByDom(chartRef.current);
        chart?.setOption(option, settings);
    }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = getInstanceByDom(chartRef.current);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        loading === true ? chart?.showLoading() : chart?.hideLoading();
    }, [loading, theme]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />;
}
