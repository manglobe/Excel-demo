import React from 'react';
import style from './SortCell.module.css';
type direction = 'up' | 'down' | void
interface Props {
  defaultValue?: direction,
  onChange?: (direction: direction) => void
}
type State = {
  direction: direction
}
const getNextDirection = (current: direction): direction => {
  switch (current) {
    case 'up':
      return 'down';
    case 'down':
      return void 0;
    case void 0:
      return 'up'
    default:
      console.error('uncatch direction: ' + current)
      return void 0

  }
}
class SortCell extends React.PureComponent<Props, State>{
  constructor(props: Props) {
    super(props)
    this.state = {
      direction: props.defaultValue
    }
  }

  sortHandle = () => {
    const nextDirection = getNextDirection(this.state.direction)
    this.setState({
      direction: nextDirection
    })
    const { onChange } = this.props;
    onChange && onChange(nextDirection)
  }

  render() {
    const { direction } = this.state
    return <div className={`${style.sortCell} ${direction ? style[direction] : ""}`} onClick={this.sortHandle}>
      {this.props.children}
      <span></span>
    </div>
  }
}

export default SortCell