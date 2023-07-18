function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = data.getUTCDate().toString().padStart(2, '0');
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = data.getUTCFullYear().toString();
  
    return `${dia}/${mes}/${ano}`;
  }

export const uteis = {
    formatarData,
}
  