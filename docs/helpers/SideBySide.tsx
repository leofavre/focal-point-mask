import React, { PropsWithChildren } from 'react';

const SideBySide = ({ children }: PropsWithChildren<{}>) => (
  <div className="side-by-side">{children}</div>
);

export default SideBySide;
