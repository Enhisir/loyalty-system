import { ReactNode } from 'react';
import classes from './error.module.css';

export default function Error({ children }: {children: ReactNode }) {
    return <h1 className={classes.notFound}>{children}</h1>;
}