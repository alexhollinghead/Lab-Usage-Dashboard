import { Card, Title, Table } from '@mantine/core'

function PopularSoftware() {
    /* TODO: Write function to fetch top 5 apps from backend */
    const elements = [
        { name: 'Adobe Premiere', uses: '31', month: 'July 2022' },
        { name: 'Audacity', uses: '17', month: 'November 2022' },
        { name: 'Adobe Audition', uses: '14', month: 'November 2022' },
        { name: 'Photoshop', uses: '11', month: 'October 2022' },
        { name: 'Rhino', uses: '8', month: 'July 2022' }
    ];

    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.name}</td>
          <td>{element.uses}</td>
          <td>{element.month}</td>
        </tr>
      ));

    return (
        <Card shadow='None' p='lg' withBorder radius='md'>
        <Title order={2}>Popular Software</Title>
        <Table striped highlightOnHover mt='xs'>
          <thead>
            <tr>
              <th>Application</th>
              <th>Uses</th>
              <th>Busiest Month</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card>
    );
}

export default PopularSoftware