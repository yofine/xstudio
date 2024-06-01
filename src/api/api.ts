import * as Axios from 'axios';
import { message as Message } from 'antd';
import { PromptFileType } from '@/types/prompt';

const axios = Axios.default.create({
  baseURL: '/api',
  headers: {
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    'Access-Control-Allow-Origin': '*',
  },
});

axios.interceptors.response.use(
  ({ data }) => {
    const { code, message, body } = data;
    if (code !== 200) {
      Message.error(message);
      return Promise.reject(data);
    } else {
      return body;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getProjectList = (
  page?: number,
  pageSize?: number
): Promise<any> => {
  return axios.get(`/project/list/${page || 1}/${pageSize || 100}`);
};

export const getProjectFileTree = async (projectId: number): Promise<any> => {
 try {
    // Mock data
    const mockResponse = [
      { id: 1, name: "sad", type: "folder", children: null },
      { id: 5, name: "翻译官.pmt", type: "prompt", children: null }
    ];

    // Convert mock data to string
    const responseString = JSON.stringify(mockResponse);

    // Log the response string
    console.log(responseString);

    // Return the mock response to mimic axios behavior
    return { data: mockResponse };
  } catch (error) {
    console.error('Error fetching project file tree:', error);
    throw error;
  }
};

export const getPromptTemplate = (
  templateId: number
): Promise<PromptFileType> => {
  return axios.get(`/prompt_template/get/${templateId}`);
};

export const updatePrompTemplate = (data: PromptFileType): Promise<void> => {
  const { id, content, ...others } = data;
  return axios.put(`/prompt_template/update/${id}`, {
    id,
    ...others,
    content: content.join(''),
  });
};

export const compilePromptTemplate = (templateId: number): Promise<void> => {
  return axios.post(`/prompt_template/compile/${templateId}`);
};

export const publishPromptTemplate = (templateId: number): Promise<void> => {
  return axios.post(`/prompt_template/publish`, { template_id: templateId });
};

export const getPromptSection = (
  sectionId: number
): Promise<PromptFileType> => {
  return axios.get(`/prompt_section/id/${sectionId}`);
};

export const updatePrompSection = (data: PromptFileType): Promise<void> => {
  const { id, content, ...others } = data;
  return axios.put(`/prompt_section/update/${id}`, {
    id,
    ...others,
    content: content.join(''),
  });
};
