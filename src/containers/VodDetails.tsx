import { Box, Button, Flex, Grid, Heading, HStack, Image, Skeleton, Stack, Tag, Text, Tooltip } from '@chakra-ui/react';
import { PlayIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Header } from 'src/containers/Header';
import { useShowErrorToast } from 'src/hooks/errors';
import { useGetVodDetailsByContentIdQuery } from 'src/redux/api';
import { formatSecondsToHoursAndMinutes } from 'src/utils/time';

/**
 * Displays details for the currently viewed VOD.
 */
export const VodDetails = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const { data, isSuccess, isError } = useGetVodDetailsByContentIdQuery(id);

    const { t } = useTranslation();

    useShowErrorToast(isError);

    return (
        <>
            <Header pageName={data?.title} />

            <Box
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                backgroundImage={`url(${data?.pictures.backdrops?.[0]})`}
            >
                <Box
                    borderBottomWidth="1px"
                    bgGradient="linear(to-r, rgba(11.76%, 11.37%, 10.98%, 1.00) 150px, rgba(11.76%, 11.37%, 10.98%, 0.84))"
                    mb="20px"
                >
                    <Grid maxW="8xl" p="40px" mx="auto" templateColumns="auto 1fr">
                        <Skeleton isLoaded={isSuccess} width="194px" height="280px" alignSelf="center">
                            <Image src={data?.pictures.thumbnails?.[0]} borderRadius="md" />
                        </Skeleton>

                        <Flex justify="center" pl="40px" direction="column">
                            <Skeleton isLoaded={isSuccess} h="75px">
                                <Heading mb={2}>
                                    <Text as="span" mr="2">
                                        {data?.title}
                                    </Text>
                                    <Text as="span" fontWeight="normal">
                                        ({new Date(data?.release_date).getFullYear()})
                                    </Text>
                                </Heading>

                                <HStack>
                                    <Text as="span">{data?.genre}</Text>
                                    <Text as="span">•</Text>
                                    <Tag>{formatSecondsToHoursAndMinutes(data?.runtime)}</Tag>
                                </HStack>
                            </Skeleton>

                            <Box mt="20px" mb="8px">
                                <Tooltip hasArrow label="Coming soon!">
                                    <Button colorScheme="cyan" rightIcon={<PlayIcon height="20" />}>
                                        {t('vods.watch')}
                                    </Button>
                                </Tooltip>
                            </Box>

                            <Heading as="h3" fontSize="xl" mt="16px" mb="8px">
                                {t('vods.description')}
                            </Heading>
                            <Text mb="20px">{data?.summary}</Text>

                            <Stack direction="row" spacing="16px">
                                {data?.directors.map((director) => (
                                    <div key={director}>
                                        <Text fontWeight="bold">{director}</Text>
                                        <Text fontSize="sm">Director</Text>
                                    </div>
                                ))}
                            </Stack>
                        </Flex>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};
