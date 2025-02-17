function calcularDiferencaDeDiametro() {
  const largura_original = document.getElementById("largura_original").value;
  const serie_original = document.getElementById("serie_original").value;
  const aro_original = document.getElementById("aro_original").value;
  const largura_desejada = document.getElementById("largura_desejada").value;
  const serie_desejada = document.getElementById("serie_desejada").value;
  const aro_desejada = document.getElementById("aro_desejada").value;

  //calcula diametro original
  const diametroOriginal = calculaDiametro(
    largura_original,
    serie_original,
    aro_original
  );

  //calcular diametro desejado
  const diametroDesejado = calculaDiametro(
    largura_desejada,
    serie_desejada,
    aro_desejada
  );
  //seta valor nos input de resultados
  document.getElementById("diametro_original").value = diametroOriginal;
  document.getElementById("diametro_desejado").value = diametroDesejado;

  const possibilidadeText = document.getElementById("possibilidade");
  const limitePercentual = 3.5;

  //calcula diferença
  if (
    largura_original &&
    serie_original &&
    aro_original &&
    largura_desejada &&
    serie_desejada &&
    aro_desejada
  ) {
    const diferencaCalculada = calcularDiferenca(
      diametroOriginal,
      diametroDesejado
    );

    //seta valor nos input de diferença
    document.getElementById("diferencaMm").value =
      diferencaCalculada.diferençaMm;
    document.getElementById("diferencaPercentual").value =
      diferencaCalculada.diferencaPercentual;
    console.log(diferencaCalculada.diferencaPercentual);

    //seta o texto para o user saber se é possivel ou não

    if (Math.abs(diferencaCalculada.diferencaPercentual) > limitePercentual) {
      possibilidadeText.innerText = "NÃO É POSSÍVEL";
      possibilidadeText.classList.add("inviavel");
    } else {
      possibilidadeText.innerText = "POSSÍVEL";
      possibilidadeText.classList.remove("inviavel");
      possibilidadeText.classList.add("viavel");
    }
  }
}
function calculaDiametro(largura, serie, aro) {
  //converte polegadas para mm
  const aroEmMm = aro * 25.4;

  //calcula altura lateral
  const alturaLateral = largura * (serie / 100);

  //calcula diametro total
  const diametro = alturaLateral * 2 + aroEmMm;

  //retorna com 1 casa deciaml
  return Math.round(diametro * 10) / 10;
}

function calcularDiferenca(diamentroOriginal, diametroDesejado) {
  //diferença maxima considerando 3%
  const diferençaMm = diamentroOriginal - diametroDesejado;
  const diferencaPercentual = (diferençaMm / diamentroOriginal) * 100;

  return {
    diferençaMm: Math.round(diferençaMm * 10) / 10,
    diferencaPercentual: Math.round(diferencaPercentual * 10) / 10,
  };
}
