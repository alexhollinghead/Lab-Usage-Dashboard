import { Component } from 'react';
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
        );
    }
}

export default DailyAverage