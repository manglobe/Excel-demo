import React from "react";
import style from "./SortCell.module.css";
type direction = "up" | "down" | "normal";
interface Props {
  defaultValue?: direction;
  onChange?: (direction: direction) => void;
}
type State = {
  direction: direction;
};
const getNextDirection = (current: direction): direction => {
  switch (current) {
    case "up":
      return "down";
    case "down":
      return "normal";
    case "normal":
      return "up";
    default:
      console.error("uncatch direction: " + current);
      return "normal";
  }
};
class SortCell extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      direction: props.defaultValue || "normal"
    };
  }

  sortHandle = () => {
    const nextDirection = getNextDirection(this.state.direction);
    this.setState({
      direction: nextDirection
    });
    const { onChange } = this.props;
    onChange && onChange(nextDirection);
  };

  render() {
    const { direction } = this.state;
    return (
      <div
        className={`${style.sortCell} ${direction ? style[direction] : ""}`}
        onClick={this.sortHandle}
      >
        {this.props.children}
        <span />
      </div>
    );
  }
}

export default SortCell;
