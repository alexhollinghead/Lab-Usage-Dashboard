import { useEffect, useState } from 'react';
import { 
    Accordion, Alert, Container, Grid, SimpleGrid, Skeleton, Space } from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons';

import DailyAverage from './DailyAverage';
import MonthlyTrend from './MonthlyTrend';

export default function AppTable({software}) {
    const [loading, setLoading] = useState(true);

    let apps = Object.keys(software)
    const rows = apps.map((app) => (
        <Accordion.Item value={app}>
          <Accordion.Control>
                <Grid>
                    <Grid.Col span={4}>{app}</Grid.Col>
                    <Grid.Col span={4}>{software[app]}</Grid.Col>
                </Grid>
            </Accordion.Control>
            <Accordion.Panel>
                <Grid>
                <Grid.Col span={6}>
                    <DailyAverage />
                    </Grid.Col>
                    <Grid.Col span={12}>
                    <MonthlyTrend />
                    </Grid.Col>
                </Grid>
            </Accordion.Panel>
        </Accordion.Item>

      ));

    useEffect(() => {
        if(apps.length !== 0){
            setLoading(false)
        }}, [apps])

    const alert = 
        (<Alert icon={<IconAlertCircle size={16} />} title="Data not found!" 
        color="red">
         There is no usage data for your selected date range. 
         Please choose another range.
        </Alert>)
  
    return (
        <Container>
            <Space h="xl" />
            <Skeleton visible={loading}> 
                {apps.length !== 0 ? 
                    <>
                    <Grid columns={21}>
                        <Grid.Col span={7}>Application</Grid.Col>
                        <Grid.Col span={6}>Uses</Grid.Col>
                        <Grid.Col span={7}>Busiest Month</Grid.Col>
                        <Grid.Col span={1}></Grid.Col>
                    </Grid>
                    <Accordion>
                        {rows} 
                    </Accordion> 
                    </>
                : alert}
            </Skeleton>
        </Container>
      )
    }