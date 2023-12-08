import React from 'react';
import Tree from '../../components/Tree';
import { Collapse, message, Modal, Button } from 'antd';
import { SessionMessageType } from '@/types/components';
import { PromptBlockType } from '@/types/prompt';
import PromptEditor from '../../components/editor';
import PromptSession from '@/components/session';
import PromptFile from '@/core/promptFile';

import './index.less';
// import { useState } from 'react';
import { getRandom } from '../../utils/utils';
// import { useEffect } from 'react';

// import { mock_project1_tree, mock_prompt_content } from '@/mock';
import {
  getProjectFileTree,
  getPromptSection,
  getPromptTemplate,
  getProjectList,
  updatePrompTemplate,
  compilePromptTemplate,
} from '@/api/api';
import { mock_project1_tree } from '@/mock';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default class Prompt extends React.Component<
  {},
  {
    currentPromptFile: PromptFile;
    promptText: string;
    messageList: SessionMessageType[];
    projectTree: any;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      currentPromptFile: null,
      promptText: '',
      messageList: [{ type: 'receive', message: 'hello world' }],
      projectTree: {},
    };
  }

  private projectId: number = 1;

  componentDidMount(): void {
    // TODO: projectId 先写死，供调试单个项目，后通过list获取
    // getProjectList().then((res) => {
    //   console.log(res);
    // });
    getProjectFileTree(this.projectId).then((res) => {
      // 树结构转化
      // const convert = (node) => {
      //   return {
      //     key: node.id,
      //     title:
      //       node.title +
      //       (node.type && node.type !== 'folder' ? '.' + node.type : ''),
      //     ...('children' in node
      //       ? {
      //           children: (node.children || []).map((child) => convert(child)),
      //         }
      //       : null),
      //   };
      // };
      // const treenodeData = convert(res)

      const treenodeData = res;
      this.setState({
        projectTree: treenodeData,
      });
    });
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    message.error(error.message);
  }

  /**
   * 打开文件
   */
  onPrompFiletOpen({ type, title, id }) {
    // TODO：获取section/template的prompt内容
    const fetchFileContentPromise =
      type === 'section' ? getPromptSection : getPromptTemplate;

    fetchFileContentPromise(id).then((res) => {
      const currentFile = new PromptFile(
        {
          type,
          name: title,
          id,
          content: res.content,
          project_id: this.projectId,
        },
        () => this.forceUpdate()
      );
      this.setState({
        currentPromptFile: currentFile,
      });
    });
  }

  /**
   * 右键section文件节点添加到编辑器中
   * */
  addSectionToEditor({ key, title, type }) {
    const { currentPromptFile } = this.state;
    if (currentPromptFile) {
      const text = currentPromptFile.getContent();
      // template文件不能作为section块添加
      if (type !== 'section') {
        throw new Error('cannot add template as section');
      }
      const textList = text.concat([
        {
          id: `${key}-${getRandom()}`,
          source: title,
          type: 'prompt_section',
        },
      ]);
      currentPromptFile.setContent(textList);
    }
  }

  /**
   * 预览prompt富文本
   */
  previewPrompt() {
    // 转成富文本
    const { currentPromptFile } = this.state;
    const prompt = currentPromptFile.getContent();
    const convertedPrompt = prompt.map((s) => {
      if (s.type === 'prompt_section') {
        return `{{prompt: ${s.source}}}`;
      } else {
        return s.text;
      }
    });
    this.setState({
      promptText: convertedPrompt.join(''),
    });

    // TODO： 保存到后端
    // updatePrompTemplate()
  }

  /**
   * template 编译生成prompt
   */
  createPrompt() {
    const { promptText } = this.state;
    const { confirm } = Modal;
    // TODO: 编译template
    // compilePromptTemplate()
    const content = `🚀 ~ create prompt from template using<${promptText}>`;

    confirm({
      title: 'create prompt',
      content,
      okText: 'go to debug',
      onOk: () => {
        this.setState((state) => {
          const { messageList: m } = state;
          return {
            ...state,
            messageList: m.concat([{ type: 'post', message: content }]),
            promptText: '',
          };
        });
        //
      },
      okButtonProps: {
        className: 'text-gray-900 border-slate-500',
      },
      cancelText: 'return to rebuild',
    });
  }

  /**
   * 监听messageList变化
   */
  onMessageListChange() {
    const { messageList } = this.state;
    if (messageList.length > 0) {
      const last = messageList[messageList.length - 1];
      if (last.type === 'post') {
        Promise.resolve(`${last.message} result from GPT~~`).then((res) => {
          this.setState((state) => {
            return {
              ...state,
              messageList: state.messageList.concat([
                { type: 'receive', message: res },
              ]),
            };
          });
        });
      }
    }
  }

  render() {
    const { currentPromptFile, promptText, messageList, projectTree } =
      this.state;
    const items = [
      {
        key: 'project',
        label: 'Project',
        children: (
          <Tree
            fieldNames={{ title: 'title', key: 'id', children: 'children' }}
            onSelect={(node) => {
              if (node?.type !== 'folder') {
                this.onPrompFiletOpen(node);
              }
            }}
            treeData={[projectTree as any]}
            onRightClick={this.addSectionToEditor}
          />
        ),
      },
    ];
    return (
      <div className="xstudio-prompt">
        <div className="left">
          <div className="prompt-explorer h-full bg-slate-50	">
            <label className="p-4 text-sm font-medium text-gray-900 justify-start flex">
              EXPLORER
            </label>
            <div className="overflow-y-auto">
              <Collapse
                items={items}
                defaultActiveKey={['project']}
                bordered={false}
              />
            </div>
          </div>
        </div>
        <div className="center">
          <div className="h-full">
            <label className="p-2 font-medium text-gray-900 justify-center flex bg-slate-50	">
              Prompt
            </label>
            <PromptEditor
              text={currentPromptFile?.getContent() || []}
              onTextChange={(textList) => {
                currentPromptFile?.setContent(textList);
              }}
            />
            <div className="w-full flex justify-end">
              <div>{promptText}</div>
              <Button
                type="primary"
                className="m-2 font-medium bg-slate-200 text-slate-700 border-slate-500 "
                onClick={this.previewPrompt}
              >
                save and preview
              </Button>
              {currentPromptFile?.getType() === 'template' ? (
                <Button
                  className="m-2 font-medium bg-slate-200 text-slate-700 border-slate-500 "
                  onClick={this.createPrompt}
                >
                  create prompt
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="prompt-debug">
            <label className="debug-title p-2 font-medium text-gray-900 justify-start flex">
              Run and Debug
              <Button
                style={{ marginLeft: `16px` }}
                onClick={() => {
                  this.setState({
                    messageList: [],
                  });
                }}
              >
                clear session
              </Button>
            </label>
            <PromptSession sessionList={messageList}></PromptSession>
          </div>
        </div>
      </div>
    );
  }
}
