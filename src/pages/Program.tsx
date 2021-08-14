import { Stack } from '@chakra-ui/react';

import { ProgramDetails } from 'src/containers/ProgramDetails';
import { Programs } from 'src/containers/Programs';
import { VODs } from 'src/containers/Vods';

export const Program = (): JSX.Element => {
    return (
        <>
            <ProgramDetails />

            <Stack maxW="8xl" m="auto" spacing="16px" px="20px" pb="24px">
                <Programs />

                <VODs />
            </Stack>
        </>
    );
};
