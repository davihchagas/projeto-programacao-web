import { asc, desc, eq } from "drizzle-orm";
import { closePrompt, ask, pause } from "./utils/prompt";
import { db, cidade, noticia, uf, tag, noticiaTag } from "./db";

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

async function cadastrarUf(): Promise<void> {
  console.log("\n=== Cadastrar UF ===");

  const nome = normalizarTexto(await ask("Nome da UF: "));
  const sigla = normalizarTexto(await ask("Sigla da UF: ")).toUpperCase();

  if (!nome || !sigla) {
    console.log("\nNome e sigla são obrigatórios.");
    return;
  }

  const existente = await db.select().from(uf).where(eq(uf.sigla, sigla));

  if (existente.length > 0) {
    console.log("\nJá existe uma UF com essa sigla.");
    return;
  }

  await db.insert(uf).values({ nome, sigla });

  console.log("\nUF cadastrada com sucesso.");
}

async function cadastrarCidade(): Promise<void> {
  console.log("\n=== Cadastrar Cidade ===");

  const ufs = await db.select().from(uf).orderBy(asc(uf.sigla));

  if (ufs.length === 0) {
    console.log("\nCadastre uma UF primeiro.");
    return;
  }

  console.log("\nUFs disponíveis:");

  for (const item of ufs) {
    console.log(`${item.id} - ${item.nome} (${item.sigla})`);
  }

  const ufId = Number(await ask("\nInforme o ID da UF: "));
  const nome = normalizarTexto(await ask("Nome da cidade: "));

  if (!nome || !Number.isInteger(ufId)) {
    console.log("\nDados inválidos.");
    return;
  }

  await db.insert(cidade).values({ nome, ufId });

  console.log("\nCidade cadastrada com sucesso.");
}

async function cadastrarTag(): Promise<void> {
  console.log("\n=== Cadastrar Tag ===");

  const nome = normalizarTexto(await ask("Nome da tag: "));

  if (!nome) {
    console.log("\nNome obrigatório.");
    return;
  }

  const existente = await db.select().from(tag).where(eq(tag.nome, nome));

  if (existente.length > 0) {
    console.log("\nEssa tag já existe.");
    return;
  }

  await db.insert(tag).values({ nome });

  console.log("\nTag cadastrada com sucesso.");
}

async function cadastrarNoticia(): Promise<void> {
  console.log("\n=== Cadastrar Notícia ===");

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
    console.log("\nCadastre uma cidade antes.");
    return;
  }

  console.log("\nCidades disponíveis:");

  for (const item of cidades) {
    console.log(`${item.id} - ${item.nome} (${item.ufSigla})`);
  }

  const cidadeId = Number(await ask("\nInforme o ID da cidade: "));
  const titulo = normalizarTexto(await ask("Título: "));
  const texto = normalizarTexto(await ask("Texto: "));

  const noticiaCriada = await db
    .insert(noticia)
    .values({
      titulo,
      texto,
      cidadeId
    })
    .returning();

  const tagsDisponiveis = await db.select().from(tag);

  if (tagsDisponiveis.length > 0) {
    console.log("\nTags disponíveis:");

    for (const item of tagsDisponiveis) {
      console.log(`${item.id} - ${item.nome}`);
    }

    const tagsInput = await ask(
      "\nDigite IDs das tags separados por vírgula (ou ENTER para nenhuma): "
    );

    if (tagsInput.trim()) {
      const idsTags = tagsInput
        .split(",")
        .map((id) => Number(id.trim()))
        .filter((id) => !isNaN(id));

      for (const tagId of idsTags) {
        await db.insert(noticiaTag).values({
          noticiaId: noticiaCriada[0].id,
          tagId
        });
      }
    }
  }

  console.log("\nNotícia cadastrada com sucesso.");
}

async function listarNoticiasOrdenadas(descendente: boolean): Promise<void> {
  const noticias = await db
    .select({
      noticiaId: noticia.id,
      titulo: noticia.titulo,
      dataCriacao: noticia.dataCriacao,
      cidadeNome: cidade.nome,
      ufSigla: uf.sigla
    })
    .from(noticia)
    .innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
    .innerJoin(uf, eq(cidade.ufId, uf.id))
    .orderBy(descendente ? desc(noticia.dataCriacao) : asc(noticia.dataCriacao));

  if (noticias.length === 0) {
    console.log("\nNenhuma notícia encontrada.");
    return;
  }

  for (const item of noticias) {
    console.log("\n--------------------");
    console.log(`ID: ${item.noticiaId}`);
    console.log(`Título: ${item.titulo}`);
    console.log(`Cidade: ${item.cidadeNome} - ${item.ufSigla}`);
    console.log(`Data: ${formatarData(item.dataCriacao)}`);
  }
}

async function listarNoticiasPorUf(): Promise<void> {
  const sigla = normalizarTexto(await ask("Informe a sigla da UF: ")).toUpperCase();

  const noticias = await db
    .select({
      titulo: noticia.titulo,
      cidadeNome: cidade.nome,
      ufSigla: uf.sigla
    })
    .from(noticia)
    .innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
    .innerJoin(uf, eq(cidade.ufId, uf.id))
    .where(eq(uf.sigla, sigla));

  for (const item of noticias) {
    console.log(`${item.titulo} - ${item.cidadeNome}/${item.ufSigla}`);
  }
}

async function listarNoticiasAgrupadasPorEstado(): Promise<void> {
  const linhas = await db
    .select({
      titulo: noticia.titulo,
      cidadeNome: cidade.nome,
      ufSigla: uf.sigla
    })
    .from(noticia)
    .innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
    .innerJoin(uf, eq(cidade.ufId, uf.id))
    .orderBy(asc(uf.sigla));

  let ufAtual = "";

  for (const item of linhas) {
    if (item.ufSigla !== ufAtual) {
      ufAtual = item.ufSigla;
      console.log(`\n# ${ufAtual}`);
    }

    console.log(`- ${item.titulo} (${item.cidadeNome})`);
  }
}

async function menuPrincipal(): Promise<void> {
  while (true) {
    console.log("\n====================");
    console.log("MENU PRINCIPAL");
    console.log("====================");
    console.log("0 - Cadastrar notícia");
    console.log("1 - Exibir notícias recentes");
    console.log("2 - Exibir notícias antigas");
    console.log("3 - Exibir notícias por UF");
    console.log("4 - Exibir notícias agrupadas");
    console.log("5 - Cadastrar UF");
    console.log("6 - Cadastrar cidade");
    console.log("7 - Cadastrar tag");
    console.log("8 - Sair");

    const opcao = await ask("\nEscolha: ");

    switch (opcao) {
      case "0":
        await cadastrarNoticia();
        break;

      case "1":
        await listarNoticiasOrdenadas(true);
        break;

      case "2":
        await listarNoticiasOrdenadas(false);
        break;

      case "3":
        await listarNoticiasPorUf();
        break;

      case "4":
        await listarNoticiasAgrupadasPorEstado();
        break;

      case "5":
        await cadastrarUf();
        break;

      case "6":
        await cadastrarCidade();
        break;

      case "7":
        await cadastrarTag();
        break;

      case "8":
        closePrompt();
        return;

      default:
        console.log("\nOpção inválida.");
    }

    await pause();
  }
}

async function main() {
  console.log("Sistema iniciado.");
  await menuPrincipal();
}

main();