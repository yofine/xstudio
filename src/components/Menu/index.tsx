import React from 'react';
import { Menu } from 'antd';

const RightClickMenu = ({ onMenuClick }) => (
  <Menu onClick={onMenuClick}>
    <Menu.Item key="newAgent">新建Agent</Menu.Item>
    <Menu.Item key="publishAgent">发布Agent</Menu.Item>
    <Menu.Item key="deleteAgent">删除Agent</Menu.Item>
  </Menu>
);

export default RightClickMenu;
