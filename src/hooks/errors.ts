import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const useShowErrorToast = (isError: boolean): void => {
    const { t } = useTranslation();

    const toast = useToast();
    const id = 'error-toast';

    if (isError && !toast.isActive(id)) {
        toast({
            id,
            title: t('error.title'),
            description: t('error.description'),
            status: 'error',
            duration: 10000,
            isClosable: true,
            position: 'top',
        });
    }
};
