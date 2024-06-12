
import { Center, Loader, Space } from '@mantine/core';
import Title from '../../components/Title';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useFetchInput from '../../features/operations/inputs/hooks/useFetchInput';
import InsertOutputForm from '../../features/operations/outputs/components/InsertOutputForm';

export default function InsertOutput() {
    let [searchParams] = useSearchParams();
    const inputId  = searchParams.get('inputId')
    const { input, isLoading, error } = useFetchInput(inputId || 0) // 0 to ensure fetching data
    const { t: tRoot } = useTranslation("root")


    return (
        <div>
            <Title>{tRoot('insertOutput.title')}</Title>
            <Space my={'xl'} />
            {
                (isLoading || (!input && !error && inputId))
                    ? <Center><Loader size={50} /></Center>
                    : (error || !input)
                        ? <p>{error}</p>
                        : <InsertOutputForm input={input} />
            }
        </div>
    );
}