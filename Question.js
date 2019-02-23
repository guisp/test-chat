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
                'answer': 2
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
            {
                'question': 'Quem pintou "Guernica"?',
                'alternatives' : [
                    'Paul Cézanne',
                    'Pablo Picasso',
                    'Diego Rivera',
                    'Tarsila do Amaral',
                    'Salvador Dalí'
                ],
                'answer': 1
            },
            {
                'question': 'Quais o menor e o maior país do mundo?',
                'alternatives' : [
                    'Vaticano e Rússia',
                    'Nauru e China',
                    'Mônaco e Canadá',
                    'Malta e Estados Unidos',
                    'São Marino e Índia'
                ],
                'answer': 0
            },
            {
                'question': 'Qual o grupo em que todas as palavras foram escritas corretamente?',
                'alternatives' : [
                    'Asterístico, beneficiente, meteorologia, entertido',
                    'Asterisco, beneficente, meteorologia, entretido',
                    'Asterisco, beneficente, metereologia, entretido',
                    'Asterístico, beneficiente, metereologia, entretido',
                    'Asterisco, beneficiente, metereologia, entretido'
                ],
                'answer': 1
            },
            {
                'question': 'Atualmente, quantos elementos químicos a tabela periódica possui?',
                'alternatives' : [
                    '113',
                    '109',
                    '108',
                    '118',
                    '92'
                ],
                'answer': 3
            },
            {
                'question': 'Quais são os três predadores do reino animal reconhecidos pela habilidade de caçar em grupo, se camuflar para surpreender as presas e possuir sentidos apurados, respectivamente:',
                'alternatives' : [
                    'Tubarão branco, crocodilo e sucuri',
                    'Tigre, gavião e orca',
                    'Hiena, urso branco e lobo cinzento',
                    'Orca, onça e tarântula',
                    'Leão, tubarão branco e urso cinzento'
                ],
                'answer': 2
            },
            {
                'question': 'Em qual local da Ásia o português é língua oficial?',
                'alternatives' : [
                    'Índia',
                    'Filipinas',
                    'Moçambique',
                    'Macau',
                    'Portugal'
                ],
                'answer': 3
            },
            {
                'question': 'Quais destas construções famosas ficam nos Estados Unidos?',
                'alternatives' : [
                    'Estátua da Liberdade, Golden Gate Bridge e Empire State Building',
                    'Estátua da Liberdade, Big Ben e The High Line',
                    'Angkor Wat, Taj Mahal e Skywalk no Grand Canyon',
                    'Lincoln Memorial, Sidney Opera House e Burj Khalifa',
                    '30 St Mary Axe, The High Line e Residencial 148 Spruce Street'
                ],
                'answer': 0
            },
            {
                'question': 'Qual destes países é transcontinental?',
                'alternatives' : [
                    'Rússia',
                    'Filipinas',
                    'Istambul',
                    'Groenlândia',
                    'Tanzânia'
                ],
                'answer': 0
            },
            {
                'question': 'Quais os planetas do sistema solar?',
                'alternatives' : [
                    'Terra, Vênus, Saturno, Urano, Júpiter, Marte, Netuno, Mercúrio',
                    'Júpiter, Marte, Mercúrio, Netuno, Plutão, Saturno, Terra, Urano, Vênus',
                    'Vênus, Saturno, Urano, Júpiter, Marte, Netuno, Mercúrio',
                    'Júpiter, Marte, Mercúrio, Netuno, Plutão, Saturno, Sol, Terra, Urano, Vênus',
                    'Terra, Vênus, Saturno, Júpiter, Marte, Netuno, Mercúrio'
                ],
                'answer': 0
            },
            {
                'question': 'Qual o tema do famoso discurso Eu Tenho um Sonho, de Martin Luther King?',
                'alternatives' : [
                    'Luta contra o Apartheid',
                    'Justiça para os menos favorecidos',
                    'Intolerância religiosa',
                    'Prêmio Nobel da Paz',
                    'Igualdade das raças'
                ],
                'answer': 4
            },
            {
                'question': 'Qual desses filmes foi baseado na obra de Shakespeare?',
                'alternatives' : [
                    'Muito Barulho por Nada (2012)',
                    'Capitães de Areia (2011)',
                    'A Dama das Camélias (1936)',
                    'A Revolução dos Bichos (1954)',
                    'Excalibur (1981)'
                ],
                'answer': 0
            },
            {
                'question': 'Segundo o tratado assinado em 1971, que região do planeta ficou interdita a armas nucleares?',
                'alternatives' : [
                    'Sara',
                    'África',
                    'Antártida',
                    'Bahamas',
                    'Portugal'
                ],
                'answer': 2
            },
            {
                'question': 'Quanto tempo demora a Lua a dar a volta à Terra (período orbital)?',
                'alternatives' : [
                    '27 dias e 8 horas',
                    '25 dias',
                    '30 dias',
                    '29 dias e 12 horas',
                    '7 dias'
                ],
                'answer': 0
            },
            {
                'question': 'Que país sul-americano é o maior produtor de vinho?',
                'alternatives' : [
                    'Brasil',
                    'Venezuela',
                    'Canadá',
                    'Argentina',
                    'Chile'
                ],
                'answer': 3
            },
            {
                'question': 'O que é o Reino de Deus?',
                'alternatives' : [
                    'algo que está no coração?',
                    'algo simbólico?',
                    'um governo no céu?'
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