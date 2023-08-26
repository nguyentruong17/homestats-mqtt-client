import { useToken } from '@chakra-ui/react'
import { ReactELiquidFill } from './ReactELiquidFill'
import { sensor_map } from './const'

import type { CSSProperties } from 'react'
import type { TopicMessage } from './App'
import type { LiquidFillGaugeOption } from './type'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

type GraphComponentProps = {
    id: string;
    messages: TopicMessage[];
    style?: CSSProperties;
}

export const GraphComponent = ({
    id,
    messages,
    style
}: GraphComponentProps) => {
    const color = useToken(
        // the key within the theme, in this case `theme.colors`
        'colors',
        // the subkey(s), resolving to `theme.colors.red.100`
        ['teal.200', 'teal.300', 'teal.400', 'teal.500', 'teal.600'],
        // a single fallback or fallback array matching the length of the previous arg
    )

    if (!(id in sensor_map)) {
        return null;
    }

    const unit = sensor_map[id].unit

    const getStatsFromId = (stopIndex = 6) => messages
        .slice(0, stopIndex)
        .map((each) => each.payload)
        .map((payload) => payload.find((each) => each.Id === id)!.Value / 100)

    const getStatText = (param: CallbackDataParams) => `${param.seriesName}\n${Math.round((param.value) as number * 100)}${unit}`

    const option: LiquidFillGaugeOption = {
        series: [{
            backgroundStyle: {
                color: '#FAF5FF'
            },
            color,
            data: getStatsFromId(),
            // itemStyle: {
            //     opacity: 0.95,
            //     shadowBlur: 50,
            //     shadowColor: 'rgba(0, 0, 0, 0.4)'
            // },
            itemStyle: {
                opacity: 0.95,
                shadowColor: 'rgba(0, 0, 0, 0.1)'
            },
            label: {
                color: '#2C7A7B',
                formatter: getStatText,
                fontSize: 16,
                position: ['50%', '60%']
            },
            name: sensor_map[id].label,
            outline: {
                show: false
            },
            radius: '100px',
            type: 'liquidFill',
        }]
    }

    return (
        <ReactELiquidFill
            option={option}
            style={style}
        />
    )
}
