export class CategoriasController {
  constructor(categoriasService) {
    this.service = categoriasService;
    this.index = this.index.bind(this);
    this.nova = this.nova.bind(this);
    this.criar = this.criar.bind(this);
  }

  async index(req, res, next) {
    try {
      const categorias = await this.service.listar();
      return res.render('/categorias', { categorias });
    } catch (error) {
      next(error);
    }
  }

  nova(req, res) {
    return res.render('categorias/nova', { erro: null, dados: {} });
  }

  async criar(req, res, next) {
    try {
      await this.service.criar(req.body);
      
      return res.redirect('/categorias');
    } catch (error) {
      if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        return res.status(error.statusCode).render('categorias/nova', {
          erro: error.message,
          dados: req.body 
        });
      }     
      next(error);
    }
  }
}
