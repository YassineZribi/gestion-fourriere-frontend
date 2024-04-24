
import { Box, Center, Loader } from '@mantine/core';
import SaveInstitutionForm from './SaveInstitutionForm';
import useHandleInstitution from '../hooks/useHandleInstitution';

export default function InstitionInformation() {
    const { institution, updateInstitution, isFetching, error, isNotFoundError } = useHandleInstitution()

    console.log(isNotFoundError);
    

    return (
        <Box maw={600} mx="auto">
            {!isNotFoundError && <p>{error}</p>}
            {
                isFetching
                    ? <Center mt={"xl"}><Loader size={50} /></Center>
                    : (
                        <SaveInstitutionForm
                            institution={institution}
                            onSaveInstitution={updateInstitution}
                        />
                    )
            }

        </Box>
    );
}