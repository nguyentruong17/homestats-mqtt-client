import { Button, Icon } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';
import { BsMoon, BsSun } from 'react-icons/bs';

export const ToggleColorMode = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Button
            onClick={() => toggleColorMode()}
            pos='absolute'
            top='0'
            right='0'
            m='1rem'
        >
            {colorMode === 'dark' ? (
                <Icon as={BsSun} color='orange.200' />
            ) : (
                <Icon as={BsMoon} color='blue.700' />
            )}
        </Button>
    )
}
