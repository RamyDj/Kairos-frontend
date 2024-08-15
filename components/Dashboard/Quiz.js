import { useState } from 'react';
import { questions } from '../../datas/quiz'
import { useRouter } from 'next/router';
import { useDispatch, useSelector} from 'react-redux';
import { userSkill } from '../../reducers/user';
import { Modal, Button } from 'antd';

import styles from '../../styles/Quiz.module.css';

function QuizPage(){

    //Reducer
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value);
    console.log(user)
      

  // const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [score, setScore] = useState({ legalScore: 0, commerceScore: 0 })

  const [showModal,setShowModal] = useState(false)

  //redirection
  const router = useRouter()

  if(!user.token) {
    router.push('/')
  }

  const handleAnswer = (questionId, selectedOptionIndex) => {
    const question = questions.find(q => q.id === questionId);
    const isCorrect = selectedOptionIndex === question.answer;
    const scoreIncrement = 200 / questions.length; 

    // Enregistrer la réponse de l'utilisateur
    setUserAnswers(prev => ({...prev,[questionId]: selectedOptionIndex}))

    // Mettre à jour le score si la réponse est correcte
    if (isCorrect) {
      const updatedScore = { ...score }

      if (question.type === 'legal') {
        updatedScore.legalScore += scoreIncrement
      } else if (question.type === 'commerce') {
        updatedScore.commerceScore += scoreIncrement
      }
      setScore(updatedScore)
    }

    // Passer à la question suivante
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      saveResults()
    }
  }

  const saveResults = () => {
     const roundedScore = {
      legalScore: Math.floor(score.legalScore), 
      commerceScore: Math.floor(score.commerceScore)
    }

    fetch(`http://localhost:3000/dashboard/save-scores`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: user.token, score: roundedScore })
      }).then(response => response.json())
      .then(data => {
        console.log(data)
          if(data.result) {
            dispatch(userSkill({ skills: { legal: roundedScore.legalScore, commerce: roundedScore.commerceScore } }))
            router.push('/dashboard')
          }
      })
  }

  //Recupération donnée du tableau de questions 
  const currentQuestion = questions[currentQuestionIndex];

  //Option de réponse
  const questionAnswer = currentQuestion.options.map((option, i) => (
      <button className={styles.button} key={i} onClick={() => handleAnswer(currentQuestion.id, i)}>
        {option}
      </button>
    
  ))

  //Gestion Annulation
  const handleCancel = () => {
    setShowModal(true)
  }

  const confirmCancel = () => {
    setShowModal(false)
    router.push('/dashboard')
  }
  const cancelAnnulation = () =>{
    setShowModal(false)
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Quiz sur les connaissances en droit et commerce</h1>
        <h2>Question {currentQuestionIndex +1}/{questions.length}</h2>
        <div>
           <h3> {currentQuestion.question}</h3>
            <div className={styles.answer}>{questionAnswer}</div>
        </div>
      </div>
      <div>
        <button className = {styles.buttonCancel} onClick={() => handleCancel()}>Annuler Quizz</button>
      </div>
      <Modal
          title="Annuler Quiz"
          open={showModal}
          centered
          closable={false}
          footer={[
          <Button key="ok" type="primary" onClick={() => {confirmCancel()}}>
              Confirmer
          </Button>,
          <Button key="cancel" onClick={() => cancelAnnulation()}>
              Annuler
          </Button>
          ]}
      >
        <p>En cliquant sur ce lien, le quiz sera réinitialisé et vous serez redirigé vers la page d'accueil. Continuer?</p>
      </Modal>
    </div>
  )
}
export default QuizPage
