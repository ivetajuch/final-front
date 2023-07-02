

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
    }
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    const response = await axios.get('http://localhost:8080/questions');
    const { data } = response;
    const sortedQuestions = data.questions.sort((a, b) => new Date(b.date) - new Date(a.date));
    setQuestions(sortedQuestions);
  };

  const handleQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const postQuestion = async () => {
    await axios.post('http://localhost:8080/question', {
      text: newQuestion,
    });
    setNewQuestion('');
    fetchAllQuestions();
  };

  return (
    <div>
      {isLoggedIn && (
        <div>
          <input
            type="text"
            value={newQuestion}
            onChange={handleQuestionChange}
            placeholder="Enter your question"
          />
          <button onClick={postQuestion}>Add Question</button>
        </div>
      )}
      {questions.map((question) => (
        <div key={question.id}>
          <div>{question.text}</div>
          <div>{question.date}</div>
          <a href={`/question-page/${question.id}`}>See All Answers</a>
        </div>
      ))}
    </div>
  );
};

export default MainPage;