import api from './linkAPI.js';

function atualizaProcessos(id, tipoProcesso, etapa, quantidade_de_entrada) {
    switch (tipoProcesso) {
        case 'cacau':
            return atualizaProcessoCacau(id, etapa, quantidade_de_entrada)
            break;
        case 'cafe verde':
            return atualizaProcessoCafe(id, etapa, quantidade_de_entrada)
            break;
        case 'buriti':
            return atualizaProcessoBuriti(id, etapa, quantidade_de_entrada)
            break;
        case 'açai':
            return atualizaProcessoAcai(id, etapa, quantidade_de_entrada)
            break;
        case 'citronela':
            return atualizaProcessoCitronela(id, etapa, quantidade_de_entrada)
            break;
        case 'breu':
            return atualizaProcessoBreu(id, etapa, quantidade_de_entrada)
            break;
        case 'castanha':
            return atualizaProcessoCastanha(id, etapa, quantidade_de_entrada)
            break;
        case 'copaiba':
            return atualizaProcessoCopaiba(id, etapa, quantidade_de_entrada)
            break;
        default:
            return alert('error!')
    }
}

//---------------------------------------------    CACAU     ---------------------------------------------------------//

function atualizaProcessoCacau(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'btn-higienizacao':
            return atualizaProcessoEtapaCacau(false, true, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-secagem':
            return atualizaProcessoEtapaCacau(false, false, true, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-trituracao':
            return atualizaProcessoEtapaCacau(false, false, false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-prensagem':
            return atualizaProcessoEtapaCacau(false, false, false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-filtragem':
            return atualizaProcessoEtapaCacau(false, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaCacau(higenizacao, secagem, trituracao, prensagem, filtragem, quantidade_de_entrada, id, etapa) {
    const conexao = await fetch(`${api}/processos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Quantidade_de_entrada: quantidade_de_entrada,
            Higenizacao_selecao: higenizacao,
            Secagem: secagem,
            Trituracao: trituracao,
            Prensagem: prensagem,
            Filtragem: filtragem
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    alert(`O processo ${id} foi atualizado`)
    if (etapa != 'btn-filtragem') {
        location.reload()
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

//---------------------------------------------    CAFE     ---------------------------------------------------------//

function atualizaProcessoCafe(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'btn-higienizacao':
            return atualizaProcessoEtapaCafe(false, true, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-secagem':
            return atualizaProcessoEtapaCafe(false, false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-prensagem':
            return atualizaProcessoEtapaCafe(false, false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-filtragem':
            return atualizaProcessoEtapaCafe(false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaCafe(higenizacao, secagem, prensagem, filtragem, quantidade_de_entrada, id, etapa) {
    const conexao = await fetch(`${api}/processos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Quantidade_de_entrada: quantidade_de_entrada,
            Higenizacao_selecao: higenizacao,
            Secagem: secagem,
            Prensagem: prensagem,
            Filtragem: filtragem
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    alert(`O processo ${id} foi atualizado`)
    if (etapa != 'btn-filtragem') {
        location.reload()
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

//---------------------------------------------    BURITI     ---------------------------------------------------------//

function atualizaProcessoBuriti(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'btn-higienizacao':
            return atualizaProcessoEtapaBuriti(false, true, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-despolpa':
            return atualizaProcessoEtapaBuriti(false, false, true, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-secagem':
            return atualizaProcessoEtapaBuriti(false, false, false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-prensagem':
            return atualizaProcessoEtapaBuriti(false, false, false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-filtragem':
            return atualizaProcessoEtapaBuriti(false, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaBuriti(higenizacao, despolpa, secagem, prensagem, filtragem, quantidade_de_entrada, id, etapa) {
    const conexao = await fetch(`${api}/processos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Quantidade_de_entrada: quantidade_de_entrada,
            Higenizacao_selecao: higenizacao,
            Secagem: secagem,
            Despolpa: despolpa,
            Prensagem: prensagem,
            Filtragem: filtragem
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    alert(`O processo ${id} foi atualizado`)
    if (etapa != 'btn-filtragem') {
        location.reload()
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}


//---------------------------------------------    AÇAI    ---------------------------------------------------------//

function atualizaProcessoAcai(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'btn-higienizacao':
            return atualizaProcessoEtapaAcai(false, true, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-secagem':
            return atualizaProcessoEtapaAcai(false, false, true, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-despolpa':
            return atualizaProcessoEtapaAcai(false, false, false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-prensagem':
            return atualizaProcessoEtapaAcai(false, false, false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-filtragem':
            return atualizaProcessoEtapaAcai(false, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaAcai(higenizacao, secagem, despolpa, prensagem, filtragem, quantidade_de_entrada, id, etapa) {
    const conexao = await fetch(`${api}/processos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Quantidade_de_entrada: quantidade_de_entrada,
            Higenizacao_selecao: higenizacao,
            Secagem: secagem,
            Despolpa: despolpa,
            Prensagem: prensagem,
            Filtragem: filtragem
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    alert(`O processo ${id} foi atualizado`)
    if (etapa != 'btn-filtragem') {
        location.reload()
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

//---------------------------------------------    CITRONELA    ---------------------------------------------------------//

function atualizaProcessoCitronela(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'btn-higienizacao':
            return atualizaProcessoEtapaCitronela(false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-destilacao':
            return atualizaProcessoEtapaCitronela(false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-filtragem':
            return atualizaProcessoEtapaCitronela(false, false, false, quantidade_de_entrada, id, etapa)
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaCitronela(higenizacao, destilacao, filtragem, quantidade_de_entrada, id, etapa) {
    const conexao = await fetch(`${api}/processos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Quantidade_de_entrada: quantidade_de_entrada,
            Higenizacao_selecao: higenizacao,
            Filtragem: filtragem,
            Destilacao: destilacao
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    alert(`O processo ${id} foi atualizado`)
    if (etapa != 'btn-filtragem') {
        location.reload()
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

//---------------------------------------------    BREU    ---------------------------------------------------------//

function atualizaProcessoBreu(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'btn-selecao-primaria':
            return atualizaProcessoEtapaBreu(false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-destilacao':
            return atualizaProcessoEtapaBreu(false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-filtragem':
            return atualizaProcessoEtapaBreu(false, false, false, quantidade_de_entrada, id, etapa)
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaBreu(selecaoPrimaria, destilacao, filtragem, quantidade_de_entrada, id, etapa) {
    const conexao = await fetch(`${api}/processos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Quantidade_de_entrada: quantidade_de_entrada,
            Destilacao: destilacao,
            Filtragem: filtragem,
            selecao_primaria: selecaoPrimaria
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    alert(`O processo ${id} foi atualizado`)
    if (etapa != 'btn-filtragem') {
        location.reload()
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

//---------------------------------------------    CASTANHA     ---------------------------------------------------------//

function atualizaProcessoCastanha(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'btn-selecao-primaria':
            return atualizaProcessoEtapaCastanha(false, true, false, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-secagem':
            return atualizaProcessoEtapaCastanha(false, false, true, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-cozimento':
            return atualizaProcessoEtapaCastanha(false, false, false, true, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-quebra-de-sementes':
            return atualizaProcessoEtapaCastanha(false, false, false, false, true, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-estufagem':
            return atualizaProcessoEtapaCastanha(false, false, false, false, false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-separacao':
            return atualizaProcessoEtapaCastanha(false, false, false, false, false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-filtragem':
            return atualizaProcessoEtapaCastanha(false, false, false, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaCastanha(selecao, secagem, cozimento, quebra, estufagem, separacao, filtragem, quantidade_de_entrada, id, etapa) {
    const conexao = await fetch(`${api}/processos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Quantidade_de_entrada: quantidade_de_entrada,
            selecao_primaria: selecao,
            Secagem: secagem,
            cozimento: cozimento,
            Quebra_de_sementes: quebra,
            estufagem: estufagem,
            separacao: separacao,
            Filtragem: filtragem
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    alert(`O processo ${id} foi atualizado`)
    if (etapa != 'btn-filtragem') {
        location.reload()
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

//---------------------------------------------    COPAIBA    ---------------------------------------------------------//

function atualizaProcessoCopaiba(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'btn-higienizacao':
            return atualizaProcessoEtapaCopaiba(false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'btn-filtragem':
            return atualizaProcessoEtapaCopaiba(false, false, quantidade_de_entrada, id, etapa)
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaCopaiba(higenizacao, filtragem, quantidade_de_entrada, id, etapa) {
    const conexao = await fetch(`${api}/processos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Quantidade_de_entrada: quantidade_de_entrada,
            Higenizacao_selecao: higenizacao,
            Filtragem: filtragem,
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    alert(`O processo ${id} foi atualizado`)
    if (etapa != 'btn-filtragem') {
        location.reload()
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

//---------------------------------------------------exports--------------------------------------------------------------//

export const atualizar = {
    atualizaProcessos,
}