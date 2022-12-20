import { Component } from 'react';
import Chart from "react-apexcharts";

/* Apex Chart */
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
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            height="538px"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MonthlyTrend