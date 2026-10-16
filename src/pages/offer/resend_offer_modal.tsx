import { useState, type FormEvent } from "react";
import {
    Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Textarea,
} from "@chakra-ui/react";

export interface ResendOfferValues {
    email: string;
    expiryDays: number;
    message: string;
    files: File[];
}

interface ResendOfferModalProps {
    isOpen: boolean;
    candidateName: string;
    currentEmail: string;
    onClose: () => void;
    onSubmit: (values: ResendOfferValues) => void;
}

export function ResendOfferModal({
    isOpen, candidateName, currentEmail, onClose, onSubmit,
}: ResendOfferModalProps) {
    const [email, setEmail] = useState(currentEmail);
    const [expiryDays, setExpiryDays] = useState(3);
    const [message, setMessage] = useState("");
    const [files, setFiles] = useState<File[]>([]);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ email, expiryDays, message, files });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={submit}>
                    <ModalHeader>Resend offer link</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <p>A new link will be emailed to {candidateName}. The previous link should be invalidated by the backend.</p>
                            <FormControl isRequired>
                                <FormLabel>Send to</FormLabel>
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Link valid for</FormLabel>
                                <Select value={expiryDays} onChange={(e) => setExpiryDays(Number(e.target.value))}>
                                    <option value={3}>3 days</option>
                                    <option value={7}>7 days</option>
                                    <option value={14}>14 days</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Message to the candidate</FormLabel>
                                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your earlier link has expired. Here is a new one..." />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Replacement attachments</FormLabel>
                                <Input type="file" multiple p={1} onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter gap={2}>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" colorScheme="blue">Resend link</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}
