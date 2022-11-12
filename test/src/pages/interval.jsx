import { useRef } from 'react';
import { useState } from 'react';
import { useInterval } from 'react-hook-list';

function Interval() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const [, rerender] = useState(0);
  const [triggered, setTriggered] = useState(0);
  const [cancel, restart] = useInterval(() => setTriggered((c) => c + 1), 2e3);
  // useInterval(null, 2e3);
  return (
    <>
      <div>
        {triggered
          ? `Triggered: ${triggered}`
          : 'Waiting 2 seconds for timeout'}
      </div>
      <div>Render count: {renderCount.current}</div>
      <button onClick={() => rerender(Math.random())}>re-render</button>
      <button
        onClick={() => {
          setTriggered(0);
          restart();
        }}
      >
        restart
      </button>
      <button onClick={() => cancel()}>stop</button>
    </>
  );
}

export default Interval;
