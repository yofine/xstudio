import React from "react";
import { Outlet } from "react-router-dom";
import {
  HomeOutlined,
  CodeOutlined,
  ToolOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";

const items = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />,
  },
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

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };
  return (
    <div className="xstudio">
      <div className="xstudio-header">XStudio</div>
      <div className="xstudio-layout">
        <div className="xstudio-layout-menu">
          <Menu
            defaultSelectedKeys={["1"]}
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
