import { useState, useEffect } from 'react';
import { Card, Text, ThemeIcon } from '@mantine/core'
import { IconUser } from '@tabler/icons';

function UniqueUsers({ startDate, endDate }) {
    const [uniqueUsers, setUniqueUsers] = useState();
    console.log("Start date" + startDate)
    let dateStart = Math.floor(startDate.getTime() / 1000)
    let dateEnd = Math.floor(endDate.getTime() / 1000)

    useEffect(() => {
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
    });

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