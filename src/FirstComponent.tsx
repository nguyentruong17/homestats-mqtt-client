import {
    Spinner,
    Stat,
    StatArrow,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
} from '@chakra-ui/react'
import { useAppContext } from './AppContext'

export const FirstComponent = () => {
    const { messages } = useAppContext();
    const nowMessage = messages[0];
    const prevMessage = messages[1];

    if (!nowMessage || !prevMessage) {
        return <Spinner></Spinner>
    }

    console.log({
        nowMessage: nowMessage.sent,
        prevMessage: prevMessage.sent,
        messages
    })

    const nowCpuTemp = nowMessage.payload?.find((each) => each.Id === 'temp_cpu__measure')!.Value
    const prevCpuTemp = prevMessage.payload?.find((each) => each.Id === 'temp_cpu__measure')!.Value

    const nowGpuTemp = nowMessage.payload?.find((each) => each.Id === 'temp_gpu__measure')!.Value
    const prevGpuTemp = prevMessage.payload?.find((each) => each.Id === 'temp_gpu__measure')!.Value

    const cpuTempFluc = (nowCpuTemp - prevCpuTemp!) / prevCpuTemp * 100
    const gpuTempFluc = (nowGpuTemp - prevGpuTemp!) / prevGpuTemp * 100

    return (
        <StatGroup>
            <Stat>
                <StatLabel>{'CPU Temp'}</StatLabel>
                <StatNumber>{`${nowCpuTemp}  (${prevCpuTemp})`}</StatNumber>
                <StatHelpText>
                    <StatArrow type={nowCpuTemp > prevCpuTemp ? 'increase' : 'decrease'} />
                    {`${cpuTempFluc}%`}
                </StatHelpText>
            </Stat>

            <Stat>
                <StatLabel>{'GPU Temp'}</StatLabel>
                <StatNumber>{`${nowGpuTemp}  (${prevGpuTemp})`}</StatNumber>
                <StatHelpText>
                <StatArrow type={nowGpuTemp > prevGpuTemp ? 'increase' : 'decrease'} />
                    {`${gpuTempFluc}%`}
                </StatHelpText>
            </Stat>
        </StatGroup>
    )
}