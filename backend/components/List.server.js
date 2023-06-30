import React from 'react'
import Item from './Item.client'
/**
 * 
 * 服务端组件
 */
export default function List(props) {
  const { listData } = props
  return <div>
    <h2>server list</h2>
    <div>
      {listData.map(i => {
        return <Item
          key={i.rank}
          rank={i.rank}
          name={i.username}
          userId={i.userId}
        />
      })}
    </div>
  </div>
}