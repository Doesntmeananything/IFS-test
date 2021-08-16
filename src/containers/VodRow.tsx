import { Skeleton } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'src/components/Card';
import { ScrollRow } from 'src/components/ScrollRow';
import ROUTES from 'src/constants/routes';
import { useShowErrorToast } from 'src/hooks/errors';
import { maculosaApi, useGetVODContentsQuery } from 'src/redux/api';

interface Props {
    category: string;
}

/**
 * Displays a row of available movies for a given VOD category.
 */
export const VODRow = ({ category }: Props): JSX.Element => {
    const { data, isSuccess, isError } = useGetVODContentsQuery({ limit: 20, category });

    useShowErrorToast(isError);

    const prefetchVod = maculosaApi.usePrefetch('getVodDetails');
    const prefetchOnHover: MouseEventHandler<HTMLAnchorElement> = (event) => {
        prefetchVod(String(event.currentTarget.id));
    };

    return (
        <ScrollRow rowLabel={category}>
            {isSuccess
                ? data.map((vod) => (
                      <Link
                          id={String(vod.id)}
                          onMouseEnter={prefetchOnHover}
                          key={vod.id}
                          to={`${ROUTES.vods}/${vod.id}`}
                      >
                          <Card
                              key={vod.id}
                              imageSrc={vod.pictures?.thumbnails?.[0]}
                              imageAlt={vod.title}
                              imageHeight="280px"
                              title={vod.title}
                              subtitle={new Date(vod.release_date).getFullYear().toString()}
                          />
                      </Link>
                  ))
                : Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} width="200px" height="343" />)}
        </ScrollRow>
    );
};
