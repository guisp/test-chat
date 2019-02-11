module.exports = class Question {   
    
    constructor(questionId) {
        this.perguntas = [
            {
                'question': 'De onde é a invenção do chuveiro elétrico?',
                'alternatives' : [
                    'França',
                    'Inglaterra',
                    'Brasil',
                    'Austrália',
                    'Itália'
                ],
                'answer': 3
            },
            {
                'question': 'De quem é a famosa frase "Penso, logo existo"?',
                'alternatives' : [
                    'Platão',
                    'Galileu Galilei',
                    'Descartes',
                    'Sócrates',
                    'Francis Bacon'
                ],
                'answer': 2
            },
        ];

        this.index = 0;
        this.question = this.perguntas[this.index];
    }

    set pergunta(questionId) {
        this.question = this.perguntas[questionId];
        this.index = questionId;
    }

    get pergunta() {
        return this.question.question;
    }

    get alternativas() {
        return this.question.alternatives;
    }

    get resposta() {
        return this.question.answer;
    }

    acertou(index) {
        return (this.question.answer === index);
    }

    next() {
        if(this.perguntas[this.index + 1] !== undefined) {
            this.pergunta = this.index + 1;

            return true;
        } else {
            return false;
        }        
    }
}