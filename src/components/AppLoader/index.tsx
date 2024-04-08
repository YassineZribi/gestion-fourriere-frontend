import { Loader } from '@mantine/core';
import classes from './index.module.css';

export default function AppLoader() {
    return (
        <div className={classes.container}>
            <Loader color="blue" size="lg" type="dots" />
        </div>
    )
}