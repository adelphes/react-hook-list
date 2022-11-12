import { useState } from 'react';
import { useRef } from 'react';
import { useAPI } from 'react-hook-list';

function APITest() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  const [page, setPage] = useState(1);
  const [badURL, setBadURL] = useState(false);
  const [data, err, isLoading, refresh] = useAPI(
    badURL
      ? 'https://abadurltogoto.com'
      : `https://reqres.in/api/users?page=${page}`
    // { /* slow: 10e3 */ }
  );
  return (
    <>
      <div>Render count: {renderCount.current}</div>
      <button onClick={() => refresh()}>refresh</button>
      <button onClick={() => setPage((p) => p + 1)}>next page</button>
      <button onClick={() => setBadURL((x) => !x)}>toggle bad url</button>
      {isLoading && <div>Loading...</div>}
      {data !== undefined && <div>{JSON.stringify(data, undefined, ' ')}</div>}
      {err && <div>{err.toString()}</div>}
    </>
  );
}

export default APITest;
