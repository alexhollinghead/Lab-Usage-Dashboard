import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Button,
  Container,
  Flex,
  Group,
  Header,
  MantineProvider,
  MediaQuery,
  useMantineTheme,
} from '@mantine/core';
import { IconCalendarTime } from '@tabler/icons';
import Sidebar from './components/Sidebar';
import FrontPage from './pages/FrontPage'
import Upload from './pages/Upload';
import ComputerUsage from './pages/ComputerUsage';
import SoftwareUsage from './pages/SoftwareUsage';
import Help from './pages/Help';

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell
          navbarOffsetBreakpoint='sm'
          asideOffsetBreakpoint='sm'
          layout='alt'
          styles={(theme) => ({})}
          navbar={
            <Sidebar />
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
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/software" element={<SoftwareUsage />} />
              <Route path="/computers" element={<ComputerUsage />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </Container>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
