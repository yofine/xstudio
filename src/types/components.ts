import { DataNode } from 'antd/lib/tree';

export type TreePropType = {
  onSelect: (selectedKeys: string, info: any, event?: any) => void;
  treeData?: DataNode;
};

export type PromptTextType = {
  id: string;
  type: 'plain_text' | 'prompt_section';
  content: string;
};

export type SessionMessageType = {
  type: 'post' | 'receive';
  message: string;
};
