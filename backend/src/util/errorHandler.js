
module.exports = (expressValidatorErros) => {

    let errors = [];

    expressValidatorErros.map( (error) => {
        errors.push(error.msg);
    });

    return { errors };
}