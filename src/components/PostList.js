import React, { Component } from 'react'
import { Table, Button } from 'antd'
import axios from 'axios'

class PostList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
    this.columns = [{
      title: '文章id',
      dataIndex: '_id',
      key: '_id'
    }, {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '文章简介',
      key: 'summary',
      dataIndex: 'summary'
    }, {
      title: '发布日期',
      key: 'createAt',
      dataIndex: 'createAt'
    }, {
      title: '操作',
      key: 'control',
      dataIndex: 'control',
      render: (text, record) => {
        return (
          <Button onClick={() => {this.deletePost(record._id)}} type="danger">删除</Button>
        )
      }
    }]
  }
  componentDidMount () {
    this.getUserList()
  }
  getUserList () {
    axios.get("http://localhost:4000/blog/api/post/list").then(res => {
      this.setState({
        data: res.data.result
      })
    })
  }
  deletePost (id) {
    axios.post('http://localhost:4000/blog/api/post/delete', { id }).then(res => {
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

export default PostList