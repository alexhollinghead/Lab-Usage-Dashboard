import { Card, Text, ThemeIcon } from '@mantine/core'
import { IconAppWindow } from '@tabler/icons';

function MostUsedProgram() {
    return(
        <Card shadow='None' p='lg' c='white' withBorder radius='md' 
        sx={(theme) => ({
            backgroundImage: theme.fn.gradient({ from: 'blue.5', to: 'blue.3',
            deg: 90 }),
          })}>
            <ThemeIcon color='blue.9' size='xl' mb='xs'>
              <IconAppWindow strokeWidth={2} />
            </ThemeIcon>
            <Text size='2.2rem'>
              Adobe Premiere
            </Text>
            <Text tt='uppercase' fz='sm' fw={500} mt='md'>Most Popular Program
            </Text>
        </Card>
    );
}

export default MostUsedProgram