import api from '../js/linkAPI.js'

/*mostrar form cadastrar vendas*/
const formVendas = document.querySelector('[data-formVendas]');
const cadastrar = document.querySelector('[data-cadastrarVendas]')

cadastrar.addEventListener('click', () => {
    formVendas.classList.toggle('inativo')
})

// fim mostrar forma cadastrar vendas //



//----------------------- cadastrar pedido --------------------------- //
const btnCadastrar = document.querySelector('[data-btnCadastrar]');

btnCadastrar.addEventListener('click', () => {
    const empresa = document.querySelector('[data-empresa]').value;
    const produto = document.querySelector('[data-produto]').value;
    const quantidade = document.querySelector('[data-quantidade]').value;
    const preco = document.querySelector('[data-preco]').value;
    const entrega = document.querySelector('[data-entrega]').value;

    cadastraPedido(empresa, produto, quantidade, preco, entrega);
    alert('Pedido cadastrado com sucesso!');
});

async function cadastraPedido(empresa, produto, quantidade, preco, entrega) {
    const conexao = await fetch(`${api}/pedidos`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            empresa: empresa,
            produto: produto,
            quantidade: quantidade,
            preco: preco,
            entrega: entrega,
            finalizado: false
        })
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}
//----------------------- fim cadastrar pedido ------------------------//

//----------------------- exibir pedidos pendentes --------------------------- //

const exibirPedidos = document.querySelector('[data-pedidosPendentes]');

const container = document.querySelector('[data-containerVendas]');

exibirPedidos.addEventListener('click', () => {
    container.innerHTML = '';
    listarVendas();
})

function constroiCard(id, empresa, produto, quantidade, preco, entrega, finalizado) {
    let escreva = finalizado == false ? 'Pendente':'Entregue';
    let dia = Date.parse(entrega)
    
    const vendas = document.createElement('div')
    vendas.className = 'card-vendas'
    vendas.innerHTML = `
        <p class="text">Empresa:<span>${empresa}</span></p>
        <p class="text">Produto:<span>${produto}</span></p>
        <p class="text">Quantidade:<span>${quantidade}</span></p>
        <p class="text">Preço:<span>${preco}</span></p>
        <p class="text">Entrega:<span>${entrega}</span></p>
        <p class="text">Situação:<span>${escreva}</span></p>
        <button data-finalizar class="bt3" id="${id}">finalizar</button>
    `
    return vendas;
}

async function listarVendas() {
    const conexao = await fetch(`${api}/pedidos`);
    const conexaoConvertida = await conexao.json();
    conexaoConvertida.forEach((element) => {
        if (element.finalizado == false){
            container.appendChild(constroiCard(element.id, element.empresa, element.produto, element.quantidade, element.preco, element.entrega, element.finalizado))
        }

        const finalizar = document.querySelectorAll('[data-finalizar]');
        //finalizar venda
        for (let i = 0; i < finalizar.length; i++) {
            finalizar[i].addEventListener('click', (e) => {
                let id = e.target.id
                atualizaPedido(id)
                location.reload()
            })
        }
    });
}

async function atualizaPedido(id) {
    const conexao = await fetch(`${api}/pedidos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            finalizado: true
        })
    });

    if (!conexao.ok) {
        throw new Error("Erro ao atualizar!")
    }

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}


//----------------------- fim exibir pedidos pendentes ------------------------//

//----------------------- exibir pedidos finalizados --------------------------- //

const exibirPedidosFinalizados = document.querySelector('[data-pedidosFinalizados]');

exibirPedidosFinalizados.addEventListener('click', () => {
    container.innerHTML = '';
    listarVendasFinalizadas();
})

function constroiCardFinalizados(empresa, produto, quantidade, preco, entrega, finalizado) {
    const vendas = document.createElement('div')
    vendas.className = 'card-vendas'
    vendas.innerHTML = `
        <p class="text">Empresa:<span>${empresa}</span></p>
        <p class="text">Produto:<span>${produto}</span></p>
        <p class="text">Quantidade:<span>${quantidade}</span></p>
        <p class="text">Preço:<span>${preco}</span></p>
        <p class="text">Entrega:<span>${entrega}</span></p>
        <p class="text">Situação:<span>${finalizado}</span></p>
    `

    return vendas;
}

async function listarVendasFinalizadas() {
    const conexao = await fetch(`${api}/pedidos`);
    const conexaoConvertida = await conexao.json();

    conexaoConvertida.forEach((element) => {
        if (element.finalizado == true){
            container.appendChild(constroiCardFinalizados(element.empresa, element.produto, element.quantidade, element.preco, element.entrega, element.finalizado))
        }
        
    });
}


//----------------------- fim exibir pedidos finalizados ------------------------//