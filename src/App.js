import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Menu, Icon } from 'antd'
import UserList from './components/UserList'
import PostList from './components/PostList'
import PostEdit from './components/PostEdit'
import CateList from './components/CateList'
import TagList from './components/TagList'
import MessList from './components/MessList'
import VedioUpdate from './components/VideoUpdate'
import ActList from './components/ActList'
import './style/reset.css'
import './style/app.css'

const SubMenu = Menu.SubMenu

class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <div className="container">
            <Menu
              mode="horizontal"
            >
              <Menu.Item>
                <a href="http://localhost:8080/"><Icon type="home"/>IKunDefined</a>
              </Menu.Item>
            </Menu>
            <div className="main">
              <div className="menu">
                <Menu
                  mode="inline"
                  style={{ height: "100%", width: "240px"}}
                >
                  <SubMenu
                    title={<span><Icon type="user"/>用户管理</span>}
                  >
                    <Menu.Item>
                      <Link to="/userlist"><Icon type="bars"/>用户列表</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    title={<span><Icon type="profile"/>文章管理</span>}
                  >
                    <Menu.Item>
                      <Link to="/postlist"><Icon type="bars"/>文章列表</Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link to="/postedit"><Icon type="edit"/>发布文章</Link>
                    </Menu.Item>
                    <SubMenu
                      title={<span><Icon type="book"/>分类管理</span>}
                    >
                      <Menu.Item>
                        <Link to="/catelist"><Icon type="bars"/>分类列表</Link>
                      </Menu.Item>
                    </SubMenu>
                    <SubMenu
                      title={<span><Icon type="tags"/>标签管理</span>}
                    >
                      <Menu.Item>
                        <Link to="/taglist"><Icon type="bars"/>标签列表</Link>
                      </Menu.Item>
                    </SubMenu>
                  </SubMenu>
                  <SubMenu
                    title={<span><Icon type="message"/>留言管理</span>}
                  >
                    <Menu.Item>
                      <Link to="/messlist"><Icon type="bars"/>留言列表</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    title={<span><Icon type="play-circle"/>视频管理</span>}
                  >
                    <Menu.Item>
                      <Link to="/videoupdate"><Icon type="upload"/>视频上传</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    title={<span><Icon type="compass"/>动态管理</span>}
                  >
                    <Menu.Item>
                      <Link to="/actlist"><Icon type="bars"/>动态列表</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
              <div className="view">
                <Route path="/userlist" component={UserList}></Route>
                <Route path="/postlist" component={PostList}></Route>
                <Route path="/postedit" component={PostEdit}></Route>
                <Route path="/catelist" component={CateList}></Route>
                <Route path="/taglist" component={TagList}></Route>
                <Route path="/messlist" component={MessList}></Route>
                <Route path="/videoupdate" component={VedioUpdate}></Route>
                <Route path="/actlist" component={ActList}></Route>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
