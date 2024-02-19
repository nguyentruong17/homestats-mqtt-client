export const SUBSCRIBED_TOPIC = 'bedroom/torrent7';

export const SENSOR_MAP: {[id: string]: {
    label: string,
    maxValue?: number,
    shortenLabel?: string,
    unit: string,
}} = {
    'sys_cpu__clock': {
        label: 'CPU Core Clock Average',
        maxValue: 4600,
        shortenLabel: 'CPU Clock Avg',
        unit: 'MHZ'
    },
    'sys_cpu__clock_core_max': {
        label: 'CPU Core Clock Max',
        maxValue: 4600,
        shortenLabel: 'CPU Clock Max',
        unit: 'MHZ'
    },
    'sys_cpu__clock_core_min': {
        label: 'CPU Core Clock Min',
        maxValue: 4600,
        shortenLabel: 'CPU Clock Min',
        unit: 'MHZ'
    },
    'sys_cpu__utilization': {
        label: 'CPU Utilization Average',
        shortenLabel: 'CPU Util Avg',
        unit: '%'
    },
    'sys_cpu__utilization_thread_max': {
        label: 'CPU Thread Utilization Max',
        shortenLabel: 'CPU Util Max',
        unit: '%'
    },
    'sys_cpu__utilization_thread_min': {
        label: 'CPU Thread Utilization Min',
        shortenLabel: 'CPU Util Min',
        unit: '%'
    },
    'sys_gpu__mem_clock': {
        label: 'GPU Memory Clock',
        maxValue: 7191,
        shortenLabel: 'GPU Mem Clock',
        unit: 'MHZ'
    },
    'sys_gpu__mem_usage': {
        label: 'GPU Memory Usage',
        maxValue: 8192,
        shortenLabel: 'GPU Mem Usage',
        unit: 'MB'
    },
    'sys_gpu__utilization': {
        label: 'GPU Utilization',
        shortenLabel: 'GPU Util',
        unit: '%'
    },
    'sys_mem__clock': {
        label: 'RAM Clock',
        maxValue: 3556,
        unit: 'MHZ'
    },
    'sys_mem__usage': {
        label: 'RAM Usage',
        maxValue: 32677,
        unit: 'MB'
    },

    'temp_chipset__measure': {
        label: 'Chipset Temperature',
        shortenLabel: 'Chipset Temp',
        unit: '°C'
    },
    'temp_cpu__measure': {
        label: 'CPU Temperature',
        shortenLabel: 'CPU Temp',
        unit: '°C'
    },
    'temp_gpu__hotspot': {
        label: 'GPU Hotspot Temperature',
        shortenLabel: 'GPU Hotspot Temp',
        unit: '°C'
    },
    'temp_gpu__measure': {
        label: 'GPU Temperature',
        shortenLabel: 'GPU Temp',
        unit: '°C'
    },
    'temp_hdd__hdd1': {
        label: 'SSD 1 Temperature',
        shortenLabel: 'SSD 1 Temp',
        unit: '°C'
    },
    'temp_hdd__hdd2': {
        label: 'SSD 2 Temperature',
        shortenLabel: 'SSD 2 Temp',
        unit: '°C'
    },

    'fan_cpu__measure': {
        label: 'CPU Fan',
        maxValue: 1500,
        unit: 'RPM'
    },
    'fan_gpu__fan1': {
        label: 'GPU Fan 1',
        maxValue: 3009,
        unit: 'RPM'
    },
    'fan_gpu__fan2': {
        label: 'GPU Fan 2',
        maxValue: 3009,
        unit: 'RPM'
    },
    'fan_gpu__fan3': {
        label: 'GPU Fan 3',
        maxValue: 3009,
        unit: 'RPM'
    },

    'voltage_cpu__measure': {
        label: 'CPU Voltage',
        shortenLabel: 'CPU Volt',
        unit: 'V'
    },
    'voltage_gpu__measure': {
        label: 'GPU Temp',
        shortenLabel: 'GPU Volt',
        unit: 'V'
    },

    'wattage_cpu__measure': {
        label: 'CPU Wattage',
        maxValue: 65,
        shortenLabel: 'CPU Watt',
        unit: 'V'
    },
    'wattage_gpu__measure': {
        label: 'GPU Wattage',
        maxValue: 270,
        shortenLabel: 'GPU Watt',
        unit: 'V'
    },
};
