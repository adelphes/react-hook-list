import { useRef } from 'react';
import { useState } from 'react';
import { useTimeout } from 'react-hook-list';

function Timeout() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const [, rerender] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const [cancel, restart] = useTimeout(() => setTriggered(true), 5e3);
  return (
    <>
      <div>{triggered ? 'Triggered' : 'Waiting 5 seconds for timeout'}</div>
      <div>Render count: {renderCount.current}</div>
      <button onClick={() => rerender(Math.random())}>re-render</button>
      <button
        onClick={() => {
          setTriggered(false);
          restart();
        }}
      >
        restart
      </button>
      <button onClick={() => cancel()}>cancel</button>
    </>
  );
}

export default Timeout;
