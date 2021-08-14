import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_ROUTES, MOSAIC_CATEGORIES } from 'src/constants/api';

import {
    Channel,
    ChannelsResponse,
    Program,
    ProgramResponse,
    ProgramsResponse,
    VOD,
    VODResponse,
    VODsResponse,
} from './types';

export const maculosaApi = createApi({
    reducerPath: 'maculosaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE_URL,
    }),
    endpoints: (builder) => ({
        getChannels: builder.query<Channel[], { limit?: number } | void>({
            query: (options) => {
                const params = new URLSearchParams();
                if (options && options.limit) {
                    params.append('limit', String(options.limit));
                }

                return { url: API_ROUTES.channels, params };
            },
            transformResponse: (response: ChannelsResponse) =>
                response.channels.filter((channel) => !MOSAIC_CATEGORIES.includes(channel.category)),
        }),

        getProgramsByChannelId: builder.query<Program[], string>({
            query: (channelId) => {
                const params = new URLSearchParams();
                params.append('channel', String(channelId));

                return { url: API_ROUTES.programs, params };
            },
            transformResponse: (response: ProgramsResponse) => response.contents,
        }),

        getProgramDetails: builder.query<Program, string>({
            query: (programId) => ({ url: `${API_ROUTES.programDetails}/${programId}` }),
            transformResponse: (response: ProgramResponse) => response.content,
        }),

        getVODContents: builder.query<VOD[], { limit?: number; category?: string } | void>({
            query: (options) => {
                const params = new URLSearchParams();
                if (options) {
                    options.limit && params.append('limit', String(options.limit));
                    options.category && params.append('category', options.category);
                }

                return { url: API_ROUTES.vods, params };
            },
            transformResponse: (response: VODsResponse) => response.contents,
        }),

        getVodDetailsByContentId: builder.query<VOD, string>({
            query: (vodId) => ({ url: `${API_ROUTES.vodDetails}/${vodId}` }),
            transformResponse: (response: VODResponse) => response.content,
        }),
    }),
});

export const {
    useGetChannelsQuery,
    useGetProgramsByChannelIdQuery,
    useGetProgramDetailsQuery,
    useGetVODContentsQuery,
    useGetVodDetailsByContentIdQuery,
} = maculosaApi;
