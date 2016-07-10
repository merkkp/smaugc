var validateCpfButton = document.getElementById('validateCpfButton');
var generateCpfButton = document.getElementById('generateCpfButton');
var cpfInput = document.getElementById('cpfInput');
var copyToClip = document.getElementById('copyToClip');
var withMask = document.getElementById('withMask');

function cpfMask() {
    var cpf = this.value;
    
    // STUDY THIS
    // removes everything that is not a number
    cpf = cpf.replace(/\D/g, "");
    // insert a dot between the third and the fourth digits
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    // insert a dot between the seventh and the eight digits
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    // insert a dash between the tenth and the elenventh digits
    cpf = cpf.replace(/(\d{3})(\d)/, "$1-$2");

    this.value = cpf;
}

function validateCpf() {
    var cpf = this.value;

    cpf = cpf.replace(/\D/g, "");

    if (cpf.length != 11)
        return false;

    // TODO
    // fisrt digit verification
    sum = 0;
    for (i = 0; i < 9; i++)
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    
    digit = 11 - (sum % 11);
    if (digit == 10 || digit == 11)
        digit = 0;
    if (digit != parseInt(cpf.charAt(9)))
        return false;

    // second digit verification
    sum = 0;
    for (i = 0; i < 10; i++)
        sum += parseInt(cpf.charAt(i)) * (11 - i);

    digit = 11 - (sum % 11);
    if (digit == 10 || digit == 11)
        digit = 0;
    if (digit != parseInt(cpf.charAt(10)))
        return false;

    return true;
}

function generateCpf() {
    var cpf = String(Math.random()).substr(2, 9);

    // TODO
    sum = 0;
    for (i = 0; i < 9; i++)
        sum += parseInt(cpf.charAt(i)) * (10 - i);

    digit = 11 - (sum % 11);
    if (digit == 10 || digit == 11)
        digit = 0;

    cpf += digit;

    sum = 0;
    for (i = 0; i < 10; i++)
        sum += parseInt(cpf.charAt(i)) * (11 - i);

    digit = 11 - (sum % 11);
    if (digit == 10 || digit == 11)
        digit = 0;

    cpf += digit;

    return cpf;
}

cpfInput.onkeypress = cpfMask;

cpfInput.onpaste = function(pasteEvent) {
    var pasteData = pasteEvent.clipboardData.getData('Text');
    if (pasteData.length != 11) {
        this.value = '';
        return false;
    }

    this.value = pasteData;

    if (withMask.checked)
        cpfMask.call(this);
};

validateCpfButton.onclick = function() {
    if (cpfInput.value === '')
        return false;

    if (validateCpf.call(cpfInput)) {
        alert("valid");
        return true;
    }

    alert('invalid');
    return false;
};

generateCpfButton.onclick = function() {
    var cpf = generateCpf();
    
    cpfInput.value = cpf;

    if (withMask.checked) {
        cpfMask.call(cpfInput);
    }
};

copyToClip.onclick = function() {
    cpfInput.select();
    document.execCommand('copy');
};