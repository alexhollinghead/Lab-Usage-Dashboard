import { Component } from 'react';
import { Card, Title } from '@mantine/core'
import Chart from "react-apexcharts";

class DailyAverage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar",
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
                }
            },
            series: [
                {
                    name: "Users",
                    data: [45, 40, 45, 50, 49, 20, 10]
                }
            ]
        };
    }
    render() {
        return (
            <Card shadow='None' p='lg' withBorder radius='md'>
                    <Title order={2}>Average Users by Day</Title>
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            align="right"
                        />
                    </div>
                </div>
            </div>
            </Card>
        );
    }
}

export default DailyAverage