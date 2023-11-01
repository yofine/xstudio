import React, { useRef } from "react";
import * as monaco from "monaco-editor";
import { useEffect } from "react";

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    monaco.editor.create(editorRef.current, {
      value: 'console.log("Hello, world")',
      language: "javascript",
      minimap: {
        enabled: false,
      },
    });
  }, []);
  return (
    <div
      ref={editorRef}
      id="container"
      style={{ width: 800, height: 600 }}
    ></div>
  );
};

export default Editor;
