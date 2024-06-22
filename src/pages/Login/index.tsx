import {
    // Anchor,
    Paper,
    Title,
    // Text,
    Container,
} from '@mantine/core';
import classes from './index.module.css';
import LoginForm from '../../features/authentication/components/LoginForm';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const {t} = useTranslation('root')
    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title} size={'h2'}>
                {t("login.title")}
            </Title>
            {/* <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text> */}

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <LoginForm />
            </Paper>
        </Container>
    );
}