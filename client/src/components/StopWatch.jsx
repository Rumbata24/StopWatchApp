import { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIDRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIDRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIDRef.current);
    };
  }, [isRunning]);

  //   start
  const handleStart = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  //   Stop
  const handleStop = () => {
    setIsRunning(false);
  };

  //   reset
  const handleReset = () => {
    setElapsedTime(0);
    isRunning(false);
  };

  const formatTimeUnit = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliSeconds = Math.floor((elapsedTime / 10) % 100);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliSeconds = String(milliSeconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliSeconds}`;
  };

  return (
    <section>
      <div className="number-container">
        <p>{formatTimeUnit()}</p>
      </div>
      <div className="button-container">
        <button className="start" onClick={handleStart}>
          Start
        </button>
        <button className="stop" onClick={handleStop}>
          Stop
        </button>
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </section>
  );
};

export default StopWatch;
