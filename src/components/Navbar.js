import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import AvatarImage from "../assets/img/cryptocurrency.png";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={AvatarImage} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Crypto Clone</Link>
        </Typography.Title>
      </div>
      <Menu theme="dark">
        <Menu.Item>
          <FundOutlined />
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item>
          <BulbOutlined />
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
