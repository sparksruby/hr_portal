import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";

export interface TimelineItem {
    title: string;
    date?: string;
    description?: string;
    completed: boolean;
}

interface ApplicationTimelineProps {
    items: TimelineItem[];
}

export function ApplicationTimeline({ items }: ApplicationTimelineProps) {
    return (
        <VStack align="stretch" spacing={0}>
            {items.map((item, index) => (
                <HStack key={`${item.title}-${index}`} align="flex-start" spacing={3} pb={5}>
                    <Box
                        mt={1}
                        boxSize="12px"
                        borderRadius="full"
                        bg={item.completed ? "green.400" : "gray.300"}
                        flexShrink={0}
                    />
                    <Box flex="1">
                        <HStack justify="space-between" align="start">
                            <Text fontWeight="semibold" fontSize="sm">{item.title}</Text>
                            <Badge colorScheme={item.completed ? "green" : "gray"}>
                                {item.completed ? "Complete" : "Pending"}
                            </Badge>
                        </HStack>
                        {item.date && <Text fontSize="xs" color="gray.500">{item.date}</Text>}
                        {item.description && <Text fontSize="sm" color="gray.600" mt={1}>{item.description}</Text>}
                    </Box>
                </HStack>
            ))}
        </VStack>
    );
}
