import { Button, Flex, Input, Select } from "@chakra-ui/react";
import { CANDIDATE_STATUSES, DEPARTMENTS } from "./types/candidates.types";


export interface CandidateFilterValues {
    status: string;
    department: string;
    dateField: "startDate" | "submittedOn";
    from: string;
    to: string;
}

interface CandidateFiltersProps {
    value: CandidateFilterValues;
    onChange: (value: CandidateFilterValues) => void;
    onClear: () => void;
}

export function CandidateFilters({ value, onChange, onClear }: CandidateFiltersProps) {
    const update = (patch: Partial<CandidateFilterValues>) =>
        onChange({ ...value, ...patch });

    return (
        <Flex gap={3} wrap="wrap" align="center">
            <Select
                aria-label="Filter by status"
                size="sm"
                maxW="190px"
                value={value.status}
                onChange={(e) => update({ status: e.target.value })}
            >
                <option value="">All statuses</option>
                {CANDIDATE_STATUSES.map((status) => <option key={status}>{status}</option>)}
            </Select>

            <Select
                aria-label="Filter by department"
                size="sm"
                maxW="190px"
                value={value.department}
                onChange={(e) => update({ department: e.target.value })}
            >
                <option value="">All departments</option>
                {DEPARTMENTS.map((department) => <option key={department}>{department}</option>)}
            </Select>

            <Select
                aria-label="Date field to filter"
                size="sm"
                maxW="160px"
                value={value.dateField}
                onChange={(e) => update({ dateField: e.target.value as CandidateFilterValues["dateField"] })}
            >
                <option value="startDate">Start date</option>
                <option value="submittedOn">Submitted date</option>
            </Select>

            <Input
                aria-label="From date"
                type="date"
                size="sm"
                maxW="150px"
                value={value.from}
                onChange={(e) => update({ from: e.target.value })}
            />
            <Input
                aria-label="To date"
                type="date"
                size="sm"
                maxW="150px"
                value={value.to}
                onChange={(e) => update({ to: e.target.value })}
            />
            <Button size="sm" variant="ghost" onClick={onClear}>Clear</Button>
        </Flex>
    );
}
