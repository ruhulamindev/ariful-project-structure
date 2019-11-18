import React from "react";
import axios from "axios";
import { Layout, Menu, Icon, Table, Button } from "antd";

const { SubMenu } = Menu;
const { Content, Sider, Header } = Layout;
const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "Title",
    dataIndex: "title"
  }
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      date: [],
      collapsed: false
    };
  }

  async componentDidMount() {
    const response = await axios("https://jsonplaceholder.typicode.com/todos");
    this.setState({
      data: response.data
    });
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
    const collapsed = this.state.collapsed;
    return (
      <div>
        <Layout>
          <Layout>
            <Sider
              width={200}
              trigger={null}
              collapsible
              collapsed={collapsed}
              style={{
                boxShadow: "2px 0 6px rgba(0,21,41,.35)"
              }}
            >
              <a
                href="/"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "8px 0",
                  fontSize: 20,
                  color: "white",
                  fontFamily: "'Odibee Sans', cursive"
                }}
              >
                {collapsed ? "S.C." : "Sweet Company"}
              </a>
              <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ borderRight: 0 }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      <span>subnav 1</span>
                    </span>
                  }
                >
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      <span>subnav 2</span>
                    </span>
                  }
                >
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="notification" />
                      <span>subnav 3</span>
                    </span>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ minHeight: "100vh" }}>
              <Header
                style={{
                  background: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 1px 4px rgba(0,21,41,.08)"
                }}
              >
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                  style={{ fontSize: "20px", marginLeft: "-30px" }}
                />
                <Button type="danger">Logout</Button>
              </Header>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <span style={{ marginLeft: 8 }}>
                    {hasSelected
                      ? `Selected ${selectedRowKeys.length} items`
                      : ""}
                  </span>
                </div>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={this.state.data}
                />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Dashboard;
