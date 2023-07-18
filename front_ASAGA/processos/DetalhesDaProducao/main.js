let id = localStorage.getItem('id');
let energia = localStorage.getItem('energia');
let mao_de_obra = localStorage.getItem('mao_de_obra');
let materia_prima = localStorage.getItem('materia_prima');
let depreciacao = localStorage.getItem('depreciacao');
let custo_total = localStorage.getItem('custo_total');
let custo_unitario = localStorage.getItem('custo_unitario');
let insumos = localStorage.getItem('insumos');

id = Number(id)
energia = Number(energia)
mao_de_obra = Number(mao_de_obra);
materia_prima = Number(materia_prima);
depreciacao = Number(depreciacao);
custo_total = Number(custo_total);
custo_unitario = Number(custo_unitario);
insumos = Number(insumos);

localStorage.removeItem('id');
localStorage.removeItem('energia');
localStorage.removeItem('mao_de_obra');
localStorage.removeItem('materia_prima');
localStorage.removeItem('depreciacao');
localStorage.removeItem('custo_total');
localStorage.removeItem('custo_unitario');
localStorage.removeItem('insumos');

const container = document.querySelector('[data-container]');

container.innerHTML = `
    <div class="container-info">
        <p>Processo: <span>${id}</span></p>
        <p class="energia">Despesas com consumo de energia: <span>${energia}</span> R$</p>
        <p class="mao-de-obra">Despesas com mão de obra: <span>${mao_de_obra}</span> R$</p>
        <p class="materia-prima">Despesas com materia-prima: <span>${materia_prima}</span> R$</p>
        <p class="depreciacao">Despesas com depreciação do maquinário: <span>${depreciacao}</span> R$</p>
        <p class="insumos">Despesas com insumos: <span>${insumos}</span> R$</p>
        <h2>Custo total: <span>${custo_total}</span> R$</h2>
        <h2>Custo unitário: <span>${custo_unitario}</span> R$</h2>
    </div>
`

//-----------------------------------------------------     grafico     ----------------------------------------------------------//

function gerarGraficoDePizza(consumoEnergia, maoDeObra, custoMateriaPrima, depreciacaoMaquinas, gastosInsumos) {
    // Importando a biblioteca Chart.js (verifique se você já a adicionou ao seu projeto)
    // <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    // Obtendo o contexto do elemento canvas no qual o gráfico será desenhado
    const canvas = document.getElementById('meuGraficoDePizza');
    const contexto = canvas.getContext('2d');

    // Criando o gráfico de pizza
    const grafico = new Chart(contexto, {
        type: 'pie',
        data: {
            //labels: ['Consumo de Energia', 'Mão de Obra', 'Custo da Matéria-Prima', 'Depreciação das Máquinas', 'Gastos com Insumos'],
            datasets: [{
                data: [consumoEnergia, maoDeObra, custoMateriaPrima, depreciacaoMaquinas, gastosInsumos],
                backgroundColor: ['rgb(156,175,136)', 'rgb(101,48,36)', 'rgb(190,106,20)', 'rgb(0,73,30)', 'rgb(255,164,0)'],
            }],
        },
        options: {
            responsive: true,
        },
    });
}


gerarGraficoDePizza(energia, mao_de_obra, materia_prima, depreciacao, insumos);
