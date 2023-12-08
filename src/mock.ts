export const mock_projectList = [
  {
    projectId: 'p1',
    name: '项目1',
  },
  {
    projectId: 'p2',
    name: '项目2',
  },
  {
    projectId: 'p3',
    name: '项目3',
  },
];

export const mock_project1_file = [
  {
    id: 'sections1',
    title: 'sections1',
    type: 'folder',
    children: [
      {
        id: 'sections2',
        title: 'sections2',
        type: 'folder',
        children: [],
      },
      {
        id: 'section_title',
        title: 'title',
        type: 'section',
      },
      {
        id: 'section_action',
        title: 'action',
        type: 'section',
      },
    ],
  },
  {
    id: 'template1',
    title: 'mainTemplate',
    type: 'folder',
    children: [
      {
        id: 'template2',
        title: 'template2',
        type: 'folder',
        children: [],
      },
      {
        id: 'template_agent1',
        title: 'agent1',
        type: 'template',
      },
      {
        id: 'template_agent2',
        title: 'agent2',
        type: 'template',
      },
    ],
  },
];

export const mock_project1_tree = {
  id: 'projectid',
  title: 'project1',
  children: mock_project1_file,
};

export const mock_prompt_content = [
  {
    source: 'title',
    id: '0-0-0-1-ySsRETEG1701877626813',
    type: 'prompt_section',
  },
  {
    text: 'huhu',
    id: '56ZbhKkw1701877632525',
    type: 'plain_text',
  },
];
