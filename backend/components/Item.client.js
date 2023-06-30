import React, { Suspense } from 'react'
import { createFromFetch } from 'react-server-dom-webpack';

let scoreComs = {}

export default function Item({name, rank, userId}) {
  // ! X 反模式：每个 item 单独发起一次服务端组件的请求，拉低应用性能
  // if (!scoreComs[userId]) {
  //   scoreComs[userId] = createFromFetch(
  //     fetch(`http://localhost:3000/component/score?userId=${userId}`)
  //   )
  // }
  return <div style={{width: "300px", display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
    <span>{rank}</span>
    <span>{name}</span>
    {/* <span>
      <Suspense fallback={<span>loaing score ...</span>}>
        {scoreComs[userId].readRoot()}
      </Suspense>
    </span> */}
  </div>
}
