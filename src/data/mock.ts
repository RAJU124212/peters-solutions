export type Categoria = {
  slug: string;
  nome: string;
  emoji: string;
  descricao: string;
};

export const CATEGORIAS: Categoria[] = [
  { slug: "eletricista", nome: "Eletricista", emoji: "⚡", descricao: "Instalações, reparos e manutenção elétrica residencial." },
  { slug: "encanador", nome: "Encanador", emoji: "🔧", descricao: "Vazamentos, desentupimentos e instalações hidráulicas." },
  { slug: "diarista", nome: "Diarista", emoji: "🧺", descricao: "Limpeza geral, faxina pesada e organização." },
  { slug: "jardinagem", nome: "Jardinagem", emoji: "🌿", descricao: "Poda, paisagismo e cuidado com plantas tropicais." },
  { slug: "costureira", nome: "Costura e Reparos", emoji: "🧵", descricao: "Ajustes, consertos e confecção sob medida." },
  { slug: "marmita", nome: "Comida Caseira", emoji: "🍲", descricao: "Marmitas, encomendas e quitutes regionais." },
];

export const BAIRROS = [
  "Nossa Senhora das Graças",
  "Embratel",
  "Centro",
  "Areal",
  "Rio Madeira",
  "São João Bosco",
];

export type Prestador = {
  id: string;
  nome: string;
  categoria: string;
  bairro: string;
  nota: number;
  avaliacoes: number;
  bio: string;
  inicial: string;
  cor: string;
  verificado: boolean;
  servicosFeitos: number;
  whatsapp: string;
};

const cores = ["#c2410c", "#15803d", "#b45309", "#7c2d12", "#166534", "#9a3412", "#365314", "#92400e"];

export const PRESTADORES: Prestador[] = [
  { id: "p1", nome: "Raimundo Nogueira", categoria: "eletricista", bairro: "Nossa Senhora das Graças", nota: 4.9, avaliacoes: 32, bio: "Eletricista há 18 anos em PVH. Atendimento rápido, sem furada. Trabalho com nota e sem nota.", inicial: "RN", cor: cores[0], verificado: true, servicosFeitos: 124, whatsapp: "5569991110001" },
  { id: "p2", nome: "Maria Conceição da Silva", categoria: "diarista", bairro: "Embratel", nota: 5.0, avaliacoes: 41, bio: "Faxina pesada, passo roupa e deixo tudo no lugar. Disponível segundas, quartas e sextas.", inicial: "MC", cor: cores[1], verificado: true, servicosFeitos: 210, whatsapp: "5569992220002" },
  { id: "p3", nome: "Seu Antônio Bezerra", categoria: "encanador", bairro: "Nossa Senhora das Graças", nota: 4.8, avaliacoes: 27, bio: "Encanador, especialista em vazamento difícil de achar. Atendo emergência fim de semana.", inicial: "AB", cor: cores[2], verificado: true, servicosFeitos: 88, whatsapp: "5569993330003" },
  { id: "p4", nome: "Dona Francisca", categoria: "marmita", bairro: "Embratel", nota: 4.9, avaliacoes: 56, bio: "Marmita caseira, comida de Rondônia. Tem tambaqui na sexta e tucupi na quarta. Encomenda na véspera.", inicial: "DF", cor: cores[3], verificado: true, servicosFeitos: 312, whatsapp: "5569994440004" },
  { id: "p5", nome: "Cleiton Souza", categoria: "jardinagem", bairro: "Rio Madeira", nota: 4.7, avaliacoes: 19, bio: "Cuido de jardim, poda de árvore alta, plantas tropicais. Tenho equipamento próprio.", inicial: "CS", cor: cores[4], verificado: true, servicosFeitos: 64, whatsapp: "5569995550005" },
  { id: "p6", nome: "Dona Lourdes Almeida", categoria: "costureira", bairro: "Centro", nota: 5.0, avaliacoes: 38, bio: "Costureira há 30 anos. Ajuste de roupa, vestido de festa e reforma. Preço justo.", inicial: "LA", cor: cores[5], verificado: true, servicosFeitos: 178, whatsapp: "5569996660006" },
  { id: "p7", nome: "Jorge dos Santos", categoria: "eletricista", bairro: "Areal", nota: 4.6, avaliacoes: 14, bio: "Instalação de chuveiro, ventilador de teto, tomadas. Orçamento sem compromisso.", inicial: "JS", cor: cores[6], verificado: false, servicosFeitos: 31, whatsapp: "5569997770007" },
  { id: "p8", nome: "Tia Neusa", categoria: "diarista", bairro: "São João Bosco", nota: 4.8, avaliacoes: 22, bio: "Limpeza pós-obra é minha especialidade. Pontual e capricho garantido.", inicial: "TN", cor: cores[7], verificado: true, servicosFeitos: 73, whatsapp: "5569998880008" },
];

export const AVALIACOES_MOCK = [
  { autor: "Helena M.", bairro: "Nossa Senhora das Graças", nota: 5, data: "há 3 dias", texto: "Resolveu o problema do disjuntor em 20 minutos. Pontual e cobrou o combinado." },
  { autor: "Carlos R.", bairro: "Embratel", nota: 5, data: "há 1 semana", texto: "Ótimo profissional, explicou tudo o que estava fazendo. Recomendo demais." },
  { autor: "Sandra L.", bairro: "Areal", nota: 4, data: "há 2 semanas", texto: "Bom serviço, chegou um pouco depois do horário mas o trabalho ficou impecável." },
];
