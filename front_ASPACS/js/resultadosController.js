function resultController() {
    const materiaPrima = document.querySelector('[data-quantidadeDeEntrada]').value;
    const processada = document.querySelector('[data-rendimento]');
    
        let objResults = calcResults(materiaPrima, processada.value);
        document.querySelector('[data-perda]').value = objResults.perda;
        document.querySelector('[data-rende]').value =  objResults.rendimento;
    
}

function calcResults(materiaPrima, processada) {
    materiaPrima = Number(materiaPrima);
    processada = Number(processada);
    const perda = ((materiaPrima - processada) / materiaPrima) * 100;
    const rendimento = ((processada / materiaPrima) * 100);

    return {
        perda: perda.toFixed(2),
        rendimento: rendimento.toFixed(2)
    };
}

export const resultados = {
    resultController,
}