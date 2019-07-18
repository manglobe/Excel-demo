import React from 'react'
import style from './Table.module.css'
export interface Props {
  columns: {
    id: string,
    thContent: React.ReactNode,
    tdRender: (rowEle: any, rowIndex: number) => React.ReactNode
  }[],
  data: any[]
}

class Table extends React.PureComponent<Props> {
  render() {
    let { columns, data } = this.props;
    return (
      <table className={style.table}>
        <Thead columns={columns} />
        <Tbody data={data} columns={columns} />
      </table>
    );
  }
}
function Thead({ columns }: { columns: Props['columns'] }): React.ReactElement {
  return <thead className={style.thead}>
    <tr>
      {
        columns.map(column => (
          <th key={column.id}>
            {column.thContent}
          </th>
        ))
      }
    </tr >
  </thead >
}
function Tbody({ data, columns }: Props): React.ReactElement {
  return <tbody className={style.tbody}>
    {data.map((rowEle, rowIndex) => (
      <tr
        key={rowIndex}
        className={rowEle.className}
      >
        {columns.map(column => (
          <td key={rowIndex + column.id}>
            {column.tdRender(rowEle, rowIndex)}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
}
export default Table