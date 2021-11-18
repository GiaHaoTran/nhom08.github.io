const Joi = require('@hapi/joi')

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)

        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.body = validatorResult.value
            next()
        }
    }
}

const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({param: req.params[name]})

        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.params[name] = req.params[name]
            next()
        }
    }
}

const schemas = {

    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    //------- Category ---------

    categorySchema: Joi.object().keys({
        name: Joi.string().min(3).required(),
        picture: Joi.string().required()

    }),

    categoryOptionalSchema: Joi.object().keys({
        name: Joi.string().min(3),
        picture: Joi.string()

    }),


    //------- Product ---------


    productSchema: Joi.object().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().min(0.0).required(),
        image: Joi.string().required(),
        timing: Joi.string().required(),
        rating: Joi.number().required(),
        popular: Joi.boolean().required(),
        status: Joi.boolean().required(),
    }),

    productOptionalSchema: Joi.object().keys({
        name: Joi.string().min(3),
        description: Joi.string().min(10),
        price: Joi.number().min(0.0),
        image: Joi.string(),
        timing: Joi.string(),
        rating: Joi.number(),
        popular: Joi.boolean(),
        status: Joi.boolean(),
        owner_category: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }),

    newProductSchema: Joi.object().keys({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().min(0.0).required(),
        image: Joi.string().required(),
        timing: Joi.string().required(),
        rating: Joi.number().required(),
        popular: Joi.boolean().required(),
        status: Joi.boolean().required(),
        owner_category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),



    //------- User ---------
    

    userSchema: Joi.object().keys({
        fullname: Joi.string().min(3).required(),
        username: Joi.string().min(6).required(),
        phone: Joi.string().max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        avatar: Joi.string().required(),
        address: Joi.string().min(10).required()
    }),

    userOptionalSchema: Joi.object().keys({
        fullname: Joi.string().min(3),
        username: Joi.string().min(6),
        phone: Joi.string().max(10),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        avatar: Joi.string(),
        address: Joi.string().min(10)

    })
}

module.exports = {
    validateBody,
    validateParam,
    schemas
}