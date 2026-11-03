import { prisma } from '../config/database.js';

export class CategoriasRepository {
  
  async listarTodas() {
    return await prisma.categoria.findMany();
  }
  async buscarPorId(id) {
    return await prisma.categoria.findUnique({
      where: {
        id: Number(id),  
      },
    });
  }

  async criar(dados) {
    return await prisma.categoria.create({
      data: {
        nome: dados.nome
      },
    });
  }
}
