"use client"; // error components must be client components

import { useEffect } from "react";

function Error({ error, reset }) {
  return (
    <div>
      <h2>An error occurred: {error?.message}</h2>

      {/* attempt to recover by trying to re-render the segment */}
      <button onClick={reset}>Try again</button>
    </div>
  );
}

export default Error;
