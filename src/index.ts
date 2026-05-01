const titulos: string[] = [];
const autores: string[] = [];
const anos: number[] = [];
const paginas: number[] = [];
const lido: boolean[] = [];
const avaliacoes: number[] = [];

/*titulos.push(
  'O Hobbit',
  'Clean Code',
  '1984',
  'Dom Casmurro',
  'O Nome do Vento',
);
autores.push(
  'J.R.R. Tolkien',
  'Robert C. Martin',
  'George Orwell',
  'Machado de Assis',
  'Patrick Rothfuss',
);
anos.push(1937, 2008, 1949, 1899, 2007);
paginas.push(310, 464, 328, 256, 662);
lido.push(true, true, false, true, false);
avaliacoes.push(5, 4, 0, 5, 0);

*/

function exibirBiblioteca(): void{
    if (titulos.length === 0) {
        console.log("A biblioteca está vazia.");
        return;
    }
    titulos.forEach((titulo, indice) => {
        let status: string = "Não lido";
        if (lido[indice]){
            status = "Lido";
        }
        console.log(`${indice + 1}. "${titulo}" (${anos[indice]}) - ${autores[indice]} - ${paginas[indice]} páginas - ${status} (${avaliacoes[indice]}/5)`);
    });
}

function adicionarLivro(titulo: string, autor: string, ano: number, totalPaginas: number): void{
    titulos.push(titulo);
    autores.push(autor);
    anos.push(ano);
    paginas.push(totalPaginas);
    lido.push(false);
    avaliacoes.push(0);
}

function deletarLivro(indice: number): void{
    if(indice >= 0 && indice <= titulos.length){
        titulos.splice(indice, 1);
        autores.splice(indice, 1);
        anos.splice(indice, 1);
        paginas.splice(indice, 1);
        lido.splice(indice, 1);
        avaliacoes.splice(indice, 1);
    }
}

adicionarLivro("Hamlet","William Shakespeare",1623,192);
adicionarLivro("A Revolução dos Bichos","George Orwell",1945,112);
adicionarLivro("O Hobbit", "J.R.R. Tolkien", 1937, 310);
adicionarLivro("Clean Code", "Robert C. Martin", 2008, 464);
adicionarLivro("1984", "George Orwell", 1949, 328);
adicionarLivro("Dom Casmurro", "Machado de Assis", 1899, 256);

deletarLivro(4);

function exibirLivro(indice: number): void{
    let status: string = "Não lido";
    if (lido[indice]){
        status = "Lido";
    }
    console.log(`${indice + 1}. "${titulos[indice]}" (${anos[indice]}) - ${autores[indice]} - ${paginas[indice]} páginas - ${status} (${avaliacoes[indice]}/5)`);
}

function buscarPorTitulo(termo: string): void{
    titulos.forEach((titulo, indice)=>{
        if(titulo.toLowerCase().includes(termo.toLowerCase())){
            exibirLivro(indice);
        }
    });
}

function listarPorAutor(termo: string): void{
    const livrosEncontrados: string[] = titulos.map((_, indice)=> indice).filter((indice)=> autores[indice].toLowerCase()===termo.toLowerCase()).map((indice)=> titulos[indice]);
    
    for(let i = 0; i < livrosEncontrados.length; i++){
        buscarPorTitulo(livrosEncontrados[i]);
    }
}

function marcarComoLido(indice: number, avaliacao: number): void {
    if (indice < 0 || indice >= titulos.length) {
        console.error("Índice inválido.");
        return;
    }
    if (avaliacao < 1 || avaliacao > 5) {
        console.error("Avaliação inválida. Deve ser um valor entre 1 e 5.");
        return;
    }
    lido[indice] = true;
    avaliacoes[indice] = avaliacao;
}

function listarLidos(): void {
    const livrosEncontrados: string[] =  titulos.filter((_, indice) => lido[indice]);
    console.log("Livros lidos: \n")
    
    for(let i = 0; i < livrosEncontrados.length; i++){
        buscarPorTitulo(livrosEncontrados[i]);
    }

}

function listarPendentes(): void {
    const livrosEncontrados: string[] =  titulos.filter((_, indice) => !lido[indice]);
    console.log("Livros pendentes: \n")

    for(let i = 0; i < livrosEncontrados.length; i++){
        buscarPorTitulo(livrosEncontrados[i]);
    }
}

marcarComoLido(4, 3);
marcarComoLido(1, 5);
marcarComoLido(2, 4);

function totalLivros(): number {
    return titulos.length;
}

function totalLidos(): number {
    return lido.filter(status => status).length;
}

function percentualLidos(): number {
    const total = totalLivros();
    if (total === 0) return 0;
    return parseFloat(((totalLidos() / total) * 100).toFixed(2));
}

function mediaAvaliacoes(): number {
    const notasLidas = avaliacoes.filter((_, indice) => lido[indice]);
    
    if (notasLidas.length === 0) return 0;
    
    const somaNotas = notasLidas.reduce((acumulador, nota) => acumulador + nota, 0);
    return parseFloat((somaNotas / notasLidas.length).toFixed(2));
}

function livroMaiorAvaliacao(): string {
    const indicesLidos = lido
        .map((status, indice) => (status ? indice : -1))
        .filter(indice => indice !== -1);

    if (indicesLidos.length === 0) return "Nenhum livro avaliado.";

    const indiceMaior = indicesLidos.reduce((maiorAtual, indiceAtual) => {
        return avaliacoes[indiceAtual] > avaliacoes[maiorAtual] ? indiceAtual : maiorAtual;
    });

    return titulos[indiceMaior];
}

function totalPaginasLidas(): number {
    return paginas
        .filter((_, indice) => lido[indice])
        .reduce((acumulador, paginas) => acumulador + paginas, 0);
}

function exibirPorDecada(): void {
    const decadas: Record<string, string[]> = {};

    anos.forEach((ano, indice) => {
        const decada = `${Math.floor(ano / 10) * 10}s`;
        if (!decadas[decada]) {
            decadas[decada] = [];
        }
        decadas[decada].push(titulos[indice]);
    });

    const decadasOrdenadas = Object.keys(decadas).sort();
    
    if (decadasOrdenadas.length === 0) {
        console.log("Nenhum livro para exibir.");
        return;
    }

    decadasOrdenadas.forEach(decada => {
        console.log(`\n--- ${decada} ---`);
        decadas[decada].forEach(titulo => {
            buscarPorTitulo(titulo);
        });
    });
}


console.log("\n--- MINHA BIBLIOTECA ---");
exibirBiblioteca();

console.log("\n--- ESTATISTICAS ---");
console.log(`Total de livros: ${totalLivros()}`);
console.log(`Total de livros lidos: ${totalLidos()} (${percentualLidos()}%)`);
console.log(`Média das avaliações: ${mediaAvaliacoes()}`);
console.log(`Livro com maior avaliação: ${livroMaiorAvaliacao()}`);
console.log(`Total páginas lidas: ${totalPaginasLidas()}`);

console.log("\n--- POR DECADA ---");
exibirPorDecada();