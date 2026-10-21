import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(60);
  const [step, setStep] = useState("");
  const [isRunning, setIsRunning] = useState(true);


  useEffect(() => {
    if (!isRunning || count === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, count]);


  const handleDecrease = () => {
    const value = Number(step);

    if (step.trim() === "" || !Number.isFinite(value) || value <= 0) {
      return;
    }

    setCount((prev) => Math.max(0, prev - value));
    setStep("");
  };


  const handleToggle = () => {
    if (count === 0) return;

    setIsRunning((prev) => !prev);
  };


  const handleReset = () => {
    setCount(60);
    setStep("");
    setIsRunning(true);
  };

  return (
    <div className="container">
      <h1>Таймер обратного отсчёта</h1>

      <h2 className="timer">{count}</h2>

      <div className="input-group">
        <input
          type="number"
          min="1"
          placeholder="Введите число"
          value={step}
          onChange={(e) => setStep(e.target.value)}
        />

        <button onClick={handleDecrease} disabled={count === 0}>
          Списать / Уменьшить
        </button>
      </div>

      <div className="buttons">
        <button onClick={handleToggle} disabled={count === 0}>
          {isRunning ? "Пауза" : "Старт"}
        </button>

        <button onClick={handleReset}>Сброс</button>
      </div>

      <p>
        Статус: {count === 0 ? "Время закончилось" : isRunning ? "Работает" : "Пауза"}
      </p>
    </div>
  );
}
