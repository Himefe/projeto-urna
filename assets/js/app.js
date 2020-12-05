
let pessoaVoto = document.querySelector('.d-1-1 span');
let cargoVoto = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numerosVoto = document.querySelector('.d-1-3');



let etapaAtual = 0;

let numerosHtml = '';
let numero = '';
let branco = false;
votos = [];


const etapaInicio = () => {
  let etapa = etapas[etapaAtual];
  branco = false;
  numero = '';
  numerosHtml = '';
  for(i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numerosHtml += '<div class="voto-numero pisca"></div>'
    } else {
    numerosHtml += '<div class="voto-numero"></div>';
    }
  }

  pessoaVoto.style.display = 'none';
  cargoVoto.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numerosVoto.innerHTML = numerosHtml;
}

const atualizarInterface = () => {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true
    } else {
      return false;
    }
  });
  if (candidato.length > 0) {
    candidato = candidato[0];
    pessoaVoto.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.nome}<br> Partido: ${candidato.partido}`;
    let fotosHtml = '';
    aviso.style.display = 'block';
    for (let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHtml += `<div class="d-1-img small"><img src="assets/images/${candidato.fotos[i].url}" alt="Vereador-Foto"><strong>${candidato.fotos[i].legenda}</strong></div>`
      } else {
        fotosHtml += `<div class="d-1-img"><img src="assets/images/${candidato.fotos[i].url}" alt="Vereador-Foto"><strong>${candidato.fotos[i].legenda}</strong></div>`
      }
    }
    lateral.innerHTML = fotosHtml;
  } else {
    pessoaVoto.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="nulo">VOTO NULO</div>'
  }
}


const botaoClick = (event) => {
  const numeroValue = event.target.innerText;
  const elementNumero = document.querySelector('.voto-numero.pisca');
  if(elementNumero !== null) {
    elementNumero.innerText = numeroValue;
    elementNumero.classList.remove('pisca');
    numero = `${numero}${numeroValue}`; 
    if (elementNumero.nextElementSibling !== null){
      elementNumero.nextElementSibling.classList.add('pisca');
      
    } else {
      atualizarInterface();
    }
  }
}

const brancoButton = () => {
  if (numero === '') {
    branco = true;
    pessoaVoto.style.display = 'block';
    aviso.style.display = 'block';
    numerosVoto.innerHTML = '';
    descricao.innerHTML = '<div class="nulo brancoVote">VOTO EM BRANCO</div>'
  } 
}

const corrigeButton = () => etapaInicio();

const confirmaButton = () => {
  let etapa = etapas[etapaAtual];
  let votoConfirmado = false;
  if (branco === true) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco',
    });
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero,
    });
  }
  if (votoConfirmado) {
    etapaAtual++;
    if(etapas[etapaAtual] !== undefined){
      etapaInicio();
    } else {
      document.querySelector('.tela-Urna').innerHTML = '<div class="nulo fim">FIM</div>';
      console.log(votos);
    }
  }
}

etapaInicio();




document.querySelectorAll('.numero:not(.corrige):not(.branco):not(.confirma)').forEach((item) => {
  item.addEventListener('click', botaoClick);
});

document.querySelector('.corrige').addEventListener('click', corrigeButton);
document.querySelector('.branco').addEventListener('click', brancoButton);
document.querySelector('.confirma').addEventListener('click', confirmaButton);




