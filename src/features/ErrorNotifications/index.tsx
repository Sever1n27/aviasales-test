import React from 'react';
import { $error, clearError } from '@core';
import { useStore } from 'effector-react';
import { fetchTickets } from '@core';
import { Button, Card } from '@ui';
import styles from './ErrorNotifications.module.scss';

export function ErrorNotifications() {
    const error: string = useStore($error);
    const hideDelay = 5000;
    const unmountDelay = hideDelay + 1000;
    const [visible, setVisible] = React.useState<boolean>(false);
    const [counter, setCounter] = React.useState<number>(unmountDelay / 1000);
    const timeoutRefVisible = React.useRef<number>();
    const timeoutRefMounted = React.useRef<number>();
    const intervalRefCounter = React.useRef<number>();

    const handleRefresh = () => {
        setVisible(false);
        fetchTickets();
    };

    const handleCounter = () => {
        setCounter((counter) => counter - 1);
    };

    React.useEffect(() => {
        if (error) {
            setVisible(true);
            timeoutRefVisible.current = window.setTimeout(() => setVisible(false), hideDelay);
            timeoutRefMounted.current = window.setTimeout(clearError, unmountDelay);
            intervalRefCounter.current = window.setInterval(handleCounter, 1000);
        }
        return () => {
            clearTimeout(timeoutRefVisible.current);
            clearTimeout(timeoutRefMounted.current);
            clearInterval(intervalRefCounter.current);
            setCounter(unmountDelay / 1000);
        };
    }, [error, unmountDelay, hideDelay]);

    return error ? (
        <div className={styles.wrapper}>
            <Card>
                <span className={styles.text}>{error}</span>
                <span className={styles.text}>Упс, что-то пошло не так!</span>
                <span className={styles.text}>Попробуем еще раз через {counter} сек.</span>
                <span className={styles.text}>Или обновите вручную</span>
                <Button onClick={handleRefresh}>Обновить</Button>
            </Card>
        </div>
    ) : null;
}
