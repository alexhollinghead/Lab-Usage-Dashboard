import './App.css';
import { Component, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Layout,
  Menu,
  DatePicker,
  Space,
  Statistic,
  Table,
  theme
} from 'antd';
import Chart from "react-apexcharts";

const { RangePicker } = DatePicker;

/* Layout */
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

/* Sidebar Data */
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

/* Table Data */
const dataSource = [
  {
    key: '1',
    app: 'Premiere',
    users: 52,
    month: 'July',
  },
  {
    key: '2',
    app: 'Audacity',
    users: 21,
    month: 'October',
  },
];

const columns = [
  {
    title: 'Application',
    dataIndex: 'app',
    key: 'app',
  },
  {
    title: 'Users',
    dataIndex: 'users',
    key: 'users',
  },
  {
    title: 'Busiest Month',
    dataIndex: 'month',
    key: 'month',
  },
];


/* Apex Chart */
class Apex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
        }
      },
      series: [
        {
          name: "Users",
          data: [30, 40, 45, 50, 49, 60, 70]
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
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

/* Ant Design Layout */
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Row>
              <Space direction="vertical" size={12}>
                <RangePicker />
              </Space>
            </Row>

            <Row>
              <Col span={12}>
                Average Daily Users
                <Apex />
              </Col>

              <Col span={12}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Card>
                      <Statistic title="Active Users" value={112893} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout >
    </Layout >
  );
};

export default App;
