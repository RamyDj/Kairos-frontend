export const questions = [
    // Questions de droit
    {
      id: 1,
      question: "Si vous lancez une startup et embauchez des stagiaires, devez-vous les déclarer à l'URSSAF ?",
      options: [
        "Oui, toujours, même si le stage est non rémunéré",
        "Non, seulement si les stagiaires sont rémunérés",
        "Non, pas besoin de déclaration pour les stagiaires",
        "Oui, mais uniquement si le stage dépasse 2 mois"
      ],
      answer: 0, // Index de la bonne réponse
      type: 'legal'
    },
    {
      id: 2,
      question: "En tant qu'auto-entrepreneur, vous décidez de vendre des produits en ligne. Quel document devez-vous fournir à vos clients pour chaque vente ?",
      options: [
        "Un reçu ou une facture",
        "Une note d’information",
        "Une confirmation de commande par e-mail uniquement",
        "Aucun document n'est nécessaire"
      ],
      answer: 0, // Index de la bonne réponse
      type: 'legal'
    },
    {
      id: 3,
      question: "Quelle est la durée minimale légale d’un contrat de travail à durée déterminée (CDD) en France ?",
      options: [
        "1 mois",
        "6 mois",
        "1 an",
        "Aucune durée minimale"
      ],
      answer: 3, // Index de la bonne réponse
      type: 'legal'
    },
    {
      id: 4,
      question: "Si vous souhaitez enregistrer une marque, quel organisme devez-vous contacter en France ?",
      options: [
        "L'INPI (Institut National de la Propriété Industrielle)",
        "Le Tribunal de Commerce",
        "L’URSSAF",
        "La Chambre de Commerce"
      ],
      answer: 0, // Index de la bonne réponse
      type: 'legal'
    },
    {
      id: 5,
      question: "Quel est le principal objectif du droit de la consommation en France ?",
      options: [
        "Protéger les droits des entreprises",
        "Garantir la confidentialité des données des consommateurs",
        "Protéger les consommateurs contre les pratiques commerciales abusives",
        "Réguler les relations entre les fournisseurs"
      ],
      answer: 2, // Index de la bonne réponse
      type: 'legal'
    },
    {
      id: 6,
      question: "En France, quel est le délai légal de rétractation pour un achat en ligne ?",
      options: [
        "7 jours",
        "14 jours",
        "30 jours",
        "60 jours"
      ],
      answer: 1, // Index de la bonne réponse
      type: 'legal'
    },
    {
      id: 7,
      question: "Pour ouvrir un compte bancaire professionnel en France, quel document est généralement requis ?",
      options: [
        "Un extrait K-bis",
        "Une facture d'eau",
        "Une attestation d'emploi",
        "Une copie du bail commercial"
      ],
      answer: 0, // Index de la bonne réponse
      type: 'legal'
    },

    
    // Questions de commerce
    {
      id: 8,
      question: "Quel est le principal avantage d'une étude de marché avant de lancer un nouveau produit ?",
      options: [
        "Déterminer la meilleure stratégie de publicité",
        "Identifier les concurrents directs uniquement",
        "Comprendre les besoins et les attentes des consommateurs",
        "Fixer le prix de vente sans avoir besoin d'ajustements"
      ],
      answer: 2, // Index de la bonne réponse
      type: 'commerce'
    },
    {
      id: 9,
      question: "Quel outil est couramment utilisé pour mesurer l'efficacité des campagnes de marketing numérique ?",
      options: [
        "Un tableau de bord financier",
        "Des enquêtes de satisfaction client",
        "Des analyses de données web (Google Analytics)",
        "Des rapports de vente mensuels"
      ],
      answer: 2, // Index de la bonne réponse
      type: 'commerce'
    },
    {
      id: 10,
      question: "Quelle stratégie de prix consiste à fixer un prix initial élevé pour un nouveau produit afin de maximiser les profits avant que la concurrence n'arrive ?",
      options: [
        "La stratégie de pénétration",
        "La stratégie de skimming (écrémage)",
        "La stratégie de prix psychologique",
        "La stratégie de prix de comparaison"
      ],
      answer: 1, // Index de la bonne réponse
      type: 'commerce'
    },
    {
      id: 11,
      question: "Quelle méthode est souvent utilisée pour optimiser les coûts dans une entreprise ?",
      options: [
        "Augmenter les prix des produits",
        "Réduire les dépenses opérationnelles et améliorer l'efficacité",
        "Élargir la gamme de produits",
        "Embaucher plus de personnel"
      ],
      answer: 1, // Index de la bonne réponse
      type: 'commerce'
    },
    {
      id: 12,
      question: "Quel est le principal objectif d'une analyse SWOT pour une entreprise ?",
      options: [
        "Évaluer la rentabilité des produits",
        "Identifier les forces, faiblesses, opportunités et menaces de l'entreprise",
        "Déterminer les prix de vente",
        "Mesurer la satisfaction des employés"
      ],
      answer: 1, // Index de la bonne réponse
      type: 'commerce'
    },
    {
      id: 13,
      question: "Quelle est la principale fonction du plan d'affaires (business plan) pour un entrepreneur ?",
      options: [
        "Obtenir des financements en présentant des projections financières",
        "Définir les tâches quotidiennes des employés",
        "Créer des stratégies de marketing détaillées",
        "Établir un calendrier de production"
      ],
      answer: 0, // Index de la bonne réponse
      type: 'commerce'
    },
    {
      id: 14,
      question: "Quel est le principal objectif d'une stratégie de fidélisation client ?",
      options: [
        "Augmenter le volume de ventes à court terme",
        "Améliorer la visibilité de la marque",
        "Encourager les clients à revenir et à acheter à nouveau",
        "Réduire les coûts de production"
      ],
      answer: 2, // Index de la bonne réponse
      type: 'commerce'
    }
]