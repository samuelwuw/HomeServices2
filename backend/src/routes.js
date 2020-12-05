const express = require('express');

//validação
const { celebrate, Segments, Joi } = require('celebrate');

const ProfileDisponivelController = require('./controllers/ProfileDisponivelController');
const ProfileFeitoController = require('./controllers/ProfileFeitoController');
const ServicoDisponivelController = require('./controllers/ServicoDisponivelController');
const ServicoFeitoController = require('./controllers/ServicoFeitoController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.required(),
        password: Joi.required(),
    })
}) ,SessionController.create);

//-------------------------------------------------------------------------PROFILEs

routes.get('/profileDisponivel', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileDisponivelController.index);

routes.get('/profileFeito', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileFeitoController.index);


//---------------------------------------------------------------------USERS
routes.get('/users', UserController.index);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required().email(),
        tipo: Joi.string().required(),        
    })
}), UserController.create);

routes.put('/users/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required().email()
    })
}), UserController.update);

//-------------------------------------------------------------------- SERVICO FEITO

routes.get('/servicoFeito', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) ,ServicoFeitoController.index);

//nomeServico, preco, detalhes, notaDoContratante, notaDoPrestador, relatorio
routes.post('/servicoFeito',celebrate({
    [Segments.BODY]: Joi.object().keys({
        nomeServico: Joi.string().required(),
        preco: Joi.number().required(),
        detalhes: Joi.string().required(),
        notaDoContratante: Joi.number().required(),
        notaDoPrestador: Joi.number().required(),
        relatorio: Joi.string().required(),
        prestadorId: Joi.string().required(),
        contratanteId: Joi.string().required(),
    }),
}) ,ServicoFeitoController.create);

//----------------------------------------------------------------------SERVICO DISP

routes.get('/servicoDisponivel', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) ,ServicoDisponivelController.index);

routes.post('/servicoDisponivelPesquisa', celebrate({
    [Segments.BODY]: Joi.object().keys({
        pesquisa: Joi.string(),
    })
}), ServicoDisponivelController.pesquisaPorDetalhes);

//nomeServico, precoMedio, detalhes
routes.post('/servicoDisponivel',celebrate({
    [Segments.BODY]: Joi.object().keys({
        nomeServico: Joi.string().required(),
        precoMedio: Joi.number().required(),
        detalhes: Joi.string().required(),
        prestadorId: Joi.string().required(),
    }),
}) ,ServicoDisponivelController.create);

routes.put('/servicoDisponivel/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nomeServico: Joi.string().required(),
        precoMedio: Joi.number().required(),
        detalhes: Joi.string().required(),
        prestadorId: Joi.string().required(),
    }),   
}), ServicoDisponivelController.update);


routes.delete('/servicoDisponivel/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(), 
}), ServicoDisponivelController.delete);

//--------------------------------------------------------------


module.exports = routes;

