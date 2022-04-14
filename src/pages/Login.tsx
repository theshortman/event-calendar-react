import { Layout, Row, Card } from "antd";
import React, { FC } from "react";
import LoginForm from "../components/LoginForm";
import styles from "./Login.module.css";

const Login: FC = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className={styles.h100}>
        <Card>
          <LoginForm />
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
