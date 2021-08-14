import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Props {
    pageName?: string;
}

/**
 * Displays breadcrumbs for navigating between routes.
 */
export const Header = ({ pageName }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Box borderBottomWidth="1px">
            <Flex as="header" maxW="8xl" py="20px" px="56px" mx="auto">
                <Breadcrumb spacing="4px" separator={<ChevronRightIcon height="16" />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontWeight="bold" as={Link} to="/">
                            {t('home.breadcrumb')}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {pageName && (
                        <BreadcrumbItem>
                            <BreadcrumbLink fontWeight="bold">{pageName}</BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                </Breadcrumb>
            </Flex>
        </Box>
    );
};
