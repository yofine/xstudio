import React from 'react';
import { Tree, TreeProps } from 'antd';
import { DataNode } from 'antd/lib/tree';

const mockTreeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf1',
            key: '0-0-0-0',
          },
          {
            title: 'leaf2',
            key: '0-0-0-1',
          },
          {
            title: 'leaf3',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf4',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf5',
            key: '0-0-2-0',
          },
          {
            title: 'leaf6',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

type TreePropType = Omit<TreeProps, 'onSelect' | 'onRightClick'> & {
  onSelect?: (node: any) => void;
  onRightClick?: (node: any) => void;
  treeData?: DataNode[];
};

const App = (props: TreePropType) => {
  const { onSelect, treeData, onRightClick } = props;
  // tree node click
  const onNodeSelect = (selectedKeys, info) => {
    if (info.node) {
      onSelect && onSelect(info.node);
    }
  };

  // tree node rightclick
  const onNodeRightClick = ({ node, event }) => {
    if (node) {
      onRightClick && onRightClick(node);
    }
  };
  return (
    <Tree
      showLine
      autoExpandParent
      multiple={false}
      onSelect={onNodeSelect}
      onRightClick={onNodeRightClick}
      treeData={mockTreeData}
    />
  );
};
export default App;
