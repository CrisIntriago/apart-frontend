const learningRoute = [
    {
        "id": 1,
        "titulo": "Hola",
        "subtitulo": "Acabar una conversación",
        "type": "TAREA",
        "image": "https://picsum.photos/seed/1/200/200",
        "status": "IN_PROGRESS"
    },
    {
        "id": 2,
        "titulo": "Soy Cristian",
        "subtitulo": "Aprende a presentarte",
        "type": "TAREA",
        "image": "https://picsum.photos/seed/2/200/200",
        "status": "IN_PROGRESS"
    },
    {
        "id": 3,
        "titulo": "Lección 1",
        "subtitulo": "Afianza tu conocimiento",
        "type": "TEST",
        "image": "https://picsum.photos/seed/3/200/200",
        "status": "IN_PROGRESS"
    },
    {
        "id": 4,
        "titulo": "¿Cómo estás?",
        "subtitulo": "Usa frases comunes en conversaciones diarias",
        "type": "TAREA",
        "image": "https://picsum.photos/seed/4/200/200",
        "status": "IN_PROGRESS"
    },
    {
        "id": 5,
        "titulo": "El verbo 'to be'",
        "subtitulo": "Aprende a usar el verbo más importante",
        "type": "TAREA",
        "image": "https://picsum.photos/seed/5/200/200",
        "status": "IN_PROGRESS"
    },
    {
        "id": 6,
        "titulo": "Lección 2",
        "subtitulo": "Expande tu vocabulario",
        "type": "TEST",
        "image": "https://picsum.photos/seed/6/200/200",
        "status": "IN_PROGRESS"
    },
    {
        "id": 7,
        "titulo": "Mi familia",
        "subtitulo": "Cómo hablar sobre tu entorno familiar",
        "type": "TAREA",
        "image": "https://picsum.photos/seed/7/200/200",
        "status": "IN_PROGRESS"
    },
    {
        "id": 8,
        "titulo": "Hacer preguntas",
        "subtitulo": "Aprende a hacer preguntas de forma correcta",
        "type": "TAREA",
        "image": "https://picsum.photos/seed/8/200/200",
        "status": "COMPLETED"
    },
    {
        "id": 9,
        "titulo": "Lección 3",
        "subtitulo": "Mejora tu pronunciación",
        "type": "TEST",
        "image": "https://picsum.photos/seed/9/200/200",
        "status": "COMPLETED"
    },
    {
        "id": 10,
        "titulo": "En el restaurante",
        "subtitulo": "Frases útiles para ordenar comida",
        "type": "TAREA",
        "image": "https://picsum.photos/seed/10/200/200",
        "status": "COMPLETED"
    }
];

const lesson = [
    {
        "id": 1,
        "type": "word_ordering",
        "title": "El gato",
        "instructions": "Ordena las palabras para conseguir la oración correcta",
        "difficulty": "easy",
        "created_at": "2025-06-14T19:28:38.263186Z",
        "payload": {
            "words": [
                "El",
                "gato",
                "juega",
                "con",
                "los",
                "padres"
            ]
        }
    },
    {
        "id": 2,
        "type": "matching",
        "title": "Los tiempos",
        "instructions": "Selecciona el par de palabras ordenadas",
        "difficulty": "easy",
        "created_at": "2025-06-14T19:37:22.191836Z",
        "payload": {
            "pairs": [
                {
                    "left": "I",
                    "right": "yo"
                },
                {
                    "left": "you",
                    "right": "tú"
                },
                {
                    "left": "he",
                    "right": "el"
                },
                {
                    "left": "she",
                    "right": "ella"
                }
            ]
        }
    },
    {
        "id": 3,
        "type": "multiple_choice",
        "title": "Forma correcta de responder",
        "instructions": "Cual es la forma correcta de responder la sigueinte pregunta:\r\nDo you like pizza?",
        "difficulty": "medium",
        "created_at": "2025-06-14T19:47:19.296450Z",
        "payload": {
            "choices": [
                {
                    "id": 1,
                    "text": "Yes, I do"
                },
                {
                    "id": 2,
                    "text": "No, I am"
                },
                {
                    "id": 3,
                    "text": "I am Pizza"
                }
            ],
            "is_multiple": false
        }
    }
];