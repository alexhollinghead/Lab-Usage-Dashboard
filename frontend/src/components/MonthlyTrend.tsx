import { Component } from 'react';
import { Card, Title } from '@mantine/core'
import Chart from "react-apexcharts";

class MonthlyTrend extends Component {
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
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    categories: ["Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
                }
            },
            series: [
                {
                    name: "Users",
                    data: [30, 40, 45, 50, 49, 60, 50]
                }
            ]
        };
    }
    render() {
        return (
            <Card shadow='None' p='lg' withBorder radius='md'>
            <Title order={2} mb='xl'>Users Per Month</Title>
            <div className="app" >
                <div className="row" >
                    <div className="mixed-chart" >
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            height="540px"
                        />
                    </div>
                </div>
            </div></Card>
        );
    }
}

export default MonthlyTrend