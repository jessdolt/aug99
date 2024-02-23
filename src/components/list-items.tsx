import React, { forwardRef } from "react"
import ListItem from "./list-item"

interface ListItems {
  data: any[]
}

const ListItems: React.ForwardRefRenderFunction<HTMLDivElement, ListItems> = (
  { data },
  ref
) => {
  return (
    <div className="list-items">
      {data.length === 0 && <p className="no-record">No data shown</p>}

      {data.map((item) => (
        <ListItem data={item} key={item.id} />
      ))}

      <div ref={ref} />
    </div>
  )
}

export default forwardRef(ListItems)
