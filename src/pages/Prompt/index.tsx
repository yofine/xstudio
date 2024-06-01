import React from "react";
import Tree from "../../components/Tree";
import { Collapse, message, Modal, Button, Dropdown, MenuProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SessionMessageType } from "@/types/components";
import { PromptBlockType } from "@/types/prompt";
import PromptEditor from "../../components/editor";
import PromptSession from "@/components/session";
import PromptFile from "@/core/promptFile";
import RightClickMenu from "../../components/Menu"; // 引入右键菜单组件

import "./index.less";
import { getRandom } from "../../utils/utils";

function handleClick(e, data) {
  console.log(data.foo);
}

import {
  getProjectFileTree,
  getPromptSection,
  getPromptTemplate,
  getProjectList,
  updatePrompTemplate,
  compilePromptTemplate,
} from "@/api/api";
import { mock_project1_tree } from "@/mock";

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
      promptText: "",
      messageList: [{ type: "receive", message: "hello world" }],
      projectTree: [],
    };
  }

  private projectId: number = 1;

  componentDidMount(): void {
    getProjectFileTree(this.projectId).then((res) => {
      // 树结构转化
      const convert = (node) => {
        console.log("🚀 ~ convert ~ node:", node);
        return {
          key: node.id,
          title: node.name,
          children: node.children
            ? node.children.map((child) => convert(child))
            : [],
        };
      };
      const treenodeData = res.template_tree.map((node) => convert(node));
      this.setState({
        projectTree: treenodeData,
      });
    });
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    message.error(error.message);
  }

  onPrompFiletOpen({ type, title, id }) {
    const fetchFileContentPromise =
      type === "section" ? getPromptSection : getPromptTemplate;

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

  addSectionToEditor({ key, title, type }) {
    const { currentPromptFile } = this.state;
    if (currentPromptFile) {
      const text = currentPromptFile.getContent();
      if (type !== "section") {
        throw new Error("cannot add template as section");
      }
      const textList = text.concat([
        {
          id: `${key}-${getRandom()}`,
          source: title,
          type: "prompt_section",
        },
      ]);
      currentPromptFile.setContent(textList);
    }
  }

  previewPrompt() {
    const { currentPromptFile } = this.state;
    const prompt = currentPromptFile.getContent();
    const convertedPrompt = prompt.map((s) => {
      if (s.type === "prompt_section") {
        return `{{prompt: ${s.source}}}`;
      } else {
        return s.text;
      }
    });
    this.setState({
      promptText: convertedPrompt.join(""),
    });
  }

  createPrompt() {
    const { promptText } = this.state;
    const { confirm } = Modal;
    const content = `🚀 ~ create prompt from template using<${promptText}>`;

    confirm({
      title: "create prompt",
      content,
      okText: "go to debug",
      onOk: () => {
        this.setState((state) => {
          const { messageList: m } = state;
          return {
            ...state,
            messageList: m.concat([{ type: "post", message: content }]),
            promptText: "",
          };
        });
      },
      okButtonProps: {
        className: "text-gray-900 border-slate-500",
      },
      cancelText: "return to rebuild",
    });
  }

  onMessageListChange() {
    const { messageList } = this.state;
    if (messageList.length > 0) {
      const last = messageList[messageList.length - 1];
      if (last.type === "post") {
        Promise.resolve(`${last.message} result from GPT~~`).then((res) => {
          this.setState((state) => {
            return {
              ...state,
              messageList: state.messageList.concat([
                { type: "receive", message: res },
              ]),
            };
          });
        });
      }
    }
  }

  handleAddAgent() {
    console.log("add agent");
  }

  render() {
    const { currentPromptFile, promptText, messageList, projectTree } =
      this.state;
    const items = [
      {
        key: "project",
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>Project</div>
            <Button
              onClick={this.createPrompt}
              type="text"
              icon={<PlusOutlined />}
            />
          </div>
        ),
        children: (
          <Tree
            fieldNames={{ title: "title", key: "key", children: "children" }}
            onSelect={(selectedKeys, { node }) => {
              if (node?.type !== "folder") {
                this.onPrompFiletOpen(node);
              }
            }}
            treeData={[
              { id: 1, name: "sad", type: "folder", children: null },
              { id: 5, name: "翻译官.pmt", type: "prompt", children: null },
            ]}
            // onRightClick={({ node }) => this.addSectionToEditor(node)}
          />
        ),
      },
    ];
    return (
      <div className="xstudio-prompt">
        <div className="left">
          <div className="prompt-explorer h-full bg-slate-50">
            <label className="p-4 text-sm font-medium text-gray-900 justify-start flex">
              EXPLORER
            </label>
            <div className="overflow-y-auto">
              <Collapse
                items={items}
                defaultActiveKey={["project"]}
                bordered={false}
              />
            </div>
          </div>
        </div>
        <div className="center">
          <div className="h-full">
            <label className="p-2 font-medium text-gray-900 justify-center flex bg-slate-50">
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
                className="m-2 font-medium bg-slate-200 text-slate-700 border-slate-500"
                onClick={this.previewPrompt}
              >
                save and preview
              </Button>
              {currentPromptFile?.getType() === "template" ? (
                <Button
                  className="m-2 font-medium bg-slate-200 text-slate-700 border-slate-500"
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
