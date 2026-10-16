import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { OfferFormValues } from "../candidates/types/candidates.types";
import { OfferForm } from "./offer_form";


interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OfferFormValues) => void;
}

export function OfferModal({ isOpen, onClose, onSubmit }: OfferModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Send an offer</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <OfferForm onSubmit={onSubmit} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
