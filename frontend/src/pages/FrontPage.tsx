import {
    Card,
    Grid,
    Group,
    Text,
} from '@mantine/core';
import { IconClockHour4, IconCalendarTime } from '@tabler/icons';
import DailyAverage from '../components/DailyAverage'
import MonthlyTrend from '../components/MonthlyTrend'
import UniqueUsers from '../components/UniqueUsers';
import PopularSoftware from '../components/PopularSoftware';
import MostUsedProgram from '../components/MostUsedProgram';


function FrontPage({date}) {

    return (
        <Grid gutter='xl'>
            <Grid.Col xs={12} lg={8}>
                <Grid gutter='lg'>
                    <Grid.Col xs={12} md={6}>
                        <UniqueUsers date={date} />
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

export default FrontPage;
