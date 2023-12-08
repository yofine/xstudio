import React from 'react';
import { Input } from 'antd';
import { PromptTextType } from '@/types/components';
import { PromptBlockType } from '@/types/prompt';
import deleteSVG from '@/assets/delete.svg';
import addSVG from '@/assets/add.svg';
import './index.less';
import { cloneDeep } from 'lodash';
import ReactDOM from 'react-dom';
import { getRandom } from '../../utils/utils';

type PromptEditorProps = {
  text: PromptBlockType[];
  onTextChange: (text: PromptBlockType[]) => void;
  className?: string;
  style?: {
    [key: string]: string;
  };
};

const TextArea = Input.TextArea;

export default class PromptEditor extends React.Component<
  PromptEditorProps,
  {}
> {
  private willDetach: Function[];
  constructor(props: PromptEditorProps) {
    super(props);
    this.willDetach = [];
  }

  componentDidMount(): void {}

  componentWillUnmount(): void {
    this.willDetach.forEach((fn) => fn());
  }

  delete(id: string) {
    const { text, onTextChange } = this.props;
    const deleted = text.filter((t) => t.id !== id);
    onTextChange && onTextChange(deleted);
  }

  createAfter(id?: string) {
    const { text, onTextChange } = this.props;
    const newtext = cloneDeep(text);
    if (!id) {
      newtext.push({
        type: 'plain_text',
        id: getRandom(),
        text: '',
      });
    } else {
      const idx = text.findIndex((t) => t.id === id);
      newtext.splice(idx + 1, 0, {
        type: 'plain_text',
        id: getRandom(),
        text: '',
      });
    }

    this.props.onTextChange && onTextChange(newtext);
  }

  onTextInput(e) {
    if (e?.target) {
      let parent = e.target as Element;
      while (
        parent &&
        parent.parentElement &&
        parent.className !== 'prompt-editor-tag'
      ) {
        parent = parent.parentElement;
      }
      const modifyId = parent.id;
      const text = e.target.value;
      const modifiedTextList = cloneDeep(this.props.text).map((item) => {
        if (item.id === modifyId) {
          return {
            ...item,
            text,
          };
        } else {
          return item;
        }
      });
      this.props.onTextChange && this.props.onTextChange(modifiedTextList);
    }
  }

  decode(t: PromptBlockType) {
    const { type, source, text, id } = t;

    return (
      <div className="prompt-editor-flow" key={`${id}`}>
        <div id={`${id}`} className="prompt-editor-tag">
          <TextArea
            value={type === 'prompt_section' ? `prompt: ${source}` : text}
            className="prompt-editor-tag-content"
            onChange={this.onTextInput.bind(this)}
            bordered={false}
            autoSize
            placeholder={'please input your prompt'}
            disabled={type === 'prompt_section'}
          ></TextArea>
          <img
            className="prompt-editor-tag-del"
            src={deleteSVG}
            onClick={() => this.delete(id)}
          />
        </div>
        <div className="prompt-editor-add">
          <div className="prompt-editor-add-line"></div>
          <img
            src={addSVG}
            className="prompt-editor-add-icon"
            onClick={() => this.createAfter(id)}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="prompt-editor">
        <div className="prompt-editor-wrapper">
          {(this.props.text || []).map((t) => this.decode(t))}
        </div>
      </div>
    );
  }
}
