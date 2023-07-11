import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import 'moment/locale/zh-cn'
// import locale from 'antd/es/date-picker/locale/zh_CN'
import "./index.scss";
import img404 from "@/assets/error.png";
// import { use } from "echarts";
import { useEffect, useState } from "react";
import { http } from "@/utils";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  // 频道列表管理
  // 解构赋值数组
  const [channeList, setChannelList] = useState([]);
  const loadChannelList = async () => {
    const res = await http.get("/channels");
    // console.log(res);
    setChannelList(res.data.channels);
  };
  useEffect(() => {
    loadChannelList();
  });
  // 文章列表管理 统一管理数据，将来修改setlist传对象
  const [articleData, setlist] = useState({
    list: [], // 文章列表
    count: 0, // 文章数量
  });
  // 文章参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  });
  // 如果异步请求函数需要依赖一些数据的变化而重新执行
  // 推荐把它写在内部
  // 统一不抽离函数到外面，只要涉及到异步请求的函数，都要放到useEffect内部
  // 本质区别：写到外面每次组件跟新都会重新进行函数初始化，这本质是一次性能消耗
  // 而写在useEffect中，只会在依赖项发生变化的时候，函数才会进行重新初始化
  // 避免性能损失
  useEffect(()=> {
    const loadList = async () => {
      const res = await http.get('/mp/articles', { params })
      console.log(res);
      const { results, total_count } = res.data
      setlist({
        list: results,
        count: total_count
      })
    }
    loadList()
  },[params]) 
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return <img src={cover || img404} width={80} height={60} alt="" />;
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];

  const data = [
    {
      id: "8218",
      comment_count: 0,
      cover: {
        images: ["http://geek.itheima.net/resources/images/15.jpg"],
      },
      like_count: 0,
      pubdate: "2019-03-11 09:00:00",
      read_count: 2,
      status: 2,
      title: "wkwebview离线化加载h5资源解决方案",
    },
  ];
  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
              {channeList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 ${articleData.count} 条总数：`}>
        <Table rowKey="id" columns={columns} dataSource={articleData.list} />
      </Card>
    </div>
  );
};

export default Article;
