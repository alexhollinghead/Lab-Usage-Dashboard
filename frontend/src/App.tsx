import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell, Container, MantineProvider, useMantineTheme } from '@mantine/core';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Pages
import FrontPage from './pages/FrontPage'
import Upload from './pages/Upload';
import ComputerUsage from './pages/ComputerUsage';
import SoftwareUsage from './pages/SoftwareUsage';
import Help from './pages/Help';

// App
function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [date, setDate] = useState<[Date, Date]>(
    [new Date(2021, 5, 1), new Date(2022, 11, 31)]
    );
  let start = date[0] ? date[0].toLocaleDateString("en-US") : ``
  let end = date[1] ? date[1].toLocaleDateString("en-US") : ``

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <AppShell
          navbarOffsetBreakpoint='sm'
          asideOffsetBreakpoint='sm'
          layout='alt'
          styles={(theme) => ({})}
          navbar={
            <Sidebar />
          }
          header={        
            <Header 
            theme={theme} 
            opened={opened} 
            setOpened={setOpened}
            start={start} 
            end={end} 
            date={date}
            setDate={setDate} />
          }> 

          <Container size='lg' p='xl'>
            <Routes>
              <Route path="/" element={<FrontPage date={date} />} />
              <Route path="/software" element={<SoftwareUsage />} />
              <Route path="/computers" element={<ComputerUsage />} />
              <Route path="/upload-data" element={<Upload />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </Container>

        </AppShell>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
