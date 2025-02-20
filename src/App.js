import React from 'react';
import { Layout } from 'antd';
import NavHeader from './components/NavHeader';
import ContentSection from './components/ContentSection';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <NavHeader />
      <Content style={{ padding: '0', marginTop: '0' }}>
        <ContentSection/>
      </Content>
    </Layout>
  )
}

export default App;
