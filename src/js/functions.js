function cpfMask(cpf) {
    // STUDY THIS
    // removes everything that is not a number
    cpf = cpf.replace(/\D/g, "");
    // insert a dot between the third and the fourth digits
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    // insert a dot between the seventh and the eight digits
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    // insert a dash between the tenth and the elenventh digits
    cpf = cpf.replace(/(\d{3})(\d)/, "$1-$2");

    return cpf;
}

function validateCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length != 11)
        return false;

    // TODO
    // fisrt digit verification
    sum = 0;
    for (i = 0; i < 9; i++)
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    
    digit = 11 - (sum % 11);
    if (digit >= 10)
        digit = 0;
    
    if (digit != parseInt(cpf.charAt(9)))
        return false;

    // second digit verification
    sum = 0;
    for (i = 0; i < 10; i++)
        sum += parseInt(cpf.charAt(i)) * (11 - i);

    digit = 11 - (sum % 11);
    if (digit >= 10)
        digit = 0;

    if (digit != parseInt(cpf.charAt(10)))
        return false;

    return true;
}

function generateCpf() {
    // generate random string of 9 numbers
    var cpf = String(Math.random()).substr(2, 9);

    // TODO
    sum = 0;
    for (i = 0; i < 9; i++)
        sum += parseInt(cpf.charAt(i)) * (10 - i);

    digit = 11 - (sum % 11);
    if (digit >= 10)
        digit = 0;

    cpf += digit;

    sum = 0;
    for (i = 0; i < 10; i++)
        sum += parseInt(cpf.charAt(i)) * (11 - i);

    digit = 11 - (sum % 11);
    if (digit >= 10)
        digit = 0;

    cpf += digit;

    return cpf;
}