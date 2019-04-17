import React, { Component } from 'react'
import { Table, Button, Popconfirm, Tag } from 'antd'
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
      title: '分类',
      key: 'category',
      dataIndex: 'category',
      render: (text, record) => {
        return (
          <span>{text.name}</span>
        )
      }
    }, {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (text, record) => {
        const tags = text.map(item => {
          return (
            <Tag key={item._id}>
              {item.name}
            </Tag>
          )
        })
        return (
          <div>{tags}</div>
        )
      }
    }, {
      title: '发布日期',
      key: 'createAt',
      dataIndex: 'createAt'
    }, {
      title: '评论数量',
      key: 'comment',
      dataIndex: 'comment',
      render: (text) => {
        if (text.length !== 0) {
          return (
            <span><a href="javascript:;">{text.length}</a></span>
          )
        } else {
          return (
            <span>{text.length}</span>
          )
        }
        
      }
    }, {
      title: '操作',
      key: 'control',
      dataIndex: 'control',
      render: (text, record) => {
        return (
          <Popconfirm title="是否删除" onConfirm={() => {this.deletePost(record._id)}}>
            <Button type="danger">删除</Button>
          </Popconfirm>
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
      if (res.data.code === 0) {
        this.getUserList()
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

export default PostList