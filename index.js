import { Router } from 'express';
import { CategoriasRepository } from '../repositories/categorias.repository.prisma';
import { ProdutosRepository } from '../repositories/produtos.repository.prisma';
import { ProdutosService } from '../services/produtos.service';
import { CategoriasService } from '../services/categorias.service';
import { ProdutosController } from '../controllers/produtos.controller';
import { CategoriasController } from '../controllers/categorias.controller';

export function criarRotas() {
  const router = Router();
  
  const categoriasRepository = new CategoriasRepository();
  const produtosRepository = new ProdutosRepository();
  const categoriasService = new CategoriasService();
  const produtosService = new ProdutosService();
  const categoriasController = new CategoriasController();
  const produtosController = new ProdutosController();

  router.get('/', categoriasController.index);
  router.get('/categorias', categoriasController.index);
  router.get('/categorias/nova', categoriasController.nova);
  router.post('/categorias', categoriasController.criar);

  router.get('/produtos', produtosController.index);
  router.get('/produtos/novo', produtosController.novo);
  router.post('/produtos', produtosController.criar);

  return router;
}
