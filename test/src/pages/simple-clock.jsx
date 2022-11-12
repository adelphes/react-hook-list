import React from 'react';
import { useInterval } from 'react-hook-list';

export const SimpleClock = () => {
  useInterval(null, 1000);
  return <>{new Date().toLocaleTimeString()}</>;
};
