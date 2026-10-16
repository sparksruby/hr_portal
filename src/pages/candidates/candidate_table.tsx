import {
    Badge, Box, Progress, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text,
} from "@chakra-ui/react";
import { Candidate, CandidateStatus } from "./types/candidates.types";


interface CandidateTableProps {
    candidates: Candidate[];
    onSelect: (candidate: Candidate) => void;
}

const statusColor: Record<CandidateStatus, string> = {
    Invited: "blue",
    Draft: "gray",
    Submitted: "purple",
    "Needs Correction": "orange",
    Approved: "green",
    Provisioning: "cyan",
    "Day-1 Ready": "green",
};

export function CandidateTable({ candidates, onSelect }: CandidateTableProps) {
    if (candidates.length === 0) {
        return (
            <Box p={10} textAlign="center">
                <Text color="gray.500">No candidate matches these filters.</Text>
            </Box>
        );
    }

    return (
        <TableContainer>
            <Table size="sm" variant="simple">
                <Thead bg="gray.50">
                    <Tr>
                        <Th>Candidate</Th>
                        <Th>Candidate ID</Th>
                        <Th>Department</Th>
                        <Th>Status</Th>
                        <Th minW="130px">Completion</Th>
                        <Th>Submitted on</Th>
                        <Th>Start date</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {candidates.map((candidate) => (
                        <Tr
                            key={candidate.id}
                            cursor="pointer"
                            _hover={{ bg: "blue.50" }}
                            onClick={() => onSelect(candidate)}
                        >
                            <Td fontWeight="semibold">{candidate.name}</Td>
                            <Td>{candidate.id}</Td>
                            <Td>{candidate.department}</Td>
                            <Td>
                                <Badge colorScheme={statusColor[candidate.status]}>
                                    {candidate.status}
                                </Badge>
                            </Td>
                            <Td>
                                <Text fontSize="xs" mb={1}>{candidate.completion}%</Text>
                                <Progress value={candidate.completion} size="xs" colorScheme="blue" borderRadius="full" />
                            </Td>
                            <Td>{candidate.submittedOn || "—"}</Td>
                            <Td>{candidate.startDate || "—"}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
