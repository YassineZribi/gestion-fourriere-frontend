
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import { useTranslation } from 'react-i18next';
import useFetchInput from '../../features/operations/inputs/hooks/useFetchInput';
import { useParams } from 'react-router-dom';
import UpsertInputForm from '../../features/operations/inputs/components/UpsertInputForm';

export default function UpsertInput() {
    const { id } = useParams()
    const { input, isLoading, error } = useFetchInput(id)
    const { t: tRoot } = useTranslation("root")


    return (
        <div>
            <Title>{tRoot(`upsertInput.title.${id ? 'onUpdate' : 'onInsert'}`)}</Title>
            <Space my={'xl'} />
            {
                (isLoading || (!input && !error && id))
                    ? <Center><Loader size={50} /></Center>
                    : error
                        ? <p>{error}</p>
                        : <UpsertInputForm selectedInput={input} />
            }
        </div>
    );
}