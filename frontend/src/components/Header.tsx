import {
    Burger,
    Container,
    Grid,
    MediaQuery,
    Title,
  } from '@mantine/core';
import {Header as MantineHeader} from '@mantine/core' 
import DatePicker from './DatePicker';

export default function Header(
    {theme, opened, setOpened, start, end, date, setDate}) {
    return(    
    <MantineHeader height={{ base: 175, lg: 70 }} p='md'>
        <Container size='lg'>
        <Grid>            
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size='sm'
                    color={theme.colors.gray[6]}
                    mr='xl'
                />
                </MediaQuery>
            <Grid.Col xs={12} md={8}>
                <Title order={1}>DLL Usage Stats: {start} - {end}</Title>
            </Grid.Col>
            <Grid.Col xs={12} md={4}>
                <DatePicker date={date} setDate={setDate} />
            </Grid.Col>
        </Grid></Container>
    </MantineHeader>)}