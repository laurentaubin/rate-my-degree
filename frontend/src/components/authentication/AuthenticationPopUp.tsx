import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { GoogleLogin } from "components/authentication/GoogleLogin";
import React from "react";

interface AuthenticationPopUpProps {
  isOpen: boolean;
  onClose: any;
}

export const AuthenticationPopUp: React.FC<AuthenticationPopUpProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Erreur d'authentification</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg">Vous devez être authentifié pour effectuer cette action.</Text>
        </ModalBody>

        <ModalFooter>
          <GoogleLogin backgroundColor="black" color="white" _hover={{}} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
