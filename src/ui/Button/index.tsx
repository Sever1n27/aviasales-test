import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type ButtonProps = {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    active?: boolean;
};

export function Button(props: ButtonProps) {
    const { children, type = 'button', onClick, disabled, active } = props;
    const className = clsx(styles.button, active && 'active');
    return (
        <button type={type} className={className} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}
