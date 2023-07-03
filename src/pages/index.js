import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './styles.module.css';

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
    <div className={styles.container}>
      {isLoggedIn && (
        <div className={styles.questionForm}>
          <input
            className={styles.questionInput}
            type="text"
            value={newQuestion}
            onChange={handleQuestionChange}
            placeholder="Enter your question"
          />
          <button className={styles.addQuestion} onClick={postQuestion}>
            Add Question
          </button>
        </div>
      )}
      {questions.map((question) => (
        <div className={styles.question} key={question.id}>
          <div>
            <div className={styles.questionText}>{question.text}</div>
            <div className={styles.questionDate}>{question.date}</div>
          </div>
          <div className={styles.link}>
            <Link href={`/questions/${question.id}`}>
              <button className={styles.viewAnswers}>See All Answers</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;