/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './Aptitude.css';
import Navbar from '../Components/Navbar';


const Aptitude1 = () => {
  const [timeRemaining, setTimeRemaining] = useState(14 * 60 + 25);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('STUDENT');
  const [intervalId, setIntervalId] = useState(null);
  const correctAnswer = 'C';

  if (!intervalId) {
    const newIntervalId = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(newIntervalId); 
          setIsSubmitted(true); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(newIntervalId);
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionClick = (option) => {
    if (!isSubmitted) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsSubmitted(true);
      clearInterval(intervalId); 
    }
  };

  return (
      <div className="container">
      <div className="mainContent">
        <Navbar />
        <div className='hero'>
        <div className="tabsContainer">
          <div className={`tab ${activeTab === 'STUDENT' ? 'activeTab' : ''}`} onClick={() => setActiveTab('STUDENT')}>STUDENT</div>
          <div className={`tab ${activeTab === 'ADMIN' ? 'activeTab' : ''}`} onClick={() => setActiveTab('ADMIN')}>ADMIN</div>
        </div>

        <div className="infoBar">
          <div className="codeBox">CODE #abcd</div>
          <div className="timerBox">Time remaining: {formatTime(timeRemaining)}</div>
        </div>
        </div>

        <div className="questionContainer">
          <div className="section">
            <div className="sectionHeader">{isSubmitted ? "#After submission:" : "#Before submission:"}</div>
            <div className="questionTitle">
              Question 1:
            </div>
            <p>If all Zings are Bings, and some Bings are Lings, which of the following statements must be true?</p>
            
            <div className="optionsContainer">
              {["A", "B", "C", "D"].map((option) => (
                <div
                  key={option}
                  className={`option 
                    ${selectedAnswer === option ? "selectedOption" : ""} 
                    ${isSubmitted && option === correctAnswer ? "correctOption" : ""} 
                    ${isSubmitted && selectedAnswer === option && selectedAnswer !== correctAnswer ? "incorrectOption" : ""}`}
                  onClick={() => handleOptionClick(option)}
                >
                  <div className={`optionLetter 
                    ${selectedAnswer === option ? "selectedLetter" : ""} 
                    ${isSubmitted && option === correctAnswer ? "correctLetter" : ""} 
                    ${isSubmitted && selectedAnswer === option && selectedAnswer !== correctAnswer ? "incorrectLetter" : ""}`}>
                    {option}
                  </div>
                  <div>
                    {option === "A" && "All Zings are Lings"}
                    {option === "B" && "Some Zings might be Lings"}
                    {option === "C" && "No Zings are Lings"}
                    {option === "D" && "All Lings are Bings"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isSubmitted && (
            <button className="submitButton" onClick={handleSubmit} disabled={!selectedAnswer}>
              Submit Test
            </button>
          )}
        </div>

        <div className="timerBottom">
          <p>Time remaining: {formatTime(timeRemaining)}</p>
        </div>
      </div>
      </div>
  );
};

export default Aptitude1;
