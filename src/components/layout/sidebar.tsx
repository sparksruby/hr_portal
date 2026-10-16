import {
    Avatar, Badge, Box, Button, Flex, Heading, HStack, Icon,
    Text, VStack,
} from "@chakra-ui/react";
import { FileText, LayoutGrid, LogOut, Mail } from "lucide-react";
import type { Page } from "../../App";

interface SidebarProps {
    activePage: Page;
    candidateCount: number;
    onNavigate: (page: Page) => void;
    onSignOut: () => void;
}

export function Sidebar({
    activePage,
    candidateCount,
    onNavigate,
    onSignOut,
}: SidebarProps) {
    const navButton = (
        label: string,
        icon: typeof LayoutGrid,
        selected: boolean,
        action: () => void,
        badge?: number,
    ) => (
        <Button
            key={label}
            onClick={action}
            justifyContent="flex-start"
            variant="ghost"
            w="full"
            color={selected ? "white" : "whiteAlpha.800"}
            bg={selected ? "whiteAlpha.200" : "transparent"}
            _hover={{ bg: "whiteAlpha.200", color: "white" }}
            leftIcon={<Icon as={icon} boxSize={4} />}
            rightIcon={badge !== undefined ? undefined : undefined}
        >
            <Flex flex="1" align="center" justify="space-between">
                <Text>{label}</Text>
                {badge !== undefined && <Badge colorScheme="blue">{badge}</Badge>}
            </Flex>
        </Button>
    );

    return (
        <Flex
            as="aside"
            direction="column"
            w={{ base: "220px", xl: "250px" }}
            minH="100vh"
            bg="#022A41"
            color="white"
            p={4}
            flexShrink={0}
        >
            <HStack mb={10} px={2} spacing={3}>
                <Box
                    as="img"
                    src="/assets/kbzlife-symbol-mark.png"
                    alt="KBZ Life"
                    w="36px"
                    h="36px"
                    objectFit="contain"
                    onError={(event: React.SyntheticEvent<HTMLImageElement>) => {
                        event.currentTarget.style.display = "none";
                    }}
                />
                <Heading size="sm">KBZ Life</Heading>
            </HStack>

            <Text px={3} mb={2} fontSize="xs" color="whiteAlpha.600">
                ONBOARDING
            </Text>
            <VStack align="stretch" spacing={1}>
                {navButton("Candidates", LayoutGrid, activePage === "list", () => onNavigate("list"), candidateCount)}
                {navButton("Send an offer", Mail, false, () => onNavigate("list"))}
            </VStack>

            <Text px={3} mt={7} mb={2} fontSize="xs" color="whiteAlpha.600">
                REFERENCE
            </Text>
            {navButton("Candidate portal", FileText, false, () => {
                window.open("/candidate-portal.html", "_blank", "noopener,noreferrer");
            })}

            <Box flex="1" />
            <HStack borderTopWidth="1px" borderColor="whiteAlpha.300" pt={4} spacing={3}>
                <Avatar size="sm" name="Thandar Win" />
                <Box flex="1" minW={0}>
                    <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>Thandar Win</Text>
                    <Text fontSize="xs" color="whiteAlpha.700">HR Operations</Text>
                </Box>
                <Button
                    aria-label="Sign out"
                    title="Sign out"
                    variant="ghost"
                    size="sm"
                    color="white"
                    onClick={onSignOut}
                >
                    <Icon as={LogOut} boxSize={4} />
                </Button>
            </HStack>
        </Flex>
    );
}
