import { useState, useEffect } from 'react';
import { Card, Text, ThemeIcon } from '@mantine/core'
import { IconUser } from '@tabler/icons';

function UniqueUsers({ date }) {
    const [uniqueUsers, setUniqueUsers] = useState();

    useEffect(() => {
        if (date[0] && date[1]) {
            let dateStart = Math.floor(date[0].getTime() / 1000)
            let dateEnd = Math.floor(date[1].getTime() / 1000)
            fetch(
                'http://127.0.0.1:5000/usage?' + new URLSearchParams([
                    ['type', 'unique_users'],
                    ['start', dateStart],
                    ['end', dateEnd]
                ])
            )
                .then((response) => response.json())
                .then((data) => {
                    setUniqueUsers(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

    }, [date]);

    return (
        <Card shadow='None' p='lg' c='white' withBorder radius='md'
            sx={(theme) => ({
                backgroundImage: theme.fn.gradient({
                    from: 'blue.5', to: 'blue.3',
                    deg: 90
                }),
            })}>
            <ThemeIcon color='blue.9' size='xl' mb='xs'>
                <IconUser strokeWidth={2} />
            </ThemeIcon>
            <Text size='2.2rem'>
                {uniqueUsers}
            </Text>
            <Text tt='uppercase' fz='sm' fw={500} mt='md'>Unique Users</Text>
        </Card>
    );
}

export default UniqueUsers;