import { FileNodeType, PromptFileInstance } from '@/types/prompt';

export default class Document {
  private projectId: string;
  private promptSectionList: PromptFileInstance[];

  constructor(data: FileNodeType, fileRegisterHook: () => void) {}
}
