import './App.css';
import { useState } from 'react';
import {
  AppShell,
  Burger,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Header,
  Image,
  MediaQuery,
  Navbar,
  Table,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { IconUser, IconClockHour4, IconAppWindow, IconCalendarTime } from '@tabler/icons';
import Apex from './Components'


function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(
    new Date(2021, 11, 1),
    new Date(2021, 11, 5));
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

  return (
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
            <Image src='/Users/alex/Documents/programming/dll/lab-use-dashboard/frontend/src/dll-logo.png'
              alt='Digital Learning Lab Logo' />
          </Navbar.Section>
          <Navbar.Section grow mt='md'>
            <Text>Overview</Text>
            <Text>Software</Text>
            <Text>Computer Usage</Text>
            <Text>Upload Data</Text>
            <Text>Help</Text>
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
            <Title order={1}>DLL Usage Stats - %DATE</Title>
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
                <Card shadow='None' p='lg' c='white' withBorder radius='md' sx={(theme) => ({
                  backgroundImage: theme.fn.gradient({ from: 'blue.6', to: 'blue.4', deg: 90 }),
                })}>
                  <IconUser size={48} strokeWidth={1} />
                  <Text tt='uppercase' fz='xs'>Unique Users</Text>
                  <Text fz='xl'>
                    212
                  </Text>
                </Card>
              </Grid.Col>

              <Grid.Col sm={12} md={6}>
                <Card shadow='None' p='lg' c='white' withBorder radius='md' sx={(theme) => ({
                  backgroundImage: theme.fn.gradient({ from: 'blue.6', to: 'blue.4', deg: 90 }),
                })}>
                  <IconClockHour4 size={48} strokeWidth={1} />
                  <Text tt='uppercase' fz='xs'>Avg Session</Text>
                  <Text fz='xl'>
                    2 hours
                  </Text>
                </Card>
              </Grid.Col>

              <Grid.Col>
                <Card shadow='None' p='lg' withBorder radius='md'>
                  <Title order={2}>Average Daily Users</Title>
                  <Apex />
                </Card>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col xs={12} lg={4}>
            <Grid gutter='lg'>
              <Grid.Col>
                <Card shadow='None' p='lg' withBorder radius='md'>
                  <IconAppWindow size={48} strokeWidth={1} />
                  <Text tt='uppercase' fz='xs' c='dark.2'>Most Popular</Text>
                  <Text fz='xl'>
                    Premiere
                  </Text>
                </Card>
              </Grid.Col>
              <Grid.Col>
                <Card shadow='None' p='lg' withBorder radius='md'>
                  <IconCalendarTime size={48} strokeWidth={1} />
                  <Text tt='uppercase' fz='xs' c='dark.2'>Busiest Time</Text>
                  <Text fz='xl'>
                    Wed @ 7
                  </Text>
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
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell >
  );
}

export default App;