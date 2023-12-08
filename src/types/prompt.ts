import { Key } from 'react';

export type PromptType = 'section' | 'template';

// section 段落
export type PromptBlockType = {
  id: string;
  type: 'plain_text' | 'prompt_section';
  text?: string; // 文本文字
  source?: string; // | PromptFileType; // section文件源
  params?: any[]; // section 参数
};

// export type PromptBlock

// export type PromptBlockText = {
//   type: 'plain_text';
//   text?: string;  // 文本文字
// }

// export type PromptBlockSection = {
//   type: 'prompt_section';
//   source?: PromptFileType; // section文件源
//   params?: any[]; // section 参数
// };

// section文件
export type PromptFileType = {
  id: number;
  name: string;
  project_id: number;
  description?: string;
  type: PromptType;
  content: PromptBlockType[];
};

export type PromptFolderType = {
  id: string;
  name: string;
  children: Array<PromptFileSystemNode>;
};

export const promptTypeMap = {
  section: 'sec',
  template: 'tmpl',
};

export type FileNodeType = {
  id: string;
  name: string;
  fileType: 'file' | 'folder';
  children: FileNodeType[];
};

export interface PromptFileInstance {
  getType(): PromptType;
  toData(): PromptFileType;
  getId(): number;
  setContent(c: PromptBlockType[]): void;
  getContent(): PromptBlockType[];
}

export interface PromptFolderInstance {
  // toData(): PromptFolderType;
  getId(): string;
  getChildren(sorted?: boolean): Array<PromptFileSystemNode>;
  addChild(node: PromptFileSystemNode): void;
  deleteChild(node: string | PromptFileSystemNode): PromptFileSystemNode;
}

export type PromptFileSystemNode = PromptFileInstance | PromptFolderInstance;
