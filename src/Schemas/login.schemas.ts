import * as Joi from 'joi';
import { messages as ptBRMessages } from 'joi-translation-pt-br';

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const securityCodePattern = /^[a-zA-Z0-9]*$/;

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .pattern(emailPattern)
    .label('Email')
    .messages({
      'string.pattern.base':
        '{{#label}} com valor {:[.]} não confere com o padrão requerido.',
    }),
  password: Joi.string()
    .min(6)
    .max(80)
    .required()
    .label('Senha')
    .messages(ptBRMessages), // Adicionando mensagens de tradução
  securityCode: Joi.string()
    .min(6)
    .max(6)
    .pattern(securityCodePattern)
    .label('Código de Segurança')
    .messages({
      'string.pattern.base':
        '{{#label}} com valor {:[.]} não confere com o padrão requerido.',
    }),
}).options({
  errors: {
    wrap: {
      label: false, // Configurando corretamente o wrap.label para false
    },
  },
  messages: ptBRMessages, // Adicionando mensagens de tradução
});

export default loginSchema;
