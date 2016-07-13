var validateCpfButton = document.getElementById('validateCpfButton');
var generateCpfButton = document.getElementById('generateCpfButton');
var cpfInput = document.getElementById('cpfInput');
var copyToClip = document.getElementById('copyToClip');
var withMask = document.getElementById('withMask');

cpfInput.onkeydown = function() {
    this.value = cpfMask(this.value);
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
    if (cpfInput.value === '')
        return false;

    if (validateCpf(cpfInput.value)) {
        alert("valid");
        return true;
    }

    alert('invalid');
    return false;
};

generateCpfButton.onclick = function() {
    var cpf = generateCpf();

    if (withMask.checked)
        cpfInput.value = cpfMask(cpf);
    else
        cpfInput.value = cpf;
};

copyToClip.onclick = function() {
    cpfInput.select();
    document.execCommand('copy');
};