import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

function Event() {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState('');
  const router = useRouter();

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/question/${router.query.id}`);
      const { data } = response;
      setQuestion(data.question);
    } catch (error) {
      console.error(error);
    }
  };

  const postAnswer = async () => {
    try {
      await axios.post(`http://localhost:8080/question/${router.query.id}`, { answerText: answer });
      // Optionally, you can fetch the updated question with the answer
      fetchQuestion();
      // Clear the answer input field
      setAnswer('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    router.query.id && fetchQuestion();
  }, [router.query.id]);

  return (
    <div className={styles.container}>
      {question && (
        <div className={styles.questionWrapper}>
          <h1 className={styles.questionText}>{question.text}</h1>
          <div className={styles.inputWrapper}>
          <input className={styles.answerInput}
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button className={styles.submitButton} onClick={postAnswer}>Submit</button>
          </div>

<div className={styles.answersWrapper}>
          <h2 >Answers:</h2>
          {question.answers.map((answer) => (
            <div className={styles.answer} key={answer._id}>
              <p>{answer.text}</p>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;




