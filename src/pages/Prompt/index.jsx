import React from "react";
import Tree from "../../components/Tree";
import { Collapse } from "antd";

import "./index.less";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: "project",
    label: "Project",
    children: <Tree />,
  },
  {
    key: "library",
    label: "Library",
    children: <Tree />,
  },
  {
    key: "tools",
    label: "Tools",
    children: <Tree />,
  },
  {
    key: "konwledge",
    label: "Konwledge",
    children: <Tree />,
  },
];

const Prompt = () => {
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
              defaultActiveKey={["project"]}
              bordered={false}
            />
          </div>
        </div>
      </div>
      <div className="center">
        <div className="prompt-editor h-full">
          <label className="p-2 font-medium text-gray-900 justify-center flex bg-slate-50	">
            Prompt
          </label>
          <textarea
            rows="4"
            className=" bg-white block p-2.5 w-full h-full text-sm text-gray-900  border border-l-0  border-r-0  border-gray-300 focus:ring-gray-300 focus:border-gray-300 resize-none"
            placeholder="Write your prompts here..."
          ></textarea>
        </div>
      </div>
      <div className="right">
        <div className="prompt-debug">
          <label className="debug-title p-2 font-medium text-gray-900 justify-start flex">
            Run and Debug
          </label>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
