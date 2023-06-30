import React, { Suspense } from "react";
import { createFromFetch } from 'react-server-dom-webpack';

export default function App() {
  return <div>
    <h2>server component demo</h2>
    <Suspense fallback={<div>loading...</div>}>
      <List/> 
    </Suspense>
  </div>
}

let listRes // 可以写成 context
function List() {
  // 获取服务端组件序列化数据, 并反序列化，生成 React 组件渲染
  if (!listRes) {
    listRes = createFromFetch(
      fetch('http://localhost:3000/component/list')
    )
  }
  console.log(listRes)
  return (
    listRes.readRoot()
  );
}

