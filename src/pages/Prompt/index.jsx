import React from "react";
import Tree from "../../components/Tree";
import MonacoEditor from "react-monaco-editor";

import "./index.less";

const Prompt = () => {
  return (
    <div className="xstudio-prompt">
      <div className="left">
        <div className="prompt-module">
          <div className="module-title">工程</div>
          <div className="module-content">
            <Tree />
          </div>
        </div>
        <div className="prompt-module">
          <div className="module-title">Libary</div>
          <div className="module-content">
            <Tree />
          </div>
        </div>
        <div className="prompt-module">
          <div className="module-title">Tools</div>
          <div className="module-content">
            <Tree />
          </div>
        </div>
        <div className="prompt-module">
          <div className="module-title">知识库</div>
          <div className="module-content">
            <Tree />
          </div>
        </div>
      </div>
      <div className="center">
        <div className="prompt-editor">
          <MonacoEditor
            width="800"
            height="600"
            language="md"
            options={{ minimap: { enabled: false }, lineNumbers: "off" }}
          />
        </div>
      </div>
      <div className="right">
        <div className="prompt-debug">
          <div className="debug-title">调试</div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
