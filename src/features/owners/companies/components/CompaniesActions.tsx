import { useState } from "react";
import { Text } from "@mantine/core";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import UpsertCompanyModal from "./UpsertCompanyModal";
import InfoDetailsModal from "../../../../components/InfoDetailsModal";
import CompanyDetails from "./CompanyDetails";
import TRowActions from "../../../../components/DataTable/TRowActions";
import useModal from "../../../../hooks/useModal";
import companiesService from "../services"
import { wait } from "../../../../utils/helpers";
import { alertSuccess } from "../../../../utils/feedback";
import { useTranslation } from "react-i18next";
import Company from "../../../../types/Company";

interface Props {
    selectedCompany: Company
    hideUpdateBtn?: boolean
    hideDeleteBtn?: boolean
    onUpdateCompany: () => void
    onDeleteCompany: () => void
}

export default function CompaniesActions({ selectedCompany, hideUpdateBtn, hideDeleteBtn, onDeleteCompany, onUpdateCompany }: Props) {
    const { t } = useTranslation()

    const [isUpdateCompanyModalOpen, { open: openUpdateCompanyModal, close: closeUpdateCompanyModal }] = useModal()

    const [isCompanyDetailsModalOpen, { open: openCompanyDetailsModal, close: closeCompanyDetailsModal }] = useModal()

    const [isConfirmationModalOpen, { open: openConfirmationModal, close: closeConfirmationModal }] = useModal()
    const [isDeletingCompanyLoading, setDeletingCompanyLoading] = useState(false)

    const confirmDeletingCompany = async () => {
        setDeletingCompanyLoading(true)
        try {
            await wait(2000)
            await companiesService.deleteCompany(selectedCompany.id)
            alertSuccess("Company deleted successfully!")
            onDeleteCompany()
        } catch (error) {
            console.log(error);
        } finally {
            closeConfirmationModal()
            setDeletingCompanyLoading(false)
        }
    }

    return (
        <>
            <TRowActions
                hideUpdateBtn={hideUpdateBtn}
                hideDeleteBtn={hideDeleteBtn}
                onShowDetailsBtnClick={openCompanyDetailsModal}
                onUpdateBtnClick={openUpdateCompanyModal}
                onConfirmBtnClick={openConfirmationModal}
            />

            <InfoDetailsModal
                isOpened={isCompanyDetailsModalOpen}
                onClose={closeCompanyDetailsModal}
            >
                <CompanyDetails
                    company={selectedCompany}
                />
            </InfoDetailsModal>

            {
                !hideUpdateBtn && (
                    <UpsertCompanyModal
                        title={t("components.upsertCompanyModal.title.onUpdate")}
                        isOpened={isUpdateCompanyModalOpen}
                        selectedCompany={selectedCompany}
                        onClose={closeUpdateCompanyModal}
                        onSubmit={onUpdateCompany}
                    />
                )
            }

            {
                !hideDeleteBtn && (
                    <ConfirmationModal
                        isLoading={isDeletingCompanyLoading}
                        isOpened={isConfirmationModalOpen}
                        onCancel={closeConfirmationModal}
                        onConfirm={confirmDeletingCompany}
                    >
                        <Text size="md" fw={"bold"}>
                            {t("components.companiesActions.confirmationModal.message")}
                        </Text>
                    </ConfirmationModal>
                )
            }

        </>
    )
}