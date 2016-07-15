var validateCpfButton = document.getElementById('validateCpfButton');
var generateCpfButton = document.getElementById('generateCpfButton');
var cpfInput = document.getElementById('cpfInput');
var copyToClip = document.getElementById('copyToClip');
var withMask = document.getElementById('withMask');

cpfInput.onkeydown = function() {
    removeClass(cpfInput, 'valid');
    removeClass(cpfInput, 'invalid');
    // this.value = cpfMask(this.value);
};

// cpfInput.onpaste = function(pasteEvent) {
//     var pasteData = pasteEvent.clipboardData.getData('Text');
//     if (pasteData.length != 11) {
//         this.value = '';
//         return false;
//     }

//     this.value = pasteData;
// };

validateCpfButton.onclick = function() {
    removeClass(cpfInput, 'valid');
    removeClass(cpfInput, 'invalid');

    if (cpfInput.value === '')
        return false;

    if (validateCpf(cpfInput.value)) {
        addClass(cpfInput, 'valid');
        return true;
    }

    addClass(cpfInput, 'invalid');
    return false;
};

generateCpfButton.onclick = function() {
    var cpf = generateCpf();

    removeClass(cpfInput, 'valid');
    removeClass(cpfInput, 'invalid');

    // if (withMask.checked)
    //     cpfInput.value = cpfMask(cpf);
    // else
        cpfInput.value = cpf;
};

copyToClip.onclick = function() {
    cpfInput.select();
    document.execCommand('copy');
};