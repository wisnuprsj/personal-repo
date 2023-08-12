import { useState, useEffect } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const minStep = 1;
  const maxStep = 3;

  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setStep(1);
  }, []);

  const nextStep = () => {
    if (step < maxStep) {
      setStep((prevState) => prevState + 1);
    }
  };

  const prevStep = () => {
    if (step > minStep) {
      setStep((prevState) => prevState - 1);
    }
  };

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="close" onClick={handleOpenClose}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={prevStep}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
