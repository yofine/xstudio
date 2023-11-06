import React from "react";
import { Outlet } from "react-router-dom";
import {
  CodeOutlined,
  ToolOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Avatar } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.less";

const items = [
  {
    label: "Prompt 开发",
    key: "prompt",
    icon: <CodeOutlined />,
  },
  {
    label: "Tool 管理",
    key: "tools",
    icon: <ToolOutlined />,
  },
  {
    label: "知识库管理",
    key: "knowledge",
    icon: <BookOutlined />,
  },
  {
    label: "设置",
    key: "setting",
    icon: <SettingOutlined />,
  },
];

export default function BaseLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("🚀 ~ file: index.jsx:39 ~ BaseLayout ~ location:", location);
  const defaultSelectedKeys = location.pathname.split("/")[1];
  console.log(
    "🚀 ~ file: index.jsx:41 ~ BaseLayout ~ defaultSelectedKeys:",
    defaultSelectedKeys
  );

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };
  return (
    <div className="xstudio">
      <div className="xstudio-header pl-6 pr-6 justify-between items-center flex">
        <div className="xstudio-header-logo cursor-pointer text-2xl font-bold	 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 inline-block text-transparent bg-clip-text">
          XStudio
        </div>
        <div className="xstudio-header-user">
          <Avatar
            size={32}
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          ></Avatar>
        </div>
      </div>
      <div className="xstudio-layout">
        <div className="xstudio-layout-menu">
          <Menu
            defaultSelectedKeys={[defaultSelectedKeys]}
            onClick={handleMenuClick}
            inlineCollapsed
            items={items}
          />
        </div>
        <div className="xstudio-layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
