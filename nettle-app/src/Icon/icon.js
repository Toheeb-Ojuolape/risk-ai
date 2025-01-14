/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { forwardRef } from 'react';
import * as Icons from '@tabler/icons-react';

const Icon = forwardRef(({ className, color, icon, size, stroke }, ref) => {
    const IconComponent = Icons[icon];

    if (!IconComponent) return null;

    return (
        <IconComponent
            ref={ref}
            className={className}
            color={color}
            size={size}
            stroke={stroke}
        />
    );
});

export default Icon;
