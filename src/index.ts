import { asc, desc, eq } from "drizzle-orm";
import { closePrompt, ask, pause } from "./utils/prompt";
import { db, cidade, noticia, uf } from "./db";

type NoticiaLinha = {
  noticiaId: number;
  titulo: string;
  texto: string;
  dataCriacao: string;
  cidadeId: number;
  cidadeNome: string;
  ufId: number;
  ufNome: string;
  ufSigla: string;
};

function normalizarTexto(valor: string): string {
  return valor.trim().replace(/\s+/g, " ");
}

function formatarData(valor: string): string {
  const data = new Date(valor.replace(" ", "T") + "Z");
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "America/Sao_Paulo"
  }).format(data);
}

async function listarUfs(): Promise<void> {
  const ufs = await db.select().from(uf).orderBy(asc(uf.sigla));
  if (ufs.length === 0) {
    console.log("\nNenhuma UF cadastrada.");
    return;
  }

  console.log("\nUFs cadastradas:");
  for (const item of ufs) {
    console.log(`  ${item.id} - ${item.nome} (${item.sigla})`);
  }
}

async function listarCidades(): Promise<void> {
  const cidades = await db
    .select({
      id: cidade.id,
      nome: cidade.nome,
      ufId: uf.id,
      ufNome: uf.nome,
      ufSigla: uf.sigla
    })
    .from(cidade)
    .innerJoin(uf, eq(cidade.ufId, uf.id))
    .orderBy(asc(uf.sigla), asc(cidade.nome));

  if (cidades.length === 0) {
    console.log("\nNenhuma cidade cadastrada.");
    return;
  }

  console.log("\nCidades cadastradas:");
  for (const item of cidades) {
    console.log(`  ${item.id} - ${item.nome} (${item.ufSigla})`);
  }
}

async function cadastrarUf(): Promise<void> {
  console.log("\n=== Cadastrar UF ===");
  const nome = normalizarTexto(await ask("Nome da UF: "));
  const sigla = normalizarTexto(await ask("Sigla da UF: ")).toUpperCase();

  if (!nome || !sigla) {
    console.log("\nNome e sigla são obrigatórios.");
    return;
  }

  const existente = await db.select().from(uf).where(eq(uf.sigla, sigla)).limit(1);
  if (existente.length > 0) {
    console.log("\nJá existe uma UF com essa sigla.");
    return;
  }

  await db.insert(uf).values({ nome, sigla });
  console.log("\nUF cadastrada com sucesso.");
}

async function cadastrarCidade(): Promise<void> {
  console.log("\n=== Cadastrar cidade ===");
  const ufs = await db.select().from(uf).orderBy(asc(uf.sigla));

  if (ufs.length === 0) {
    console.log("\nCadastre uma UF antes de cadastrar cidades.");
    return;
  }

  console.log("\nSelecione a UF:");
  for (const item of ufs) {
    console.log(`  ${item.id} - ${item.nome} (${item.sigla})`);
  }

  const ufId = Number(await ask("\nInforme o ID da UF: "));
  if (!Number.isInteger(ufId)) {
    console.log("\nID inválido.");
    return;
  }

  const ufSelecionada = await db.select().from(uf).where(eq(uf.id, ufId)).limit(1);
  if (ufSelecionada.length === 0) {
    console.log("\nUF não encontrada.");
    return;
  }

  const nome = normalizarTexto(await ask("Nome da cidade: "));
  if (!nome) {
    console.log("\nNome da cidade é obrigatório.");
    return;
  }

  await db.insert(cidade).values({ nome, ufId });
  console.log("\nCidade cadastrada com sucesso.");
}

async function cadastrarNoticia(): Promise<void> {
  console.log("\n=== Cadastrar notícia ===");
  const cidades = await db
    .select({
      id: cidade.id,
      nome: cidade.nome,
      ufSigla: uf.sigla
    })
    .from(cidade)
    .innerJoin(uf, eq(cidade.ufId, uf.id))
    .orderBy(asc(uf.sigla), asc(cidade.nome));

  if (cidades.length === 0) {
    console.log("\nCadastre ao menos uma cidade antes de cadastrar notícias.");
    return;
  }

  console.log("\nCidades disponíveis:");
  for (const item of cidades) {
    console.log(`  ${item.id} - ${item.nome} (${item.ufSigla})`);
  }

  const cidadeId = Number(await ask("\nInforme o ID da cidade: "));
  if (!Number.isInteger(cidadeId)) {
    console.log("\nID inválido.");
    return;
  }

  const cidadeSelecionada = cidades.find((item) => item.id === cidadeId);
  if (!cidadeSelecionada) {
    console.log("\nCidade não encontrada.");
    return;
  }

  const titulo = normalizarTexto(await ask("Título: "));
  const texto = normalizarTexto(await ask("Texto: "));

  if (!titulo || !texto) {
    console.log("\nTítulo e texto são obrigatórios.");
    return;
  }

  await db.insert(noticia).values({
    titulo,
    texto,
    cidadeId
  });

  console.log("\nNotícia cadastrada com sucesso.");
}

async function listarNoticiasOrdenadas(descendente: boolean): Promise<void> {
  const ordem = descendente ? "mais recentes primeiro" : "mais antigas primeiro";
  console.log(`\n=== Listar notícias (${ordem}) ===`);

  const noticias = await db
    .select({
      noticiaId: noticia.id,
      titulo: noticia.titulo,
      texto: noticia.texto,
      dataCriacao: noticia.dataCriacao,
      cidadeId: cidade.id,
      cidadeNome: cidade.nome,
      ufId: uf.id,
      ufNome: uf.nome,
      ufSigla: uf.sigla
    })
    .from(noticia)
    .innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
    .innerJoin(uf, eq(cidade.ufId, uf.id))
    .orderBy(descendente ? desc(noticia.dataCriacao) : asc(noticia.dataCriacao), descendente ? desc(noticia.id) : asc(noticia.id));

  if (noticias.length === 0) {
    console.log("\nNenhuma notícia cadastrada.");
    return;
  }

  for (const item of noticias) {
    console.log("\n----------------------------------------");
    console.log(`ID: ${item.noticiaId}`);
    console.log(`Título: ${item.titulo}`);
    console.log(`Cidade: ${item.cidadeNome} - ${item.ufSigla}`);
    console.log(`Data: ${formatarData(item.dataCriacao)}`);
  }
}

async function listarNoticiasPorUf(): Promise<void> {
  console.log("\n=== Notícias de um estado específico ===");
  const ufs = await db.select().from(uf).orderBy(asc(uf.sigla));

  if (ufs.length === 0) {
    console.log("\nNenhuma UF cadastrada.");
    return;
  }

  for (const item of ufs) {
    console.log(`  ${item.id} - ${item.nome} (${item.sigla})`);
  }

  const sigla = normalizarTexto(await ask("\nInforme a sigla da UF: ")).toUpperCase();
  const ufSelecionada = await db.select().from(uf).where(eq(uf.sigla, sigla)).limit(1);

  if (ufSelecionada.length === 0) {
    console.log("\nUF não encontrada.");
    return;
  }

  const opcao = normalizarTexto(await ask("Ordenar por (a) mais recentes ou (b) mais antigas? ")).toLowerCase();
  const descendente = opcao !== "b";

  const noticias = await db
    .select({
      noticiaId: noticia.id,
      titulo: noticia.titulo,
      texto: noticia.texto,
      dataCriacao: noticia.dataCriacao,
      cidadeNome: cidade.nome,
      ufSigla: uf.sigla
    })
    .from(noticia)
    .innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
    .innerJoin(uf, eq(cidade.ufId, uf.id))
    .where(eq(uf.sigla, sigla))
    .orderBy(descendente ? desc(noticia.dataCriacao) : asc(noticia.dataCriacao), descendente ? desc(noticia.id) : asc(noticia.id));

  if (noticias.length === 0) {
    console.log("\nNenhuma notícia encontrada para esta UF.");
    return;
  }

  console.log("");
  for (const item of noticias) {
    console.log("----------------------------------------");
    console.log(`ID: ${item.noticiaId}`);
    console.log(`Título: ${item.titulo}`);
    console.log(`Cidade: ${item.cidadeNome} - ${item.ufSigla}`);
    console.log(`Data: ${formatarData(item.dataCriacao)}`);
  }
}

async function listarNoticiasAgrupadasPorEstado(): Promise<void> {
  while (true) {
    const linhas: NoticiaLinha[] = await db
      .select({
        noticiaId: noticia.id,
        titulo: noticia.titulo,
        texto: noticia.texto,
        dataCriacao: noticia.dataCriacao,
        cidadeId: cidade.id,
        cidadeNome: cidade.nome,
        ufId: uf.id,
        ufNome: uf.nome,
        ufSigla: uf.sigla
      })
      .from(noticia)
      .innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
      .innerJoin(uf, eq(cidade.ufId, uf.id))
      .orderBy(asc(uf.sigla), asc(cidade.nome), desc(noticia.dataCriacao), desc(noticia.id));

    if (linhas.length === 0) {
      console.log("\nNenhuma notícia cadastrada.");
      return;
    }

    console.log("\n--- LISTA AGRUPADA POR ESTADOS ---\n");

    let contador = 1;
    const mapaNumeros = new Map<number, number>();
    let ufAtual = "";

    for (const item of linhas) {
      if (item.ufSigla !== ufAtual) {
        ufAtual = item.ufSigla;
        console.log(`# ${ufAtual}`);
      }

      console.log(`${contador} - ${item.titulo} - ${item.cidadeNome}`);
      mapaNumeros.set(contador, item.noticiaId);
      contador++;
    }

    const opcao = normalizarTexto(await ask("\n(d) Detalhar notícia | (z) Voltar: ")).toLowerCase();

    if (opcao === "z") {
      return;
    }

    if (opcao === "d") {
      const numero = Number(await ask("Informe o número da notícia: "));
      const noticiaId = mapaNumeros.get(numero);

      if (!noticiaId) {
        console.log("\nNúmero inválido.");
        await pause();
        continue;
      }

      const detalhe = await db
        .select({
          titulo: noticia.titulo,
          texto: noticia.texto
        })
        .from(noticia)
        .where(eq(noticia.id, noticiaId))
        .limit(1);

      if (detalhe.length === 0) {
        console.log("\nNotícia não encontrada.");
        await pause();
        continue;
      }

      console.log("\nEm seguida, exibe o detalhe completo:\n");
      console.log(`Título: ${detalhe[0].titulo}`);
      console.log(`Texto : ${detalhe[0].texto}`);
      await pause();
      continue;
    }

    console.log("\nOpção inválida.");
  }
}

async function menuPrincipal(): Promise<void> {
  while (true) {
    console.log("\n==============================");
    console.log("      MENU PRINCIPAL");
    console.log("==============================");
    console.log("0 - Cadastrar notícia");
    console.log("1 - Exibir todas as notícias (mais recentes primeiro)");
    console.log("2 - Exibir todas as notícias (mais antigas primeiro)");
    console.log("3 - Exibir notícias de um estado específico");
    console.log("4 - Exibir todas as notícias agrupadas por estado");
    console.log("5 - Cadastrar UF");
    console.log("6 - Cadastrar cidade");
    console.log("7 - Sair");

    const opcao = normalizarTexto(await ask("\nEscolha uma opção: "));

    switch (opcao) {
      case "0":
        await cadastrarNoticia();
        await pause();
        break;
      case "1":
        await listarNoticiasOrdenadas(true);
        await pause();
        break;
      case "2":
        await listarNoticiasOrdenadas(false);
        await pause();
        break;
      case "3":
        await listarNoticiasPorUf();
        await pause();
        break;
      case "4":
        await listarNoticiasAgrupadasPorEstado();
        break;
      case "5":
        await cadastrarUf();
        await pause();
        break;
      case "6":
        await cadastrarCidade();
        await pause();
        break;
      case "7":
        closePrompt();
        return;
      default:
        console.log("\nOpção inválida.");
        await pause();
    }
  }
}

async function main(): Promise<void> {
  console.log("Sistema CLI de Notícias iniciado.");
  await menuPrincipal();
  console.log("\nPrograma encerrado.");
}

main().catch((error) => {
  console.error("\nErro inesperado:", error);
  closePrompt();
  process.exit(1);
});