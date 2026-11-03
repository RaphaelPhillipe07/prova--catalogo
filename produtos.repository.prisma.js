import { prisma } from '../config/database.js';

export class ProdutosRepository {
  async listarTodos() {
    return await prisma.produto.findMany({
      include: {
        categoria: true,  
      },
    });
  }

  async criar(dados) {
    return await prisma.produto.create({
      data: {
        nome: dados.nome,
        preco: parseFloat(dados.preco), 
        categoriaId: Number(dados.categoriaId), 
      },
      include: {
        categoria: true, 
      },
    });
  }
}
