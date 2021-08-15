import { Stack } from '@chakra-ui/react';

import { Programs } from 'src/containers/Programs';
import { VodDetails } from 'src/containers/VodDetails';
import { VODs } from 'src/containers/Vods';

export const Vod = (): JSX.Element => {
    return (
        <>
            <VodDetails />

            <Stack maxW="8xl" m="auto" spacing="16px" px="20px" pb="24px">
                <VODs />

                <Programs />
            </Stack>
        </>
    );
};
