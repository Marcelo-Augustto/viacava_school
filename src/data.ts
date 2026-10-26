export const business = {
  name: "Teacher Viacava",
  tagline: "Inglês com Teacher Viacava",
  whatsapp: "555197369925",
  whatsappDisplay: "+55 51 9736-9925",
  instagramHandle: "@_viacava",
  instagram: "https://www.instagram.com/_viacava/",
  message:
    "Olá, Teacher Viacava! Encontrei seu site e gostaria de saber mais sobre as aulas de inglês.",
} as const;

export const whatsappUrl = (message: string = business.message) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;

export const benefits = [
  {
    icon: "spark",
    title: "Aulas personalizadas",
    text: "Conteúdos e atividades adaptados aos seus objetivos e ao seu nível de inglês.",
  },
  {
    icon: "pace",
    title: "Aprendizado no seu ritmo",
    text: "Evolua com acompanhamento individual e atenção às suas dificuldades.",
  },
  {
    icon: "world",
    title: "Inglês para a vida real",
    text: "Desenvolva habilidades para situações do cotidiano, viagens, estudos e trabalho.",
  },
  {
    icon: "talk",
    title: "Mais confiança para conversar",
    text: "Pratique o idioma e ganhe segurança para se comunicar em inglês.",
  },
] as const;

export const lessons = [
  ["01", "Inglês para iniciantes", "Construa uma base sólida e dê os primeiros passos para se comunicar."],
  ["02", "Conversação", "Desenvolva vocabulário, fluência e confiança em situações reais."],
  ["03", "Inglês para o trabalho", "Pratique situações profissionais e amplie suas possibilidades de comunicação."],
  ["04", "Viagens e cotidiano", "Prepare-se para lidar com momentos práticos do dia a dia em inglês."],
] as const;

export const faqs = [
  {
    question: "As aulas são individuais?",
    answer:
      "As aulas são pensadas de forma personalizada. Para confirmar os formatos disponíveis no momento, fale diretamente comigo pelo WhatsApp.",
  },
  {
    question: "Preciso saber inglês para começar?",
    answer:
      "Não. O ponto de partida é o seu momento atual. A proposta é entender o que você já sabe e construir um caminho coerente com seus objetivos.",
  },
  {
    question: "Como funciona o acompanhamento?",
    answer:
      "O conteúdo e as práticas são direcionados às suas necessidades. Os detalhes do acompanhamento são combinados de acordo com a proposta de aulas mais adequada para você.",
  },
  {
    question: "Posso focar em conversação?",
    answer:
      "Sim, conversação pode ser um dos focos das aulas. Vamos conversar sobre os contextos em que você quer usar o inglês e planejar as práticas a partir disso.",
  },
  {
    question: "Como descubro os horários disponíveis?",
    answer:
      "A disponibilidade pode mudar. Envie uma mensagem pelo WhatsApp para consultar os horários atuais e conversar sobre as possibilidades.",
  },
  {
    question: "Como faço para começar?",
    answer:
      "É simples: entre em contato pelo WhatsApp, conte um pouco sobre seus objetivos e tire suas dúvidas. A partir daí, conversamos sobre o melhor próximo passo.",
  },
] as const;
