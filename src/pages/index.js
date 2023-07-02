import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [questions, setQuestions] = useState([]);

  const fetchAllQuestions = async () => {
    const response = await axios.get("http://localhost:8080/questions");
    const { data } = response; 
    setQuestions(data.questions);
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <div>{question.text}</div>
          <a href={`/question-page/${question.id}`}>See All Answers</a>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
