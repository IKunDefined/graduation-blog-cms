import React, { Component } from 'react'
import { Table, Button } from 'antd';
import axios from 'axios'

class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
    this.columns = [{
      title: '用户id',
      dataIndex: '_id',
      key: '_id'
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: '管理员',
      key: 'isAdmin',
      dataIndex: 'isAdmin',
      render: text => {
        return (
          <span>{text ? '是': '否'}</span>
        )
      }
    }, {
      title: '操作',
      key: 'control',
      dataIndex: 'control',
      render: (text, record) => {
        return (
          <Button onClick={() => {this.deleteUser(record._id)}} type="danger">删除</Button>
        )
      }
    }]
  }
  componentDidMount () {
    this.getUserList()
  }
  getUserList () {
    axios.get("http://localhost:4000/blog/api/user/list").then(res => {
      this.setState({
        data: res.data.result
      })
    })
  }
  deleteUser (id) {
    axios.post('http://localhost:4000/blog/api/user/delete', { id }).then(res => {
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

export default UserList