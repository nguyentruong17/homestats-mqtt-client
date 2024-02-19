import {SENSOR_MAP} from '../consts';

export const getMetadataForSensorId = (sensorId: string) => (metadata: 'label' | 'maxValue' | 'shortenLabel' | 'unit') => {
    try {
        return SENSOR_MAP[sensorId][metadata];
    } catch {
        throw new Error('SensorId is not defined yet.')
    }
}
