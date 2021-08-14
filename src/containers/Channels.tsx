import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useShowErrorToast } from 'src/hooks/errors';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { useGetChannelsQuery } from 'src/redux/api';
import { selectChannel } from 'src/redux/channels';

/**
 * Displays select menu containing available channels.
 * Triggers Redux action on switching channels, announcing new channel to subscribed component.
 */
export const Channels = (): JSX.Element => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const selectedChannelId = useAppSelector((state) => state.channels.selectedChannelId);

    const { data, isSuccess, isError } = useGetChannelsQuery({ limit: 14 });

    useShowErrorToast(isError);

    const changeChannel = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(selectChannel(event.target.value));
    };

    return (
        <Select w="fit-content" variant="filled" onChange={changeChannel} value={selectedChannelId}>
            {isSuccess ? (
                data.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                        {channel.name}
                    </option>
                ))
            ) : (
                <option>{t('channel_plural')}</option>
            )}
        </Select>
    );
};
