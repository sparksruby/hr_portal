import { useState, type FormEvent } from "react";
import {
    Button, FormControl, FormLabel, Input, Select, SimpleGrid, Stack,
} from "@chakra-ui/react";
import { DEPARTMENTS, OfferFormValues } from "../candidates/types/candidates.types";


interface OfferFormProps {
    onSubmit: (values: OfferFormValues) => void;
    onCancel: () => void;
}

const initialValues: OfferFormValues = {
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    manager: "",
    employmentType: "",
    startDate: "",
    offerReference: "",
    files: [],
};

export function OfferForm({ onSubmit, onCancel }: OfferFormProps) {
    const [values, setValues] = useState<OfferFormValues>(initialValues);
    const update = <K extends keyof OfferFormValues>(key: K, value: OfferFormValues[K]) =>
        setValues((current) => ({ ...current, [key]: value }));

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Candidate full name</FormLabel>
                        <Input value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Su Su Hlaing" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Candidate personal email</FormLabel>
                        <Input type="email" value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="susu.hlaing@gmail.com" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Candidate phone number</FormLabel>
                        <Input value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="09 795 123 456" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Position / job title</FormLabel>
                        <Input value={values.position} onChange={(e) => update("position", e.target.value)} placeholder="Bancassurance Sales Executive" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Department / channel</FormLabel>
                        <Select value={values.department} onChange={(e) => update("department", e.target.value as OfferFormValues["department"])} placeholder="Select">
                            {DEPARTMENTS.map((department) => <option key={department}>{department}</option>)}
                        </Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Reporting manager</FormLabel>
                        <Input value={values.manager} onChange={(e) => update("manager", e.target.value)} placeholder="Daw Thandar Win" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Employment type</FormLabel>
                        <Select value={values.employmentType} onChange={(e) => update("employmentType", e.target.value as OfferFormValues["employmentType"])} placeholder="Select">
                            <option>Permanent</option>
                            <option>Contract</option>
                            <option>Probation</option>
                        </Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Start date</FormLabel>
                        <Input type="date" value={values.startDate} onChange={(e) => update("startDate", e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Offer reference number</FormLabel>
                        <Input value={values.offerReference} onChange={(e) => update("offerReference", e.target.value)} placeholder="OFR-2026-0456" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Offer email attachments</FormLabel>
                        <Input type="file" multiple p={1} onChange={(e) => update("files", Array.from(e.target.files ?? []))} />
                    </FormControl>
                </SimpleGrid>

                <Stack direction="row" justify="flex-end">
                    <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" colorScheme="blue">Send offer and invite</Button>
                </Stack>
            </Stack>
        </form>
    );
}
