import React, { Component } from 'react'
import { Input, Select, Button } from 'antd'
import axios from 'axios'
import '../style/post-edit.css'

const TextArea = Input.TextArea
const Option = Select.Option

class PostEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: [],
      categories: [],
      postTitle: '',
      postSummary: '',
      postContent: '',
      postCategory: {},
      postTags: []
    }
  }
  componentDidMount () {
    this.getTagList()
    this.getCategoryList()
  }
  getTagList () {
    axios.get("http://localhost:4000/blog/api/tag/list").then(res => {
      if (res.data.code === 0) {
        this.setState({
          tags: res.data.result
        })
      } else {
      }
    })
  }
  getCategoryList () {
    axios.get("http://localhost:4000/blog/api/category/list").then(res => {
      if (res.data.code === 0) {
        this.setState({
          categories: res.data.result
        })
      } else {
      }
    })
  }
  setTitle = (e) => {
    this.setState({
      postTitle: e.currentTarget.value
    })
  }
  setSummary = (e) => {
    this.setState({
      postSummary: e.currentTarget.value
    })
  }
  setContent = (e) => {
    this.setState({
      postContent: e.currentTarget.value
    })
  }
  selectCate (value) {
    this.state.categories.map(item => {
      if (item._id === value) {
        this.setState({
          postCategory: item
        })
      }
    })
  }
  selectTags (value) {
    let arr = []
    value.map(id => {
      this.state.tags.map(item => {
        if (id === item._id) {
          arr.push(item)
        }
      })
    })
    this.setState({
      postTags: arr
    })
  }
  post () {
    let post = {
      title: this.state.postTitle,
      summary: this.state.postSummary,
      content: this.state.postContent,
      category: this.state.postCategory,
      tags: this.state.postTags,
      createAt: new Date()
    }
    axios.post('http://localhost:4000/blog/api/post/create', { post }).then(res => {
    })
  }
  render () {
    const categories = this.state.categories.map(item => <Option key={item._id}>{item.name}</Option>)
    const tags = this.state.tags.map(item => <Option key={item._id}>{item.name}</Option>)
    return (
      <div>
        <div className="input-block">
          <div className="title">文章标题</div>
          <Input placeholder="请输入文章标题" onChange={this.setTitle}/>
        </div>
        <div className="input-block">
          <div className="title">文章简介</div>
          <TextArea placeholder="请输入文章简介" rows={3} onChange={this.setSummary}/>
        </div>
        <div className="input-block">
          <div className="title">文章内容</div>
          <TextArea placeholder="请输入文章内容" rows={4} onChange={this.setContent}/>
        </div>
        <div className="input-block">
          <div className="title">文章分类</div>
          <Select
            style={{width: "100px"}}
            onChange={value => this.selectCate(value)}
          >
            {categories}
          </Select>
        </div>
        <div className="input-block">
          <div className="title">文章标签</div>
          <Select
            mode="multiple"
            style={{width: "100%"}}
            onChange={value => this.selectTags(value)}
          >
          {tags}
          </Select>
        </div>
        <div className="input-block">
          <Button type="primary" onClick={() => this.post()}>发布文章</Button>
        </div>
      </div>
    )
  }
}

export default PostEdit