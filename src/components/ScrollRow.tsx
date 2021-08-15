import { Flex, Heading, IconButton, Stack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { ReactNode, useRef } from 'react';

import { useCreateScrollAnimationHandler } from 'src/hooks/animation';

interface Props {
    rowLabel: string;
    children: ReactNode;
}

/**
 * Displays children in a scrollable horizontal container.
 */
export const ScrollRow = ({ rowLabel, children }: Props): JSX.Element => {
    const scrollRowRef = useRef<HTMLDivElement>(null);

    const scrollLeft = useCreateScrollAnimationHandler(scrollRowRef, 'left');
    const scrollRight = useCreateScrollAnimationHandler(scrollRowRef, 'right');

    return (
        <div>
            <Flex justify="space-between" align="center" paddingY="2">
                <Heading size="lg">{rowLabel}</Heading>
                <Stack direction="row">
                    <IconButton
                        size="sm"
                        w="32px"
                        aria-label="Scroll left"
                        onClick={scrollLeft}
                        icon={<ChevronLeftIcon height="20" />}
                    />
                    <IconButton
                        size="sm"
                        w="32px"
                        aria-label="Scroll right"
                        onClick={scrollRight}
                        icon={<ChevronRightIcon height="20" />}
                    />
                </Stack>
            </Flex>

            <Stack
                direction="row"
                overflowX="scroll"
                ref={scrollRowRef}
                // Hide scrollbars with CSS to allow drag and gesture scrolling on certain devices
                sx={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        width: 0,
                        height: 0,
                    },
                }}
            >
                {children}
            </Stack>
        </div>
    );
};
