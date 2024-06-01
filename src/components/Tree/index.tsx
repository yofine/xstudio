import React, { useState, useRef } from 'react';
import { Tree, Dropdown, Menu } from 'antd';
import { DataNode } from 'antd/lib/tree';

type TreePropType = Omit<TreeProps, 'onSelect' | 'onRightClick'> & {
  onSelect?: (selectedKeys: any, info: { node: any }) => void;
  onRightClick?: (info: { node: any; event: React.MouseEvent<HTMLDivElement, MouseEvent> }) => void;
  treeData?: DataNode[];
};

const App = (props: TreePropType) => {
  const { onSelect, treeData, onRightClick } = props;
  const [rightClickNodeTreeItem, setRightClickNodeTreeItem] = useState(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // tree node click
  const onNodeSelect = (selectedKeys: any, info: { node: any }) => {
    if (info.node) {
      onSelect && onSelect(selectedKeys, info);
    }
  };

  // tree node rightclick
  const onNodeRightClick = (info: { node: any; event: React.MouseEvent<HTMLDivElement, MouseEvent> }) => {
    if (info.node) {
      setRightClickNodeTreeItem({
        pageX: info.event.clientX,
        pageY: info.event.clientY,
        ...info.node,
      });
      onRightClick && onRightClick(info);
    }
  };

  const handleMenuClick: Menu['onClick'] = (e) => {
    console.log('Menu click', e);
    switch (e.key) {
      case 'newAgent':
        // Handle new agent
        break;
      case 'publishAgent':
        // Handle publish agent
        break;
      case 'deleteAgent':
        // Handle delete agent
        break;
      default:
        break;
    }
    setRightClickNodeTreeItem(null); // Close the menu after an action is taken
  };

  const menuItems: Menu['items'] = [
    {
      key: 'newAgent',
      label: '新建Agent',
    },
    {
      key: 'publishAgent',
      label: '发布Agent',
    },
    {
      key: 'deleteAgent',
      label: '删除Agent',
    },
  ];

  const renderRightClickMenu = () => {
    if (!rightClickNodeTreeItem) return null;
    return (
      <Dropdown
        menu={{ items: menuItems, onClick: handleMenuClick }}
        visible
        trigger={['contextMenu']}
        onVisibleChange={(flag) => {
          if (!flag) setRightClickNodeTreeItem(null);
        }}
        getPopupContainer={() => document.body}
      >
        <div
          ref={contextMenuRef}
          style={{
            position: 'absolute',
            left: rightClickNodeTreeItem.pageX,
            top: rightClickNodeTreeItem.pageY,
            zIndex: 9999,
          }}
        />
      </Dropdown>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <Tree
        showLine
        autoExpandParent
        multiple={false}
        onSelect={onNodeSelect}
        onRightClick={onNodeRightClick}
        treeData={treeData}
      />
      {renderRightClickMenu()}
    </div>
  );
};

export default App;
