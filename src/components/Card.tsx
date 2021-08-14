import { AspectRatio, Box, Flex, Heading, Image, Tag } from '@chakra-ui/react';

interface Props {
    imageSrc: string;
    imageAlt: string;
    imageHeight?: string;
    title: string;
    subtitle: string;
}

/**
 * Displays a piece of image content with a title and subtitle.
 */
export const Card = ({ imageSrc, imageAlt, title, subtitle, imageHeight = 'inherit' }: Props): JSX.Element => {
    return (
        <Flex direction="column" w="200px">
            <Box overflow="hidden" borderRadius="md" mb="3">
                <AspectRatio
                    ratio={16 / 9}
                    height={imageHeight}
                    transition="transform 400ms cubic-bezier(0.17, 0.67, 0.13, 1.02)"
                    _hover={{
                        transform: 'scale(1.1)',
                    }}
                >
                    <Image fit="cover" src={imageSrc} alt={imageAlt} loading="lazy" />
                </AspectRatio>
            </Box>

            <div>
                <Heading size="sm" mb="2" isTruncated title={title}>
                    {title}
                </Heading>
                <Tag size="sm">{subtitle}</Tag>
            </div>
        </Flex>
    );
};
