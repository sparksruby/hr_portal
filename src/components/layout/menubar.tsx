import {
    Button, Flex, Heading, Input, InputGroup, InputLeftElement,
} from "@chakra-ui/react";
import { Plus, Search } from "lucide-react";

interface TopbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onNewOffer: () => void;
}

export function Topbar({ search, onSearchChange, onNewOffer }: TopbarProps) {
    return (
        <Flex
            as="header"
            align="center"
            gap={4}
            px={{ base: 4, md: 7 }}
            py={4}
            bg="white"
            borderBottomWidth="1px"
            borderColor="gray.200"
            flexWrap="wrap"
        >
            <Heading size="sm" color="gray.700">Onboarding / Candidates</Heading>
            <Flex flex="1" />
            <InputGroup maxW="320px" size="sm">
                <InputLeftElement pointerEvents="none">
                    <Search size={16} />
                </InputLeftElement>
                <Input
                    aria-label="Search candidates"
                    placeholder="Search name, ID or position"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
            </InputGroup>
            <Button colorScheme="blue" size="sm" leftIcon={<Plus size={16} />} onClick={onNewOffer}>
                Send an offer
            </Button>
        </Flex>
    );
}
