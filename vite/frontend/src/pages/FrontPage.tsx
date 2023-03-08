import { useState } from 'react';
import {
    Card,
    Grid,
    Group,
    Text,
    Title,
} from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { IconClockHour4, IconCalendarTime } from '@tabler/icons';
import DailyAverage from '../components/DailyAverage'
import MonthlyTrend from '../components/MonthlyTrend'
import UniqueUsers from '../components/UniqueUsers';
import PopularSoftware from '../components/PopularSoftware';
import MostUsedProgram from '../components/MostUsedProgram';


function App() {
    const [value, setValue] = useState<[Date, Date]>([
        new Date(2021, 5, 1),
        new Date(2022, 11, 31)
    ]);

    let start = value[0] ? value[0].toLocaleDateString("en-US") : ``
    let end = value[1] ? value[1].toLocaleDateString("en-US") : ``


    return (
        <Grid gutter='xl'>
            <Grid.Col xs={12} lg={8}>
                <Title order={1}>DLL Usage Stats: {start} - {end}</Title>
            </Grid.Col>
            <Grid.Col xs={12} lg={4} p='sm'>
                <DateRangePicker
                    pb='xl'
                    placeholder='Pick date range'
                    value={value}
                    onChange={setValue}
                    firstDayOfWeek="sunday"
                />
            </Grid.Col>
            <Grid.Col xs={12} lg={8}>
                <Grid gutter='lg'>
                    <Grid.Col xs={12} md={6}>
                        <UniqueUsers date={value} />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <MostUsedProgram />
                    </Grid.Col>
                    <Grid.Col>
                        <MonthlyTrend />
                    </Grid.Col>
                </Grid>
            </Grid.Col>

            <Grid.Col xs={12} lg={4}>
                <Grid gutter='lg'>
                    <Grid.Col xs={12} sm={6} md={12}>
                        <Card shadow='None' p='md' withBorder radius='md'>
                            <Group>
                                <IconClockHour4 inline={true} size={48} strokeWidth={1} />
                                <div>
                                    <Text tt='uppercase' fz='xs' c='dark.2'>
                                        Avg Session Duration</Text>
                                    <Text fz='md' >
                                        2 hours
                                    </Text>
                                </div>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col xs={12} sm={6} md={12}>
                        <Card shadow='None' p='md' withBorder radius='md'>
                            <Group>
                                <IconCalendarTime size={48} strokeWidth={1} />
                                <div>
                                    <Text tt='uppercase' fz='xs' c='dark.2'>
                                        Busiest Time</Text>
                                    <Text fz='md'>
                                        Wed @ 7
                                    </Text>
                                </div>
                            </Group>
                        </Card>
                    </Grid.Col>
                    <Grid.Col>
                        <PopularSoftware />
                    </Grid.Col>
                    <Grid.Col>
                        <DailyAverage />
                    </Grid.Col>
                </Grid>
            </Grid.Col>
        </Grid>

    );
}

export default App;
