export const sensor_map: {[id: string]: {
    label: string,
    unit: string
}} = {
    'temp_cpu__measure': {
        label: 'CPU Temp',
        unit: '°C'
    },
    'temp_gpu__measure': {
        label: 'GPU Temp',
        unit: '°C'
    },
    'sys_mem__usage': {
        label: 'RAM Usage',
        unit: ' MB'
    },
    'sys_gpu__mem_usage': {
        label: 'GMem Usage',
        unit: ' MB'
    }
}
