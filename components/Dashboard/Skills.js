import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'; 
import { Modal, Button } from 'antd';

import styles from '../../styles/Dashboard.module.css'

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function Skills() {
    const router = useRouter();
    const user = useSelector((state) => state.user.value);
    console.log(user)

    const legalScore = user.skills.legal;
    const commerceScore = user.skills.commerce;
    // const legalScore = 80;
    // const commerceScore = 20;

    const hasCompletedQuiz = legalScore ===  0 && commerceScore === 0;

    const goToQuizz = () => {
        router.push('/quiz');
    }

    //DONUT AFFICHAGE QUIZ
    const getChartData = (score, label) => {
        const percentage = score || 0; 
        return {
            labels: [label], 
            datasets: [
                {
                    data: [percentage, 100 - percentage],
                    backgroundColor: ['#163050', '#F9F2D2'],
                },
            ],
        };
    }
    const options = {
        responsive: true,
        cutout: '60%',
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return ` ${tooltipItem.raw}%`;
                    },
                },
            },
            legend: {
                display: true,
            },
        },
    }

    //MODAL
    const [showModal, setShowModal] = useState(false);
    const [typeModalContent, setTypeModalContent] = useState('');

    const confirmModal = () => {
        setShowModal(false);
    }

    const handleModal = (type) => {
        setTypeModalContent(type);
        setShowModal(true);
    }

    const ModalContent = () => {
        if (typeModalContent === 'commerce') {
            return (
                <div>
                    <h3>Stratégies de Marketing</h3>
                    <ul>
                        <li><a href="https://www.bpifrance.fr/A-la-une/Actualites/Le-guide-de-l-etude-de-marche-08-07-2020" >Guide de l'étude de marché - BPI France</a></li>
                        <li><a href="https://support.google.com/analytics/answer/6088560?hl=fr" >Google Analytics pour les débutants - Google</a></li>
                    </ul>
                    
                    <h3>Optimisation des Coûts</h3>
                    <ul>
                        <li><a href="https://www.cegid.com/fr/blog/optimiser-la-gestion-des-couts-en-entreprise/" >Guide sur la gestion des coûts - Cegid</a></li>
                        <li><a href="https://www.lesechos.fr/idees-debats/cercle/reduire-ses-couts-en-entreprise-1349349" >Réduction des coûts - Les Echos</a></li>
                    </ul>
                    
                    <h3>Plans d'Affaires et Fidélisation</h3>
                    <ul>
                        <li><a href="https://www.bpifrance.fr/A-la-une/Actualites/Le-guide-du-business-plan-08-07-2020" >Créer un Business Plan - BPI France</a></li>
                        <li><a href="https://blog.hubspot.fr/service-client/strategie-fidelisation-client" >Stratégies de fidélisation client - HubSpot</a></li>
                    </ul>
                    
                    <h3>Autres Quizz</h3>
                    <ul>
                        <li><a href="https://www.quizz.biz/quizz-335437.html" >Autre Quiz sur Commerces</a></li>
                    </ul>
                </div>
            )
        } else if (typeModalContent === 'legal') {
            return (
                <div>
                    <h3>Législation et Réglementation</h3>
                    <ul>
                        <li><a href="https://www.inpi.fr/" >INPI - Institut National de la Propriété Industrielle</a></li>
                        <li><a href="https://www.urssaf.fr/portail/home/mes-services-en-ligne/declaredesstagiaires.html" >URSSAF - Déclaration des stagiaires</a></li>
                    </ul>
                    
                    <h3>Documents Juridiques</h3>
                    <ul>
                        <li><a href="https://www.service-public.fr/professionnels-entreprises/vosdroits/F31853" >Modèle de Facture - Service-Public.fr</a></li>
                        <li><a href="https://www.legalplace.fr/modeles-contrats/" >Modèles de Contrats - LegalPlace</a></li>
                    </ul>
                    
                    <h3>Ressources Complémentaires</h3>
                    <ul>
                        <li><a href="https://www.legalstart.fr/blog/" >Le Blog du Droit des Affaires - Legalstart</a></li>
                        <li><a href="https://www.bpifrance.fr/A-la-une/Actualites/Le-guide-de-l-auto-entrepreneur-08-07-2020">Guide pour les auto-entrepreneurs - BPI France</a></li>
                    </ul>
                    
                    <h3>Autres Quizz</h3>
                    <ul>
                        <li><a href="https://eformation.asso-auxilia.fr/mod/hvp/view.php?id=148">Quiz Légal - Testez vos connaissances supplémentaires</a></li>
                    </ul>
                </div>
            )
        }
    }

    return (
        <div className={styles.skillsContainer}>
            <h2 className={styles.titleSkill}>Mes Compétences</h2>
            <div className={styles.skillsInfo}>
                {!hasCompletedQuiz ? (
                    <>
                        <p>Faire le quiz pour évaluer vos compétences en droit et commerce.</p>
                        <button onClick={()=>goToQuizz()}>Commencer le quizz</button>
                    </>
                ) : (
                    <>
                        <div className={styles.donutContainer}>
                                <Doughnut className={styles.doughnut} data={getChartData(commerceScore, 'Commerce')} options={options} onClick={() => handleModal('commerce')} />
                                <Doughnut className={styles.doughnut} data={getChartData(legalScore, 'Legal')} options={options} onClick={() => handleModal('legal')} />
                        </div>
                        <Modal
                            title={typeModalContent === 'commerce' ? "Ressources pour approfondir vos connaissances en commerce" : "Ressources pour approfondir vos connaissances en matière légale"}
                            open={showModal}
                            centered
                            closable={false}
                            footer={[
                                <Button key="ok" type="primary" onClick={confirmModal}>
                                    Ok
                                </Button>
                            ]}
                        >
                            {ModalContent()}
                        </Modal>
                    </>
                )}
            </div>
        </div>
    );
}

export default Skills;
