import {
    Icon,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber,
} from '@chakra-ui/react'
import { TbEqualDouble } from 'react-icons/tb'
import { sensor_map } from './const';

import type { TopicMessage } from './App'

const option: Intl.NumberFormatOptions = {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
};

const pctFormatter = new Intl.NumberFormat('en-US', option);

type StatComponentProps = {
    id: string,
    nowMessage: TopicMessage,
    prevMessage: TopicMessage
}

export const StatComponent = ({
    id,
    nowMessage,
    prevMessage
}: StatComponentProps) => {
    if (!(id in sensor_map)) {
        return null;
    }

    const getStatsFromId = () => {
        const nowValue = nowMessage.payload?.find((each) => each.Id === id)!.Value
        const prevValue = prevMessage.payload?.find((each) => each.Id === id)!.Value

        const pctDif = (nowValue - prevValue) / prevValue

        return {
            now: nowValue,
            prev: prevValue,
            pct: pctFormatter.format(pctDif)
        }
    }

    const getStatText = (stat: number) => {
        const unit = sensor_map[id].unit

        return `${stat.toLocaleString('en-US')}${unit}`
    }

    const {
        now,
        prev,
        pct
    } = getStatsFromId()

    return (
        <Stat
            sx={{
                // display: 'flex',
                minW: 'min-content',
                w: '250px'
            }}
        >
            <StatLabel color='teal'>{sensor_map[id].label}</StatLabel>
            <StatNumber as='b'>{getStatText(now)}</StatNumber><br/>
            <StatNumber as='i' fontSize='sm'>{`(${getStatText(prev)})`}</StatNumber>
            <StatHelpText pt='.25rem'>
                {now === prev ? (
                    <Icon
                        as={TbEqualDouble}
                        boxSize={'1rem'}
                        mr='0.5rem'
                    />
                ) : (
                    <StatArrow type={now > prev ? 'increase' : 'decrease'} />
                )}
                {pct}
            </StatHelpText>
        </Stat>
    )
}
