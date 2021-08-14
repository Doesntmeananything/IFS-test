import { Box, Skeleton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Card } from 'src/components/Card';
import { ScrollRow } from 'src/components/ScrollRow';
import ROUTES from 'src/constants/routes';
import { useShowErrorToast } from 'src/hooks/errors';
import { useAppSelector } from 'src/hooks/redux';
import fallbackImage from 'src/images/fallback.jpg';
import { useGetProgramsByChannelIdQuery } from 'src/redux/api';
import { formatBroadcastTime } from 'src/utils/time';

import { Channels } from './Channels';

/**
 * Displays scheduled programs for currently selected channel.
 */
export const Programs = (): JSX.Element => {
    const { t } = useTranslation();

    const selectedChannelId = useAppSelector((state) => state.channels.selectedChannelId);
    const { data, isSuccess, isError } = useGetProgramsByChannelIdQuery(selectedChannelId);

    useShowErrorToast(isError);

    return (
        <Box borderWidth="1px" borderRadius="lg" p="24px">
            <Channels />

            <ScrollRow rowLabel={t('programs.scheduled')}>
                {isSuccess
                    ? data.map((program) => (
                          <Link key={program.id} to={`${ROUTES.programs}/${program.id}`} data-testid="program">
                              <Card
                                  key={program.id}
                                  imageSrc={program.pictures?.thumbnails?.[0] ?? fallbackImage}
                                  imageAlt={program.title}
                                  title={program.title}
                                  subtitle={formatBroadcastTime(
                                      program.broadcast_datetime,
                                      program.broadcast_end_datetime,
                                  )}
                              />
                          </Link>
                      ))
                    : Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} width="200px" height="175px" />)}
            </ScrollRow>
        </Box>
    );
};
