import { Badge, Box, Button, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { Candidate, DecisionValues } from "./types/candidates.types";
import { ApplicationTimeline } from "./application_timeline";
import { DecisionPanel } from "./decision_panel";
// import type { Candidate, DecisionValues } from "../../types/candidate";
// import { DecisionPanel } from "./DecisionPanel";
// import { ApplicationTimeline } from "./ApplicationTimeline";

interface CandidateReviewPageProps {
    candidate: Candidate;
    onBack: () => void;
    onDecision: (values: DecisionValues) => void;
}

export function CandidateReviewPage({ candidate, onBack, onDecision }: CandidateReviewPageProps) {
    const timeline = [
        { title: "Offer sent", date: "", completed: true },
        { title: "Application submitted", date: candidate.submittedOn, completed: Boolean(candidate.submittedOn) },
        { title: "HR decision", completed: ["Approved", "Needs Correction", "Provisioning", "Day-1 Ready"].includes(candidate.status) },
        { title: "IT provisioning", completed: candidate.status === "Day-1 Ready" },
    ];

    return (
        <Box p={{ base: 4, md: 7 }}>
            <Button variant="ghost" leftIcon={<ArrowLeft size={16} />} onClick={onBack} mb={4}>
                All candidates
            </Button>

            <Text fontSize="xs" color="blue.600" fontWeight="bold" letterSpacing="wider">
                SUBMITTED APPLICATION
            </Text>
            <Heading size="lg" mt={2}>{candidate.name}</Heading>
            <Text color="gray.600" mt={1} mb={5}>
                {candidate.id} · {candidate.position} · {candidate.department}
            </Text>
            <Badge mb={6}>{candidate.status}</Badge>

            <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={5} alignItems="start">
                <VStack align="stretch" spacing={5}>
                    <Box bg="white" borderWidth="1px" borderRadius="lg" p={5}>
                        <Heading size="md" mb={4}>Candidate information</Heading>
                        <VStack align="stretch" spacing={3}>
                            {[
                                ["Email", candidate.email],
                                ["Phone", candidate.phone],
                                ["Department", candidate.department],
                                ["Position", candidate.position],
                                ["Reporting manager", candidate.manager],
                                ["Employment type", candidate.employmentType],
                                ["Start date", candidate.startDate],
                                ["Offer reference", candidate.offerReference || "—"],
                            ].map(([label, value]) => (
                                <Box key={label}>
                                    <Text fontSize="xs" color="gray.500">{label}</Text>
                                    <Text>{value || "—"}</Text>
                                </Box>
                            ))}
                        </VStack>
                    </Box>

                    <Box bg="white" borderWidth="1px" borderRadius="lg" p={5}>
                        <Heading size="md" mb={4}>Application progress</Heading>
                        <ApplicationTimeline items={timeline} />
                    </Box>
                </VStack>

                <Box bg="white" borderWidth="1px" borderRadius="lg" p={5}>
                    <DecisionPanel candidate={candidate} onSubmit={onDecision} />
                </Box>
            </SimpleGrid>
        </Box>
    );
}
