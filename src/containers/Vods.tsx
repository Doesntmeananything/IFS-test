import { Stack } from '@chakra-ui/react';

import { VOD_CATEGORIES } from 'src/constants/categories';

import { VODRow } from './VodRow';

/**
 * Displays rows of available VOD content for given categories.
 */
export const VODs = (): JSX.Element => {
    return (
        <Stack spacing="24px" borderWidth="1px" borderRadius="lg" p="24px">
            {VOD_CATEGORIES.map((category) => (
                <VODRow key={category} category={category} />
            ))}
        </Stack>
    );
};
