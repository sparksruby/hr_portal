import { useMemo, useState } from "react";
import {
    Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, Text,
} from "@chakra-ui/react";
import { CandidateFilterValues, CandidateFilters } from "./candidate_filters";
import { CandidateTable } from "./candidate_table";
import { Candidate } from "./types/candidates.types";
// import type { Candidate } from "../../types/candidate";
// import { CandidateFilters, type CandidateFilterValues } from "./CandidateFilters";
// import { CandidateTable } from "./CandidateTable";

interface CandidateListPageProps {
    candidates: Candidate[];
    search: string;
    onOpenCandidate: (candidate: Candidate) => void;
}

const initialFilters: CandidateFilterValues = {
    status: "",
    department: "",
    dateField: "startDate",
    from: "",
    to: "",
};

export function CandidateListPage({
    candidates,
    search,
    onOpenCandidate,
}: CandidateListPageProps) {
    const [filters, setFilters] = useState(initialFilters);

    const filteredCandidates = useMemo(() => {
        const query = search.trim().toLowerCase();

        return candidates.filter((candidate) => {
            const matchesSearch = !query || [
                candidate.name,
                candidate.id,
                candidate.position,
            ].some((item) => item.toLowerCase().includes(query));

            const matchesStatus = !filters.status || candidate.status === filters.status;
            const matchesDepartment = !filters.department || candidate.department === filters.department;
            const date = filters.dateField === "startDate"
                ? candidate.startDate
                : candidate.submittedOn || "";
            const matchesFrom = !filters.from || (date !== "" && date >= filters.from);
            const matchesTo = !filters.to || (date !== "" && date <= filters.to);

            return matchesSearch && matchesStatus && matchesDepartment && matchesFrom && matchesTo;
        });
    }, [candidates, filters, search]);

    const countStatus = (status: string) =>
        candidates.filter((candidate) => candidate.status === status).length;

    return (
        <Box p={{ base: 4, md: 7 }}>
            <Text fontSize="xs" color="blue.600" fontWeight="bold" letterSpacing="wider">
                ONBOARDING PIPELINE
            </Text>
            <Heading size="lg" mt={2}>Candidates</Heading>
            <Text color="gray.600" mt={2} mb={6}>
                Every candidate who has been sent an offer. Open a row to review their application.
            </Text>

            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={6}>
                {[
                    { label: "Total candidates", value: candidates.length },
                    { label: "Invited", value: countStatus("Invited") },
                    { label: "Submitted", value: countStatus("Submitted") },
                    { label: "Needs correction", value: countStatus("Needs Correction") },
                ].map((item) => (
                    <Stat key={item.label} bg="white" p={4} borderRadius="lg" borderWidth="1px">
                        <StatLabel color="gray.500">{item.label}</StatLabel>
                        <StatNumber>{item.value}</StatNumber>
                    </Stat>
                ))}
            </SimpleGrid>

            <Box bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="lg" overflow="hidden">
                <Box p={4} borderBottomWidth="1px">
                    <Heading size="sm" mb={4}>Pipeline ({filteredCandidates.length})</Heading>
                    <CandidateFilters
                        value={filters}
                        onChange={setFilters}
                        onClear={() => setFilters(initialFilters)}
                    />
                </Box>
                <CandidateTable candidates={filteredCandidates} onSelect={onOpenCandidate} />
            </Box>
        </Box>
    );
}
