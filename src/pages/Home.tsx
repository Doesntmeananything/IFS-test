import { Box, Divider, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Header } from 'src/containers/Header';
import { Programs } from 'src/containers/Programs';
import { VODs } from 'src/containers/Vods';

export const Home = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <>
            <Header />

            <Box px="54px" py="30px" maxW="8xl" mx="auto">
                <Box pb="30px">
                    <Heading fontWeight="normal">{t('home.discover')}</Heading>
                    <Heading>{t('home.explore')}</Heading>
                </Box>

                <Programs />

                <Divider py="14px" />

                <VODs />
            </Box>
        </>
    );
};
