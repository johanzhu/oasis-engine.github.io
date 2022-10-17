import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { PropsWithChildren } from 'react';

interface DocMenuProps {
  items: ItemType[];
  selectedDocId: string;
  setSelectedDocId: React.Dispatch<React.SetStateAction<string>>;
  defaultOpenKeys: string;
}

function DocMenu(props: PropsWithChildren<DocMenuProps>) {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click menu event: ', e);
    props.setSelectedDocId(e.key);
  };
  if (!props.defaultOpenKeys) {
    return null;
  }

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={[props.defaultOpenKeys]}
        defaultOpenKeys={[props.defaultOpenKeys]}
        mode='inline'
        items={props.items}
        selectedKeys={[props.selectedDocId]}
      />
    </>
  );
}

export default DocMenu;
