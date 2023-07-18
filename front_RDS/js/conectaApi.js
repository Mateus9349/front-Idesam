import api from './linkAPI.js'

async function listaColetas(){
    const conexao = await fetch(`${api}/coletas`)
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida
}

export const conectaApi = {
    listaColetas,
}

