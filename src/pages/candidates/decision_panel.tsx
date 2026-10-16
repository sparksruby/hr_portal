import { useState, type FormEvent } from "react";
import {
    Button, Checkbox, FormControl, FormLabel, Heading, Input, Radio, RadioGroup,
    SimpleGrid, Stack, Text, Textarea, VStack,
} from "@chakra-ui/react";
import { Candidate, DecisionValues } from "./types/candidates.types";


interface DecisionPanelProps {
    candidate: Candidate;
    onSubmit: (values: DecisionValues) => void;
}

const softwareOptions = ["Microsoft Office", "VPN", "CRM", "Insurance system"];

export function DecisionPanel({ candidate, onSubmit }: DecisionPanelProps) {
    const [decision, setDecision] = useState<DecisionValues["decision"]>("Approve");
    const [notes, setNotes] = useState("");
    const [joinDate, setJoinDate] = useState(candidate.startDate || "");
    const [createEmail, setCreateEmail] = useState(false);
    const [prepareLaptop, setPrepareLaptop] = useState(false);
    const [software, setSoftware] = useState<string[]>([]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (decision === "Approve" && !joinDate) return;

        onSubmit({ decision, notes, joinDate, createEmail, prepareLaptop, software });
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack align="stretch" spacing={5}>
                <Heading size="md">Decision</Heading>
                <Text fontSize="sm" color="gray.600">
                    Approving moves the candidate to provisioning. Returning sends your notes back to their portal.
                </Text>

                <RadioGroup value={decision} onChange={(value) => setDecision(value as DecisionValues["decision"])}>
                    <Stack spacing={3}>
                        <Radio value="Approve">
                            <Text fontWeight="medium">Approve</Text>
                            <Text fontSize="sm" color="gray.500">Data verified, documents complete.</Text>
                        </Radio>
                        <Radio value="Return for modification">
                            <Text fontWeight="medium">Return for modification</Text>
                            <Text fontSize="sm" color="gray.500">Candidate can edit and resubmit.</Text>
                        </Radio>
                    </Stack>
                </RadioGroup>

                <FormControl>
                    <FormLabel>Verification / return notes</FormLabel>
                    <Textarea
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        placeholder="Please re-upload a clearer document."
                    />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                        Notes are especially important when returning an application.
                    </Text>
                </FormControl>

                {decision === "Approve" && (
                    <FormControl isRequired>
                        <FormLabel>Join date</FormLabel>
                        <Input type="date" value={joinDate} onChange={(event) => setJoinDate(event.target.value)} />
                    </FormControl>
                )}

                <Heading size="sm">Day-1 provisioning</Heading>
                <Checkbox isChecked={createEmail} onChange={(e) => setCreateEmail(e.target.checked)}>
                    <Text fontWeight="medium">Create email account</Text>
                    <Text fontSize="sm" color="gray.500">firstname.lastname@kbzlife.com</Text>
                </Checkbox>
                <Checkbox isChecked={prepareLaptop} onChange={(e) => setPrepareLaptop(e.target.checked)}>
                    <Text fontWeight="medium">Prepare laptop</Text>
                    <Text fontSize="sm" color="gray.500">Raises an IT asset request.</Text>
                </Checkbox>

                {prepareLaptop && (
                    <FormControl>
                        <FormLabel>Required software</FormLabel>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                            {softwareOptions.map((item) => (
                                <Checkbox
                                    key={item}
                                    isChecked={software.includes(item)}
                                    onChange={(e) => setSoftware((current) =>
                                        e.target.checked
                                            ? [...current, item]
                                            : current.filter((value) => value !== item)
                                    )}
                                >
                                    {item}
                                </Checkbox>
                            ))}
                        </SimpleGrid>
                    </FormControl>
                )}

                <Button type="submit" colorScheme="blue" alignSelf="flex-end">
                    Record decision
                </Button>
            </VStack>
        </form>
    );
}
