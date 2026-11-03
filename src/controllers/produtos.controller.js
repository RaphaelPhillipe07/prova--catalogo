
export class ProdutosController {
  constructor(produtosService, categoriasService) {
    this.service = produtosService;
    this.categoriasService = categoriasService; 
    this.index = this.index.bind(this);
    this.novo = this.novo.bind(this);
    this.criar = this.criar.bind(this);
  }

  async index(req, res, next) {
    try {
      const produtos = await this.service.listar();
      return res.render('/produtos', { produtos });
    } catch (error) {
      next(error);
    }
  }

  async novo(req, res, next) {
    try {
      const categorias = await this.categoriasService.listar();
      
      return res.render('produtos/novo', { 
        erro: null, 
        dados: {}, 
        categorias 
      });
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      await this.service.criar(req.body);
      
      return res.redirect('/produtos');
    } catch (error) {
      if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        try {
          const categorias = await this.categoriasService.listar();
          
          return res.status(error.statusCode).render('produtos/novo', {
            erro: error.message,
            dados: req.body, 
            categorias
          });
        } catch (innerError) {
          return next(innerError);
        }
      }
      next(error);
    }
  }
}
