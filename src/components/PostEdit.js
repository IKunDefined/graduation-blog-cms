import React, { Component } from 'react'
import { Input, Select, Button } from 'antd'
import axios from 'axios'

const TextArea = Input.TextArea
// const Option = Select.Option

class PostEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: [],
      categories: []
    }
  }
  componentDidMount () {
    this.getTagList()
  }
  getTagList () {
    axios.get("http://localhost:4000/blog/api/tag/list").then(res => {
      if (res.data.code === 0) {
        let tagOptions = []
        tagOptions = res.data.result.map(item => {
          let obj = {
            value: item._id,
            label: item.name
          }
          return obj
        })
        this.setState({
          tags: tagOptions
        })
      } else {
      }
    })
  }
  getCategoryList () {
    axios.get("http://localhost:4000/blog/api/category/list").then(res => {
      if (res.data.code === 0) {
        let categoryOptions
        categoryOptions = res.data.result.map(item => {
          let obj = {
            value: item._id,
            label: item.name
          }
          return obj
        })
        this.setState({
          categories: categoryOptions
        })
      } else {
      }
    })
  }
  render () {
    return (
      <div>
        <div>
          文章标题
          <Input/>
        </div>
        <div>
          文章简介
          <TextArea rows={3}/>
        </div>
        <div>
          文章内容
          <TextArea rows={4}/>
        </div>
        <div>
          文章分类
          <Select/>
        </div>
        <div>
          文章标签
          <Select
            mode="multiple"
          >
            {this.tags}
          </Select>
        </div>
        <div>
          <Button type="primary">发布文章</Button>
        </div>
      </div>
    )
  }
}

export default PostEdit