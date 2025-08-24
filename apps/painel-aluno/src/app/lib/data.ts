export type Member = { id: string; nome: string };
export type SquadData = Record<string, Member[]>;
export type SquadNames = Record<string, string>;

export const squadNames: SquadNames = {
  "1": "Squad 1 - NodeBreakers",
  "2": "Squad 2 - NorthSolutions",
  "3": "Squad 3 - Os Refatoradores",
  "4": "Squad 4 - Push Masters",
  "5": "Squad 5 - Hi5",
};

export const squadsData: SquadData = {
  "1": [
    { id: "Ana", nome: "Ana Vitoria Cezar Macedo" },
    { id: "David", nome: "David Camargo Rech" },
    { id: "Felipe", nome: "Felipe Lohan Farias dos Santos" },
    { id: "Livia", nome: "Livia Santos Alves de Souza" },
    { id: "William", nome: "William Douglas Barreto da Conceição" },
  ],
  "2": [
    { id: "erick", nome: "Erick Barros Ferreira Gomes" },
    { id: "pedro", nome: "Pedro Henrique Fernandes Santos" },
    { id: "gustavo-s", nome: "Gustavo de Souza da Silva" },
    { id: "khayan", nome: "Khayan Godinho Ferreira Chagas" },
    { id: "miszael", nome: "Miszael Nunes da Costa" },
  ],
  "3": [
    { id: "glenda", nome: "Glenda Souza Fernandes dos Santos" },
    { id: "vitor", nome: "Vitor Pio Vieira" },
    { id: "matheus", nome: "Matheus Lacerda Macedo" },
    { id: "fernando", nome: "Fernando Canabarro Ahnert" },
  ],
  "4": [
    { id: "andre", nome: "Andre Luis Almeida Alves" },
    { id: "michael", nome: "Michael Nascimento de Bastos" },
    { id: "gustavo-santos", nome: "Gustavo Souto dos Santos" },
    { id: "sarah", nome: "Sarah Rafaella Feitosa dos Santos" },
    { id: "gabriel", nome: "Gabriel Vinicios de Oliveira" },
  ],
  "5": [
    { id: "anderson", nome: "Anderson Moreira Amaral" },
    { id: "luis", nome: "Luis Vinicius Cerqueira Oliveira" },
    { id: "lorraine", nome: "Lorraine Lacerda Brasil Souza" },
    { id: "lucio", nome: "Lucio Filipe Albuquerque do Espirito Santo" },
    { id: "diego", nome: "Diego Wobeto Maglia Muller" },
  ],
};
