import './App.css';
import { useState, useEffect } from 'react';
import {
  AppShell,
  Burger,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Header,
  Image,
  MantineProvider,
  MediaQuery,
  Navbar,
  NavLink,
  Table,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { IconUser, IconClockHour4, IconAppWindow, IconCalendarTime } from '@tabler/icons';
import DailyAverage from './components/DailyAverage'
import MonthlyTrend from './components/MonthlyTrend'


function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [dateRange, setDateRange] = useState<DateRangePickerValue>([
    new Date(2021, 8, 1),
    new Date(2022, 12, 25)
  ]);
  const dates = dateRange.map((date) => (
    date.toLocaleDateString("en-US") + " - "
  ));

  /* TODO: Write function to fetch top 5 apps from backend */
  const elements = [
    { name: 'Adobe Premiere', users: '31', month: 'July 2022' },
    { name: 'Audacity', users: '17', month: 'November 2022' },
    { name: 'Adobe Audition', users: '14', month: 'November 2022' },
    { name: 'Photoshop', users: '11', month: 'October 2022' },
    { name: 'Rhino', users: '8', month: 'July 2022' }
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.users}</td>
      <td>{element.month}</td>
    </tr>
  ));

  const [uniqueUsers, setUniqueUsers] = useState();
  let dateStart = 1661990400;
  let dateEnd = 1672531200
  useEffect(() => {
    // fetch('http://127.0.0.1:5000/usage?type=unique_users&start=1661990400&end=1672531200')
    /** TODO: import moment.js and format the dates correctly for this query */
    fetch(
      'http://127.0.0.1:5000/usage?' + new URLSearchParams({
        type: 'unique_users',
        start: dateStart,
        end: dateEnd
      })
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUniqueUsers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        navbarOffsetBreakpoint='sm'
        asideOffsetBreakpoint='sm'
        layout='alt'
        styles={(theme) => ({
          main: { backgroundColor: theme.colors.gray[0] },
        })}
        navbar={
          <Navbar
            p='md'
            hiddenBreakpoint='sm'
            hidden={!opened}
            width={{ sm: 200, lg: 200 }}
            sx={(theme) => ({
              backgroundImage: theme.fn.gradient({ from: 'cyan', to: 'violet', deg: 190 }),
              color: theme.white,
            })
            } >
            <Navbar.Section>
              <Center>
                <Image src='dll-logo.png'
                  alt='Digital Learning Lab Logo' width='100px' />
              </Center>
            </Navbar.Section>
            <Navbar.Section grow mt='md'>
              <NavLink color='theme.white' label="Overview" icon={<IconCalendarTime size={24} stroke={2} />} />
              <NavLink color='blue.2' label="Software" icon={<IconCalendarTime size={24} stroke={2} />} />
              <NavLink color='blue.2' label="Computer Usage" icon={<IconCalendarTime size={24} stroke={2} />} />
              <NavLink color='blue.2' label="Upload Data" icon={<IconCalendarTime size={24} stroke={2} />} />
              <NavLink color='blue.2' label="Help" icon={<IconCalendarTime size={24} stroke={2} />} />
            </Navbar.Section>
            <Navbar.Section>
              Footer
            </Navbar.Section>
          </ Navbar>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p='md'>
            <Flex justify="flex-end">
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size='sm'
                  color={theme.colors.gray[6]}
                  mr='xl'
                />
              </MediaQuery>
              <Group position="center" pb="xl" px="md">
                <Button variant="default">Log Out</Button>
              </Group>
            </Flex>
          </Header>
        }
      >
        <Container size='xl' p='xl'>
          <Grid gutter='xl'>
            <Grid.Col xs={12} lg={8}>
              <Title order={1}>DLL Usage Stats: {dates}</Title>
            </Grid.Col>
            <Grid.Col xs={12} lg={4} p='sm'>
              <DateRangePicker
                pb='xl'
                placeholder='Pick date range'
                value={dateRange}
                onChange={setDateRange}
                firstDayOfWeek="sunday"
              />
            </Grid.Col>
            <Grid.Col xs={12} lg={8}>
              <Grid gutter='lg'>
                <Grid.Col xs={12} md={6}>
                  <Card shadow='None' p='lg' c='white' withBorder radius='md' sx={(theme) => ({
                    backgroundImage: theme.fn.gradient({ from: 'blue.5', to: 'blue.3', deg: 90 }),
                  })}>
                    <ThemeIcon color='blue.9' size='xl' mb='xs'>
                      <IconUser strokeWidth={2} />
                    </ThemeIcon>
                    <Text size='2.2rem'>
                      {uniqueUsers}
                    </Text>
                    <Text tt='uppercase' fz='sm' fw={500} mt='md'>Unique Users</Text>
                  </Card>
                </Grid.Col>

                <Grid.Col sm={12} md={6}>
                  <Card shadow='None' p='lg' c='white' withBorder radius='md' sx={(theme) => ({
                    backgroundImage: theme.fn.gradient({ from: 'blue.5', to: 'blue.3', deg: 90 }),
                  })}>
                    <ThemeIcon color='blue.9' size='xl' mb='xs'>
                      <IconAppWindow strokeWidth={2} />
                    </ThemeIcon>
                    <Text size='2.2rem'>
                      Adobe Premiere
                    </Text>
                    <Text tt='uppercase' fz='sm' fw={500} mt='md'>Most Popular Program</Text>

                  </Card>
                </Grid.Col>

                <Grid.Col>
                  <Card shadow='None' p='lg' withBorder radius='md'>
                    <Title order={2} mb='xl'>Users Per Month</Title>
                    <MonthlyTrend />
                  </Card>
                </Grid.Col>
              </Grid>
            </Grid.Col>

            <Grid.Col xs={12} lg={4}>
              <Grid gutter='lg'>
                <Grid.Col xs={12} sm={6} md={12}>
                  <Card shadow='None' p='md' withBorder radius='md'>
                    <Group>
                      <IconClockHour4 inline='True' size={48} strokeWidth={1} />
                      <div>
                        <Text tt='uppercase' fz='xs' c='dark.2'>Avg Session Duration</Text>
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
                        <Text tt='uppercase' fz='xs' c='dark.2'>Busiest Time</Text>
                        <Text fz='md'>
                          Wed @ 7
                        </Text>
                      </div>
                    </Group>
                  </Card>
                </Grid.Col>
                <Grid.Col>
                  <Card shadow='None' p='lg' withBorder radius='md'>
                    <Title order={2}>Popular Software</Title>
                    <Table striped highlightOnHover mt='xs'>
                      <thead>
                        <tr>
                          <th>Application</th>
                          <th>Users</th>
                          <th>Busiest Month</th>
                        </tr>
                      </thead>
                      <tbody>{rows}</tbody>
                    </Table>
                  </Card>
                </Grid.Col>
                <Grid.Col>
                  <Card shadow='None' p='lg' withBorder radius='md'>
                    <Title order={2}>Average Users by Day</Title>
                    <DailyAverage />
                  </Card>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell >
    </MantineProvider>
  );
}

export default App;
