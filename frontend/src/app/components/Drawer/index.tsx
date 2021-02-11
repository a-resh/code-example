import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';

interface Props {
  isShow: boolean;
  setIsShow: any;
}

export default function CustomDrawer({ isShow, setIsShow }: Props) {
  // const [show, setIsShow] = useState(isShow)
  const s = () => {
    setIsShow();
  };
  return (
    <Drawer anchor={'right'} open={isShow} onClose={s}>
      <p>Hi!</p>
    </Drawer>
  );
}
