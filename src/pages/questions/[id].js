import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import Navbar from '../../components/navbar/navbar';
import Navbar2 from '../../components/navbar2/navbar2';

function Event() {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkIfLoggedIn();
    router.query.id && fetchQuestion();
  }, [router.query.id]);

  const checkIfLoggedIn = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/question/${router.query.id}`);
      const { data } = response;
      setQuestion(data.question);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuestion = async () => {
    try {
      await axios.delete(`http://localhost:8080/question/${router.query.id}`);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const postAnswer = async () => {
    if (!isLoggedIn) {
      alert('Please log in to answer the question.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/question/${router.query.id}`, {
        answerText: answer,
      });
      const { answerId } = response.data;
      fetchQuestion();
      setAnswer('');
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div>
    {isLoggedIn ? <Navbar2 /> : <Navbar />}
    <div className={styles.container}> 
      {question && (
        <div className={styles.questionWrapper}>
          <div className={styles.question}>
          <h1 className={styles.questionText}>{question.text}</h1>
          {isLoggedIn && (
              <button className={styles.deleteQuestionButton} title="Delete question" onClick={deleteQuestion}>
                x
              </button>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.answerInput}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer"
              disabled={!isLoggedIn}
            />
            {isLoggedIn ? (
              <button className={styles.submitButton} onClick={postAnswer}>
                Submit
              </button>
            ) : (
              <button className={styles.submitButton} disabled>
                Submit
              </button>
            )}
          </div>

          {question.answers.length > 0 && (
            <div className={styles.answersWrapper}>
              <h2 className={styles.answers}>Answers:</h2>
              {question.answers
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((answer) => (
                  <div className={styles.answer} key={answer._id}>
                    <div className={styles.answerInfo}>
                      <div className={styles.answerText}>{answer.text}</div>
                      <div className={styles.answerDate}>{answer.date}</div>
                    </div>
                   </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
}

export default Event;

