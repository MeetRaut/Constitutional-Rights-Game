import React, { useState } from 'react';
import Scenario from './components/Scenario';
import Evidence from './components/Evidence';
import Puzzle from './components/Puzzle';
import CaseSummary from './components/CaseSummary';
import cases from './data/cases';

function Detective() {
  const [currentCase, setCurrentCase] = useState(0);
  const [selectedClue, setSelectedClue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const selectClue = (clue) => {
    setSelectedClue(clue);
  };

  const checkAnswer = (correct) => {
    setIsCorrect(correct);
  };

  const handleNextCase = () => {
    if (currentCase < cases.length - 1) {
      setCurrentCase(currentCase + 1);
      setSelectedClue("");
      setIsCorrect(null);
    }
  };

  const currentCaseData = cases[currentCase];

  return (
    <div className="App">
      <Scenario title={currentCaseData.title} scenario={currentCaseData.scenario} />
      {!isCorrect && (
        <>
          <Evidence clues={currentCaseData.clues} selectClue={selectClue} />
          <Puzzle selectedClue={selectedClue} correctAnswer={currentCaseData.correctAnswer} checkAnswer={checkAnswer} />
        </>
      )}
      {isCorrect !== null && (
        <>
          <CaseSummary isCorrect={isCorrect} solution={currentCaseData.solution} />
          <button 
            onClick={handleNextCase} 
            disabled={currentCase >= cases.length - 1}
            className="next-button"
          >
            {currentCase >= cases.length - 1 ? "No More Cases" : "Next Case"}
          </button>
        </>
      )}
    </div>
  );
}

export default Detective;