import { useState } from "react";

export const useShowHide = (initial: any) => {
  const [visible, setVisible] = useState(initial);
  const onShow = (visibleKey: string) => {
    setVisible({ ...visible, [visibleKey]: true });
  };

  const onHide = () => {
    setVisible(initial);
  };

  const onToggle = (visibleKey: string) => {
    setVisible({ ...visible, [visibleKey]: (prev: boolean) => !prev });
  };

  return { visible, onShow, onHide, onToggle };
};