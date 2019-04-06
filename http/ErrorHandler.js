'use strict'

const { errors } = require('../util/Constants')

const FatalError = require('./errors/FatalError')
const ServerError = require('./errors/ServerError')
const ClientError = require('./errors/ClientError')

const fatalErrors = errors.FATAL
const serverErrors = errors.SERVER_SIDE
const clientErrors = errors.CLIENT_SIDE


module.exports = (errorCode) => {
    if(fatalErrors.hasOwnProperty(errorCode)) {
        return new FatalError(fatalErrors[errorCode])
    }
    if(serverErrors.hasOwnProperty(errorCode)) {
        return new ServerError(serverErrors[errorCode])
    }
    if(clientErrors.hasOwnProperty(errorCode)) {
        return new ClientError(clientErrors[errorCode])
    }
}