var validateCpfButton = document.getElementById('validateCpfButton');
var generateCpfButton = document.getElementById('generateCpfButton');
var cpfInput = document.getElementById('cpfInput');

function cpfMask() {
    var cpf = this.value;
    
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

function cpfValidation() {
    var cpf = this.value;

    if (cpf.length != 14)
        return false;
    cpf = cpf.replace(/\D/g, "");

    // 10 digit verification
    intercpf = 0;
    for (i=0; i < 9; i++)
        intercpf += parseInt(cpf.charAt(i)) * (10 - i);
    
    rev = 11 - (intercpf % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;

    // 11 digit verification
    intercpf = 0;
    for (i=0; i < 10; i++)
        intercpf += parseInt(cpf.charAt(i)) * (11 - i);

    rev = 11 - (intercpf % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    console.log(cpf);
    return true;
}

function cpfGeneration () {

}

cpfInput.onkeypress = cpfMask;
validateCpfButton.onclick = function() {
    cpfValidation.call(cpfInput);
};