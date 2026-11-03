import { AppError } from '../utils/appError.js';

export class ProdutosService {
  constructor(produtosRepository, categoriasRepository) {
    this.repo = produtosRepository;
    this.categoriasRepo = categoriasRepository; 
  }

  async criar(dados) {
    const { nome, preco, categoria_id } = dados;

    if (!nome || nome.trim() === '') {
      throw new AppError('O nome do produto é obrigatório.', 400);
    }

    const precoFormatado = typeof preco === 'string' ? preco.replace(',', '.') : preco;
    const precoNumerico = Number(precoFormatado);

    if (isNaN(precoNumerico) || precoNumerico <= 0) {
      throw new AppError('O preço deve ser um número maior que zero.', 400);
    }

    if (!categoria_id) {
      throw new AppError('A categoria é obrigatória.', 400);
    }

    const categoriaExiste = await this.categoriasRepo.buscarPorId(categoria_id);
    
    if (!categoriaExiste) {
      throw new AppError('A categoria informada não existe.', 422);
    }

    const novoProduto = await this.repo.criar({
      nome: nome.trim(),
      preco: precoNumerico,
      categoria_id
    });

    return novoProduto;
  }

  async listar() {
    const produtos = await this.repo.listar();
    return produtos;
  }
}
