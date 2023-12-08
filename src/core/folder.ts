import { PromptTextType } from '@/types/components';
import {
  PromptFolderType,
  PromptType,
  PromptBlockType,
  promptTypeMap,
  PromptFolderInstance,
  PromptFileInstance,
  PromptFileSystemNode,
  PromptFileType,
} from '@/types/prompt';

export default class PromptFolder implements PromptFolderInstance {
  private id: string;
  private name: string;
  private children: Array<PromptFileSystemNode>;

  constructor(data: PromptFolderType) {
    this.id = data.id;
    this.name = data.name;
    this.children = data.children;
  }

  get displayName() {
    return this.name;
  }

  set displayName(n: string) {
    this.name = n;
  }

  getId(): string {
    return this.id;
  }

  getChildren(sorted?: boolean): Array<PromptFileSystemNode> {
    return this.children;
  }

  addChild(node: PromptFileSystemNode): void {
    this.children.push(node);
  }

  deleteChild(node: string | PromptFileSystemNode): any {
    if (typeof node === 'string') {
      const idx = this.children.findIndex((item) => item.getId() === node);
    }
  }
}
