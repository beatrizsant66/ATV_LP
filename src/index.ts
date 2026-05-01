const titulos: string[] = [];
const autores: string[] = [];
const anos: number[] = [];
const paginas: number[] = [];
const lido: boolean[] = [];
const avaliacoes: number[] = [];

titulos.push(
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
        console.log(`id: ${indice} `);
        console.log(`titulo: ${titulo}`);
        console.log(`autor: ${autores[indice]}`);
        console.log(`ano: ${anos[indice]}`);
        console.log(`paginas: ${paginas[indice]}`);
        console.log(`status: ${status}`);
        console.log(`avaliaçao: ${avaliacoes[indice]}`);
        console.log("-----------------------");
    });
}

exibirBiblioteca();

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

deletarLivro(4);

exibirBiblioteca();

