// import { useState } from "react";

const StartForm = () => {
  // const [duration, setDuration] = useState<number>(0);

  return (
    <div className="fixed right-0 top-0 flex min-h-screen w-full items-center justify-center bg-slate-800">
      <main className="flex h-1/2 w-1/2 items-center justify-center rounded-lg bg-white">
        <div>
          <p>Choose your time</p>
          <div className="flex gap-5">
            <label className="flex gap-1">
              <input type="checkbox" />
              <span>300</span>
            </label>
            <label className="flex gap-1">
              <input type="checkbox" />
              <span>300</span>
            </label>
            <label className="flex gap-1">
              <input type="checkbox" />
              <span>300</span>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartForm;
