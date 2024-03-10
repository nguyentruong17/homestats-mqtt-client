import React, {FC} from 'react';


// sys_mem__clock
// [group]_[sensor]__[type]

// [2, 1]
// [W_H]

export type Dim = 1 | 2 | 3 | 'F';

export type WidgetProps = {
    dataLenses: string[];
    dimensions: [Dim, Dim];
    range: number; // 1 to 100 for now
};

export const Widget: FC<WidgetProps> = (props) => {
    // read data lenses and only keep the ones that the widget supports
    // read dimensions and see if the widget supports
    // read range andd see if the widget supports range

    return 'Widget';
};
