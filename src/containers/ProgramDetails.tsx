import { Divider, Flex, Grid, Heading, HStack, Image, Skeleton, Tag, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { Header } from 'src/containers/Header';
import { useShowErrorToast } from 'src/hooks/errors';
import { useGetProgramDetailsQuery } from 'src/redux/api';
import { formatBroadcastTime, formatSecondsToHoursAndMinutes } from 'src/utils/time';

/**
 * Displays details for the currently viewed program.
 */
export const ProgramDetails = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const { data, isSuccess, isError } = useGetProgramDetailsQuery(id);

    useShowErrorToast(isError);

    const broadcastTime = formatBroadcastTime(data?.broadcast_datetime, data?.broadcast_end_datetime);
    const formattedRuntime = `${formatSecondsToHoursAndMinutes(data?.runtime)}`;
    const categories = [...new Set(data?.category.split(','))];

    return (
        <>
            <Header pageName={data?.title} />

            <Grid
                templateColumns={{ base: '1fr', lg: '640px 1fr' }}
                templateRows="360px"
                justify="center"
                p="56px"
                maxW="8xl"
                mx="auto"
                data-testid="program-details"
            >
                <Skeleton width="640" height="360" isLoaded={isSuccess}>
                    <Image
                        fit="cover"
                        w="40rem"
                        borderRadius="md"
                        src={data?.pictures?.thumbnails?.[2]}
                        fallback={<Skeleton width="640" height="360" />}
                        alt={data?.title}
                    />
                </Skeleton>

                <Flex direction="column" justify="center" pl="20px">
                    <Skeleton isLoaded={isSuccess}>
                        <Heading>{data?.title}</Heading>

                        <HStack mb="12px">
                            <Text fontSize="sm">{broadcastTime}</Text>
                            <Text as="span">•</Text>
                            <Text fontSize="sm">{formattedRuntime}</Text>
                        </HStack>
                    </Skeleton>

                    <Divider />

                    <HStack my="8px" fontSize="sm">
                        {categories.map((category) => (
                            <Tag key={category} size="sm" colorScheme="teal">
                                {category}
                            </Tag>
                        ))}
                    </HStack>
                </Flex>
            </Grid>
        </>
    );
};
