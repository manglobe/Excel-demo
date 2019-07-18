import React from 'react';
import './App.css';
import Cell from './components/Cell';
import Table from './components/Table';
import { Props } from './components/Table/Table';
type cellData = { value: String | void, view: String | void }
type State = {
  data: cellData[][]
}
const createEmptyGrid = () => Array(10).fill('').map(() =>
  Array(10).fill('').map(() => ({
    value: "",
    view: ""
  })))
class App extends React.PureComponent<{}, State> {
  state: State = {
    data: createEmptyGrid()
  }

  columns = [
    {
      id: 'empty',
      thContent: null,
      tdRender: (rowEle: State["data"][], index: number) => <Cell view={String(index + 1)}></Cell >
    },
    ...Array(10).fill(0)
      .map((ele, index) => String.fromCharCode(65 + index))
      .map((word, colIndex) => {
        const tdRender = (rowEle: cellData[], rowIndex: number) =>
          (<Cell
            view={String(rowEle[colIndex].view)}
            value={String(rowEle[colIndex].value)}
            onChange={this.cellChangeHandle(rowIndex, colIndex)}
          />)
        return {
          id: word,
          thContent: word,
          tdRender: tdRender
        }
      })
  ]
  cellChangeHandle = (rowIndex: number, colIndex: number) => (nextVal: String | void) => {
    this.changeData(rowIndex, colIndex, nextVal)
  }
  changeData = (x: number, y: number, val: String | void) => {
    const { data } = this.state
    data[x][y] = { value: val, view: val }
    this.setState({
      data: [...data]
    })
  }
  render() {
    return <Table data={this.state.data} columns={this.columns} />

  }
}

const data = {

}
export default App;

