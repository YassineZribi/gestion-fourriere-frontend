import { useDisclosure } from "@mantine/hooks";

export default function useShowUserDetails() {

    const [isUserDetailsModalOpen, { open: openUserDetailsModal, close: closeUserDetailsModal }] = useDisclosure(false);

    return {
        isUserDetailsModalOpen,
        openUserDetailsModal,
        closeUserDetailsModal
    }
}