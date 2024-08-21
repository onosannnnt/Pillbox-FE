import React from "react";
import { Spin, SpinProps } from "antd";

const Loading: React.FC<SpinProps> = (props: SpinProps): JSX.Element => {
  return <Spin {...props} />;
};

export default Loading;
