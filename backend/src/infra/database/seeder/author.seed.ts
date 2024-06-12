import { getBase64 } from "../../../infra/helpers/convert-images-bas-64.helper";
import { InputBook } from "../../../application/use-cases/book/create-book.use-case";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const Authors = [
  {
    id: randomUUID(),
    name: "George Orwel",
    birthDate: "1952-12-05",
  },
  {
    id: randomUUID(),
    name: "Marco A. Furlan",
    birthDate: "1952-12-05",
  },
  {
    id: randomUUID(),
    name: "Zhamak Dehghani",
    birthDate: "1952-12-05",
  },
  {
    id: randomUUID(),
    name: "Robert C. Martin",
    birthDate: "1952-12-05",
  },
  {
    id: randomUUID(),
    name: "Aditya Bhargava",
    birthDate: "1952-12-05",
  },
  {
    id: randomUUID(),
    name: "Alvaro Maia",
    birthDate: "1952-12-05",
  },
  {
    id: randomUUID(),
    name: "Ali Hazelwood",
    birthDate: "1952-12-05",
  },
  {
    id: randomUUID(),
    name: "Nilo Ney",
    birthDate: "1952-12-05",
  },
  {
    id: randomUUID(),
    name: "Andre Rezende",
    birthDate: "1952-12-05",
  },
];

const Books: InputBook[] = [
  {
    id: randomUUID(),
    title: "A revolução dos bichos: Um conto de fadas",
    author: Authors[0].name,
    releaseDate: "2008-08-11",
    description:
      "Verdadeiro clássico moderno, concebido por um dos mais influentes escritores do século XX, A revolução dos bichos é uma fábula sobre o poder. Narra a insurreição dos animais de uma granja contra seus donos. Progressivamente, porém, a revolução degenera numa tirania ainda mais opressiva que a dos humanos.",
  },
  {
    id: randomUUID(),
    title: "Algoritmos e Lógica da Programação",
    author: Authors[1].name,
    releaseDate: "2008-08-11",
    description:
      "Com linguagem simples e didática – sem, no entanto, fugir da complexidade do assunto –, o livro procura tornar prática a lógica de programação, além de mostrar aos estudantes um caminho mais adequado na construção dos algoritmos. O desenvolvimento do raciocínio lógico e da abstração de procedimentos e dados são as maiores dificuldades para os estudantes dos cursos introdutórios. Nesse sentido, os autores resolvem os problemas propostos passo a passo, apresentando todos os conceitos envolvidos por meio de fluxogramas e em conjunto com pseudocódigos.",
  },
  {
    id: randomUUID(),
    title:
      "Arquitetura de Software: as Partes Difíceis: Análises Modernas de Trade-off Para Arquiteturas Distribuída",
    author: Authors[2].name,
    releaseDate: "2008-08-11",
    description:
      "Arquitetura de Software: As Partes Difíceis Não há decisões fáceis na arquitetura de software. Pelo contrário, há muitas partes difíceis – problemas ou questões desafiadoras sem práticas recomendadas – que forçam você a escolher entre vários tipos de concessões. Com este livro, você aprenderá a pensar criticamente sobre as vantagens e desvantagens das arquiteturas distribuídas. Os veteranos em arquitetura e consultores profissionais Neal Ford, Mark Richards, Pramod Sadalage e Zhamak Dehghani discutem estratégias para a escolha de uma arquitetura adequada. Entrelaçando uma história sobre um grupo fictício de profissionais de tecnologia – o Sysops Squad – eles examinam tudo: desde como determinar a granularidade do serviço, gerenciar fluxos de trabalho e orquestração, gerenciar e dissociar contratos e gerenciar transações distribuídas; até como otimizar as características operacionais, como escalabilidade, elasticidade e desempenho. Com foco nas perguntas mais comuns, este livro oferece técnicas que o ajudam a descobrir e a avaliar os trade-offs ao enfrentar os problemas com os quais se depara como arquiteto. Analise os trade-offs e documente suas decisões de forma eficaz Tome decisões melhores com relação à granularidade do serviço Compreenda as complexidades da separação de aplicativos monolíticos Gerencie e dissocie contratos entre serviços Lide com dados em uma arquitetura altamente distribuída Aprenda padrões para gerenciar o fluxo de trabalho e as transações ao desmembrar aplicativos “Este livro é obrigatório para todo arquiteto que esteja criando sistemas distribuídos modernos.” ",
  },
  {
    id: randomUUID(),
    title: "Código Limpo: Habilidades Práticas do Agile Software (Clean Code)",
    author: Authors[3].name,
    releaseDate: "2008-08-11",
    description:
      "Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com uma empresa de desenvolvimento. Perdem-se a cada ano horas incontáveis e recursos importantes devido a um código mal escrito. Mas não precisa ser assim. O renomado especialista em software, Robert C. Martin, apresenta um paradigma revolucionário com Código limpo: Habilidades Práticas do Agile Software. Martin se reuniu com seus colegas do Mentor Object para destilar suas melhores e mais ágeis práticas de limpar códigos “dinamicamente” em um livro que introduzirá gradualmente dentro de você os valores da habilidade de um profissional de softwares e lhe tornar um programador melhor –mas só se você praticar.",
  },
  {
    id: randomUUID(),
    title:
      "Entendendo Algoritmos: Um Guia Ilustrado Para Programadores e Outros Curiosos",
    author: Authors[4].name,
    releaseDate: "2008-08-11",
    description:
      "Um guia ilustrado para programadores e outros curiosos. Um algoritmo nada mais é do que um procedimento passo a passo para a resolução de um problema. Os algoritmos que você mais utilizará como um programador já foram descobertos, testados e provados. Se você quer entendê-los, mas se recusa a estudar páginas e mais páginas de provas, este é o livro certo. Este guia cativante e completamente ilustrado torna simples aprender como utilizar os principais algoritmos nos seus programas. O livro Entendendo Algoritmos apresenta uma abordagem agradável para esse tópico essencial da ciência da computação. Nele, você aprenderá como aplicar algoritmos comuns nos problemas de programação enfrentados diariamente. Você começará com tarefas básicas como a ordenação e a pesquisa. Com a prática, você enfrentará problemas mais complexos, como a compressão de dados e a inteligência artificial. Cada exemplo é apresentado em detalhes e inclui diagramas e códigos completos em Python. Ao final deste livro, você terá dominado algoritmos amplamente aplicáveis e saberá quando e onde utilizá-los.O que este livro inclui: a abordagem de algoritmos de pesquisa, ordenação e algoritmos gráficos; mais de 400 imagens com descrições detalhadas; comparações de desempenho entre algoritmos; exemplos de código em Python.",
  },
  {
    id: randomUUID(),
    title:
      "A filosofia do Bitcoin - A evolução do sistema monetário e garantia de propriedade contra leis abusivas, estados autoritários e instabilidades econômicas. ",
    author: Authors[5].name,
    releaseDate: "2008-08-11",
    description:
      "UM LIVRO COMPACTO E ESCLARECEDOR. O Estado e a moeda estão mergulhados em uma crise profunda que nos obriga a rever os nossos sistemas de crenças políticas e econômicas. Neste livro, Álvaro María, mestre em auditoria e especialista em Direito e Biotecnologia pela Universidade de Madri, aborda o impacto do Bitcoin, explicando sua essência e como ele possui qualidades específicas que representam uma revolução no sistema monetário global. O autor oferece uma visão das vantagens do Bitcoin, como a promessa de maior liberdade e segurança, e redefinição do conceito de propriedade privada, estabelecendo-a como independente de qualquer soberania estatal. Pontuando suas análises com uma perspectiva filosófica e respaldado por autores como Hayek, Joseph Schumpeter, Adam Smith, Carl Menger, Tocqueville, entre outros, María traduz conceitos complexos para os leitores, esclarecendo a distinção entre dinheiro e moeda e explorando também as inovações que o Bitcoin traz aos campos econômico, jurídico e político. Com a proposta de aproximar os leitores do universo bitcoiner, esta é uma obra que traz informações essenciais para quem quer conhecer profundamente a proposta antes de começar a investir na moeda digital.",
  },
  {
    id: randomUUID(),
    title: "A hipótese do amor",
    author: Authors[6].name,
    releaseDate: "2008-08-11",
    description:
      "Quando um namoro de mentira entre cientistas encontra a irresistível força da atração, todas as teorias cuidadosamente calculadas sobre o amor são postas à prova. Com personagens cativantes e diálogos afiados, este livro engraçado, sexy e inteligente se tornou uma das grandes sensações do TikTok. Olive Smith, aluna do doutorado em Biologia da Universidade Stanford, acredita na ciência – não em algo incontrolável como o amor. Depois de sair algumas vezes com Jeremy, ela percebe que sua melhor amiga gosta dele e decide juntá-los. Para mostrar que está feliz com essa escolha, Olive precisa ser convincente: afinal, cientistas exigem provas. Sem muitas opções, ela resolve inventar um namoro de mentira e, num momento de pânico, beija o primeiro homem que vê pela frente.",
  },
  {
    id: randomUUID(),
    title:
      "Introdução à Programação com Python – 4ª Edição: Algoritmos e lógica de programação para iniciantes",
    author: Authors[7].name,
    releaseDate: "2008-08-11",
    description:
      "Este livro se destina ao iniciante em programação e foi escrito para ajudar o leitor autodidata a aprender a programar. Também pode ser utilizado em cursos de introdução à computação e mesmo em cursos mais avançados, nos quais o domínio das técnicas básicas de programação e da linguagem Python sejam requeridos. Aborda os conceitos básicos de programação, como expressões, variáveis, repetições, decisões, listas, dicionários, conjuntos, funções, arquivos, classes, objetos, SQL, banco de dados (SQLite 3), expressões regulares e interfaces gráficas com Tkinter, com exemplos e exercícios. Conceitos matemáticos necessários à programação são incluídos para facilitar a compreensão dos exercícios. Recursos mais avançados da computação são mencionados, permitindo ao leitor continuar a aprender conceitos mais complexos em outros textos. Embora o livro pretenda ensinar a linguagem Python (versão 3.12 ou superior), a prioridade maior é ensinar a programar, com muitos exercícios de lógica de programação, fornecendo uma preparação mais ampla ao leitor, independente de linguagem. O objetivo é mostrar os conceitos, muitas vezes sem usar todos os recursos modernos e poderosos do Python. No fim de cada capítulo são apresentados códigos que usam progressivamente cada vez mais os recursos de Python. O site que acompanha o livro traz vídeos, listagens, exercícios resolvidos e dúvidas frequentes, que podem ser utilizados como material suplementar. O software utilizado no livro pode ser baixado gratuitamente, sendo compatível com Windows, Linux e Mac OS X.",
  },
  {
    id: randomUUID(),
    title:
      "Liderança 4.1: Como se tornar o protagonista do futuro e o líder de que o mundo precisa",
    author: Authors[8].name,
    releaseDate: "2008-08-11",
    description:
      "Em um mundo onde mudanças são uma constante, os verdadeiros líderes precisam se antecipar a elas. Unindo teoria e experiências pessoais, André Rezende monta um guia para todos que desejam se tornar protagonistas do futuro, líderes 4.1. O líder 4.1 entende que o futuro não nasce, mas se constrói; ele é o elo entre aprendizados do passado, vivências do presente e necessidades do futuro. É aquele que se comunica com eficácia e separa tempo para ouvir, que administra bem o seu tempo e incentiva o aumento de autoconhecimento e performance. É quem conduz e forma times de alta performance, eleva o desempenho do time, valorizando seus pontos positivos, e sabe gerenciar conflitos. É aquele que experimenta diferentes caminhos e cenários, acerta e erra com resiliência, mas, sobretudo, assume riscos. Está pronto para se tornar um líder 4.1?",
  },
];

const imagesFile = [
  {
    imagePath64: "1984.jpg",
  },
  {
    imagePath64: "algoritmos.jpg",
  },
  {
    imagePath64: "arquitetura_de_software.jpg",
  },
  {
    imagePath64: "clean_code.jpg",
  },
  {
    imagePath64: "entendendo_algoritmos.jpg",
  },
  {
    imagePath64: "filosofia_do_bitcoin.jpg",
  },
  {
    imagePath64: "hipotese_do_amor.jpg",
  },
  {
    imagePath64: "introducao_ao_python.jpg",
  },
  {
    imagePath64: "lideranca-4-1.jpg",
  },
  {
    imagePath64: "logica_de_programacao.jpg",
  },
  {
    imagePath64: "refactor.jpg",
  },
];

export const BookSeed = async () => {
  let i = 0;

  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  for (const book of Books) {
    const author = Authors.find((a) => a.name === book.author);
    if (!author) {
      console.error(`Author not found for book: ${book.title}`);
      continue;
    }
    await prisma.$transaction([
      prisma.author.create({
        data: {
          id: author.id,
          name: author.name,
          birthDate: author.birthDate,
        },
      }),
      prisma.book.create({
        data: {
          id: book.id,
          title: book.title,
          releaseDate: book.releaseDate,
          description: book.description,
          authorId: author.id,
          imageUrl: await getBase64(imagesFile[i].imagePath64),
        },
      }),
    ]);

    i++;
  }
};
