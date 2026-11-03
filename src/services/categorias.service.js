import { AppError } from '../utils/appError.js';

export class CategoriasService {
  constructor(categoriasRepository) {
    this.repo = categoriasRepository;
  }

  async criar(dados) {
    const { nome } = dados;

    if (!nome || nome.trim() === '') {
      throw new AppError('O nome da categoria é obrigatório.', 400);
    }

    const novaCategoria = await this.repo.criar({ nome: nome.trim() });
    return novaCategoria;
  }

  async listar() {
    const categorias = await this.repo.listar();
    return categorias;
  }
}
