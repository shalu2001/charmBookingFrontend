import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image
} from "@heroui/react";

interface ModalComponentProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ images, isOpen, onClose }) => {
  return (
    <Modal
      backdrop="opaque"
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
      isOpen={isOpen}
      onOpenChange={onClose}
    >
      <ModalContent className="w-auto max-w-6xl h-auto max-h-[95vh]">
        <ModalHeader className="flex flex-row p-6">All Images</ModalHeader>
        <ModalBody className="overflow-y-auto h-[70vh] pb-6">
          <div className="grid grid-flow-row gap-5">
            {images.map((image, index) => (
              <div key={index} className="w-96 h-relative">
                <Image src={image} alt={`Salon ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;