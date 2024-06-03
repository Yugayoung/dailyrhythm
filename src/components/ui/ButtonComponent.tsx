import { Button, Flex } from 'antd';
import React from 'react';

interface ButtonComponentProps {
  backgroundColor: string;
  text: string;
  onClick: () => void;
}

export default function ButtonComponent({
  backgroundColor,
  text,
  onClick,
}: ButtonComponentProps) {
  return (
    <Flex gap='small' wrap>
      <Button onClick={onClick} type='primary' style={{ backgroundColor }}>
        {text}
      </Button>
    </Flex>
  );
}
