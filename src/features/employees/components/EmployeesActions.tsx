import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../components/ConfirmationModal";
import UpsertEmployeeModal from "./UpsertEmployeeModal";
import InfoDetailsModal from "../../../components/InfoDetailsModal";
import EmployeeDetails from "./EmployeeDetails";
import TRowActions from "../../../components/DataTable/TRowActions";
import useModal from "../../../hooks/useModal";
import employeesService from "../services"
import { wait } from "../../../utils/helpers";
import { alertSuccess } from "../../../utils/feedback";
import Employee from "../../../types/Employee";
import { useTranslation } from "react-i18next";

interface Props {
    selectedEmployee: Employee
    onUpdateEmployee: () => void
    onDeleteEmployee: () => void
}

export default function EmployeesActions({ selectedEmployee, onDeleteEmployee, onUpdateEmployee }: Props) {
    const {t} = useTranslation()

    const [isUpdateEmployeeModalOpen, {open: openUpdateEmployeeModal, close: closeUpdateEmployeeModal}] = useModal()

    const [isEmployeeDetailsModalOpen, {open: openEmployeeDetailsModal, close: closeEmployeeDetailsModal}] = useModal()

    const [isConfirmationModalOpen, {open: openConfirmationModal, close: closeConfirmationModal}] = useModal()
    const [isDeletingEmployeeLoading, setDeletingEmployeeLoading] = useState(false)

    const confirmDeletingEmployee = async () => {
        setDeletingEmployeeLoading(true)
        try {
            await wait(2000)
            await employeesService.deleteEmployee(selectedEmployee.id)
            alertSuccess("Employee deleted successfully!")
            onDeleteEmployee()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingEmployeeLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                onShowDetailsBtnClick={openEmployeeDetailsModal}
                onUpdateBtnClick={openUpdateEmployeeModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isEmployeeDetailsModalOpen}
                onClose={closeEmployeeDetailsModal}
            >
                <EmployeeDetails
                    employee={selectedEmployee}
                />
            </InfoDetailsModal>

            <UpsertEmployeeModal
                title={t("components.upsertEmployeeModal.title.onUpdate")}
                isOpened={isUpdateEmployeeModalOpen}
                selectedEmployee={selectedEmployee}
                onClose={closeUpdateEmployeeModal}
                onSubmit={onUpdateEmployee}
            />

            <ConfirmationModal
                isLoading={isDeletingEmployeeLoading}
                isOpened={isConfirmationModalOpen}
                onCancel={closeConfirmationModal}
                onConfirm={confirmDeletingEmployee}
            >
                <Text size="md" fw={"bold"}>
                    {t("components.employeesActions.confirmationModal.message")}
                </Text>
            </ConfirmationModal>
        </>
    )
}