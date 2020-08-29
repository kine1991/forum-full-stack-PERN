import React from 'react';
import { Sidebar } from 'semantic-ui-react';

const SidebarComponent = () => {
  return (
    <Sidebar.Pushable>
      <Sidebar as={Menu} visible={true/*visible*/} animation='overlay' icon='labeled' inverted onHide={() => setVisible(false)} vertical width='thin'></Sidebar>
    </Sidebar.Pushable>
  )
}

export default SidebarComponent;