import api from './linkAPI.js'

async function verificaMaquinas(tipo, dias){
    const conexao = await fetch(`${api}/maquinas`)
    const conexaoConvertida = await conexao.json();
    conexaoConvertida.forEach(element => {
        if(element.tipo_processo == tipo){
            let diasAtualizado = element.dias_utilizados + Number(dias);
            let id = element.id
            atualizaDiaTrabalhadoMaquina(id, diasAtualizado)
        }
    });
}

async function atualizaDiaTrabalhadoMaquina(id, dias){
    const conexao = await fetch(`${api}/maquinas/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            dias_utilizados: dias
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

export const maquinas = {
    verificaMaquinas,
}