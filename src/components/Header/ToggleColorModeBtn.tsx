import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';
import { BsMoon, BsSun } from 'react-icons/bs';

export type ToggleColorModeBtnProps = {
    ButtonSx?: ButtonProps['sx'];
    size?: ButtonProps['size'];
};

export const ToggleColorModeBtn = ({
    ButtonSx = {},
    size = 'sm'
}: ToggleColorModeBtnProps) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button
            onClick={toggleColorMode}
            size={size}
            {...ButtonSx}
        >
            {colorMode === 'dark' ? (
                <Icon
                    as={BsSun}
                    // color='orange'
                />
            ) : (
                <Icon
                    as={BsMoon}
                    // color='teal'
                />
            )}
        </Button>
    );
};
