class ErrorBadRequest extends Error {
    constructor(mensaje) {
        super(mensaje);
    }
}

class ErrorNotFound extends Error {
    constructor(mensaje) {
        super(mensaje);
    }
}

class ErrorUsed extends Error {
    constructor(mensaje) {
        super(mensaje);
    }
}


module.exports = {
    ErrorNotFound,
    ErrorBadRequest,
    ErrorUsed
}