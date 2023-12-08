import { PromptTextType } from '@/types/components';
import {
  PromptFileType,
  PromptType,
  PromptBlockType,
  promptTypeMap,
  PromptFileInstance,
} from '@/types/prompt';

export default class PromptFile implements PromptFileInstance {
  private projectId: number;
  private id: number;
  private name: string;
  private type: PromptType;
  private content: PromptBlockType[];
  private onContentChange: (c) => void;

  constructor(data: PromptFileType, onContentChange?: (c) => void) {
    this.projectId = data.project_id;
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.content = data.content;
    this.onContentChange = onContentChange;
  }

  toData(): PromptFileType {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      content: this.content,
      project_id: this.projectId,
    };
  }

  get displayName() {
    return this.name + '.' + promptTypeMap[this.type];
  }

  set displayName(n: string) {
    const v = n.split('.');
    if (v.length !== 2) {
      throw new Error('file name is not available');
    } else {
      const [name, suffix] = v;
      let type = null;
      for (const [k, v] of Object.entries(promptTypeMap)) {
        if (v === suffix) {
          type = k;
        }
      }
      if (!type) {
        throw Error('file type is not supported');
      }
      this.name = name;
      this.type = type;
    }
  }

  getId(): number {
    return this.id;
  }

  getType(): PromptType {
    return this.type;
  }

  setContent(c: PromptBlockType[]): void {
    this.content = c;
    this.onContentChange && this.onContentChange(c);
  }

  getContent(): PromptBlockType[] {
    return this.content;
  }
}
