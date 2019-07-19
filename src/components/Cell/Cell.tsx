import React from 'react';
import style from './Cell.module.css'
export interface Props {
  view?: string,
  value?: string,
  onChange?: (nextValue?: string) => void,
}
type State = {
  EditMode: boolean,
  editValue: string
}
class Cell extends React.PureComponent<Props, State> {
  wrapDom: HTMLDivElement | null = null
  editorDom: HTMLInputElement | null = null
  state = {
    EditMode: false,
    editValue: "",
  }

  enterEditMod = () => {
    this.setState({
      EditMode: true,
      editValue: this.props.value || ""
    }, () => {
      window.addEventListener('click', this.addLeaveEditListener);
      this.editorDom && this.editorDom.focus()
    })
  }

  addLeaveEditListener = (e: MouseEvent) => {
    if (this.wrapDom && !this.wrapDom.contains(e.target as Node)) {
      this.leaveEditMod(true)
    }
  }

  leaveEditMod = (needSaveValue: boolean) => {
    const { onChange } = this.props
    const { editValue: nextValue } = this.state
    onChange && onChange(nextValue || this.props.value)
    window.removeEventListener('click', this.addLeaveEditListener)
    this.setState({
      EditMode: false
    })
  }
  onEditHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    this.setState({
      editValue: val
    })
  }
  render() {
    const { view } = this.props
    return <div className={style.cell} onDoubleClick={this.enterEditMod} ref={el => this.wrapDom = el}>
      {<CellEditor value={this.state.editValue}
        onChange={this.onEditHandle}
        visible={this.state.EditMode}
        onConfirm={() => this.leaveEditMod(true)}
        onCancel={() => this.leaveEditMod(false)}
        inputRef={el => this.editorDom = el}
      />}
      {view}
    </div>
  }
}
interface CellEditorProps {
  visible: boolean,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onConfirm: () => void,
  onCancel: () => void,
  inputRef: React.Ref<any>,
}
function CellEditor({ visible, value, onChange, onConfirm, onCancel, inputRef }: CellEditorProps): React.ReactElement {
  const keyDownHandle = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      onConfirm()
    }
    if (e.keyCode === 27) {
      onCancel()
    }
  }
  return <input ref={inputRef} className={style.editor} type={visible ? 'text' : 'hidden'} value={value} onChange={onChange} onKeyDown={keyDownHandle} />
}

export default Cell