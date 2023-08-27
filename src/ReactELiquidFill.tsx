import 'echarts-liquidfill';
import { ReactECharts } from './ReactECharts';

import type { CSSProperties } from 'react';
import type { LiquidFillGaugeOption } from './type';


export interface LiquidFillGaugeProps {
    option: LiquidFillGaugeOption;
    style?: CSSProperties;
}

export const ReactELiquidFill = ({ option, style }: LiquidFillGaugeProps): JSX.Element => (
    <ReactECharts
        option={option}
        style={style}
    />
)
