import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

interface NotificationProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  content: string;
  redirect: string;
  error: boolean;
}

const NotificationComp = ({
  isOpen,
  onOpenChange,
  title,
  content,
  redirect,
  error,
}: NotificationProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>{content}</p>
            </ModalBody>
            <ModalFooter>
              <Button as={Link} href="/addblogs">
                Close
              </Button>
              <Button
                as={Link}
                href={redirect}
                color={error ? "danger" : "secondary"}
              >
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default NotificationComp;
