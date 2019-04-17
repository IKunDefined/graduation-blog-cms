import React, { Component } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import axios from 'axios'

class TagList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
    this.columns = [{
      title: '标签id',
      dataIndex: '_id',
      key: '_id'
    }, {
      title: '留言内容',
      dataIndex: 'content',
      key: 'content'
    }, {
      title: '留言用户',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: '操作',
      key: 'control',
      dataIndex: 'control',
      render: (text, record) => {
        return (
          <Popconfirm title="是否删除" onConfirm={() => {this.deleteMess(record._id)}}>
            <Button type="danger">删除</Button>
          </Popconfirm>
        )
      }
    }]
  }
  componentDidMount () {
    this.getMessList()
  }
  getMessList = () => {
    axios.get("http://localhost:4000/blog/api/message/list").then(res => {
      this.setState({
        data: res.data.result
      })
    })
  }
  deleteMess = (id) => {
    axios.post('http://localhost:4000/blog/api/message/delete', { id }).then(res => {
      if (res.data.code === 0) {
        this.getMessList()
      }
    })
  }
  render () {
    return (
      <div>
        <Table rowKey="_id" columns={this.columns} dataSource={this.state.data}></Table>
      </div>
    )
  }
}

export default TagList