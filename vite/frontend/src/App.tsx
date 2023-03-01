import './App.css';
import { useState } from 'react';
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
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { IconClockHour4, IconCalendarTime } from '@tabler/icons';
import DailyAverage from './components/DailyAverage'
import MonthlyTrend from './components/MonthlyTrend'
import UniqueUsers from './components/UniqueUsers';
import PopularSoftware from './components/PopularSoftware';
import MostUsedProgram from './components/MostUsedProgram';
// TODO: Fix modularization of DateRange text

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState<[Date, Date]>([
    new Date(2022, 3, 1),
    new Date(2022, 12, 25)
  ]);
  let startDate = value[0] ? value[0].toLocaleDateString("en-US") : ``
  let endDate = value[1] ? value[1].toLocaleDateString("en-US") : ``
  console.log(value[0])


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
              backgroundImage: theme.fn.gradient({
                from: 'cyan', to: 'violet',
                deg: 190
              }),
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
              <NavLink color='theme.white' label="Overview"
                icon={<IconCalendarTime size={24} stroke={2} />} />
              <NavLink color='blue.2' label="Software"
                icon={<IconCalendarTime size={24} stroke={2} />} />
              <NavLink color='blue.2' label="Computer Usage"
                icon={<IconCalendarTime size={24} stroke={2} />} />
              <NavLink color='blue.2' label="Upload Data"
                icon={<IconCalendarTime size={24} stroke={2} />} />
              <NavLink color='blue.2' label="Help"
                icon={<IconCalendarTime size={24} stroke={2} />} />
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
      > {/* End AppShell */}

        <Container size='xl' p='xl'>
          <Grid gutter='xl'>
            <Grid.Col xs={12} lg={8}>
              <Title order={1}>DLL Usage Stats: {startDate} - {endDate}</Title>
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
                  <UniqueUsers startDate={value[0]} endDate={value[1]} />
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
                      <IconClockHour4 inline='True' size={48} strokeWidth={1} />
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
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
