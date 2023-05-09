let divGirar = document.getElementById("btnGirar"); // ? Botão de girar
let qtdMoedas = document.getElementById("qtdMoedas"); // ? h2 com o saldo
let txtsup = document.getElementById("txtsup"); // ? Texto da div superior

let imgEsq = document.getElementById("imgEsq"); // ? imagem do slot 1
let imgMeio = document.getElementById("imgMeio"); // ? imagem do slot 2
let imgDir = document.getElementById("imgDir"); // ? imagem do slot 1

let coins = 1000; 
let aposta = 100;

function sortear() {
  let sorteio = Math.floor(Math.random() * 13) + 1; 
  return sorteio;
}

function mudaImagem() {
  let sorteio = sortear();
  let caminho;

  switch (sorteio) {
    case 1:
      caminho = "Imagens/fruits/apple.png";
      break;

    case 2:
      caminho = "Imagens/fruits/cherry.png";
      break;

    case 3:
      caminho = "Imagens/fruits/lemon.png";
      break;

    case 4:
      caminho = "Imagens/fruits/orange.png";
      break;

    case 5:
      caminho = "Imagens/fruits/plum.png";
      break;

    case 6:
      caminho = "Imagens/fruits/watermelon.png";
      break;

    case 7:
      caminho = "Imagens/lucky/clover.png";
      break;

    case 8:
      caminho = "Imagens/lucky/diamond.png";
      break;

    case 9:
      caminho = "Imagens/lucky/goldcoin.png";
      break;

    case 10:
      caminho = "Imagens/special/bar.png";
      break;

    case 11:
      caminho = "Imagens/special/bell.png";
      break;

    case 12:
      caminho = "Imagens/special/horseshoe.png";
      break;

    case 13:
      caminho = "Imagens/special/seven.png";
      break;

    default:
      break;
  }

  return caminho;
}

function transition() {
  let transition = setInterval(function () {
    txtsup.innerHTML = "Girando...";
    divGirar.style.cursor = "not-allowed";
    divGirar.removeEventListener("click", rodar);

    divGirar.setAttribute("id", "btnRodando");

    imgEsq.setAttribute("src", mudaImagem());
    imgMeio.setAttribute("src", mudaImagem());
    imgDir.setAttribute("src", mudaImagem());
  }, 100);

  setTimeout(function () {
    clearInterval(transition);

    divGirar.style.cursor = "pointer";

    verifica();

    divGirar.setAttribute("id", "btnGirar");

    divGirar.addEventListener("click", rodar);
  }, 2850);
}

function verifica() {

  // ? pega a inicial da pasta que o item está (f, l ou s)
  (s1 = imgEsq.getAttribute("src")),
  (s2 = imgMeio.getAttribute("src")),
  (s3 = imgDir.getAttribute("src")),
  (class1 = s1.charAt(8)),
  (class2 = s2.charAt(8)),
  (class3 = s3.charAt(8));

  // ? Verifica se pelo menos 2 itens são iguais
  if (s1 == s2 || s1 == s3 || s2 == s3) {
    playAudioWin();

    // ? Verifica se os três são iguais
    if (s1 == s2 && s1 == s3) {
      if (class1 == "f") {
        txtsup.innerHTML = "Parabéns! + 1000 moedas";
        coins += 1000;
      } else if (class1 == "s") {
        txtsup.innerHTML = "Parabéns! + 1500 moedas!";
        coins += 1500;
      } else {
        txtsup.innerHTML = "Parabéns! + 2000 moedas!";
        coins += 2000;
      }

    // ? Verifica se o item 1 está entre os iguais
    } else if (s1 == s2 || s1 == s3) {
      if (class1 == "f") {
        txtsup.innerHTML = "Parabéns! + 300 moedas";
        coins += 300;
      } else if (class1 == "s") {
        txtsup.innerHTML = "Parabéns! + 500 moedas!";
        coins += 500;
      } else {
        txtsup.innerHTML = "Parabéns! + 700 moedas!";
        coins += 700;
      }

    // ? Como o item 1 não é igual aos outros, usa o 2
    } else {
      if (class2 == "f") {
        txtsup.innerHTML = "Parabéns! + 300 moedas";
        coins += 300;
      } else if (class2 == "s") {
        txtsup.innerHTML = "Parabéns! + 500 moedas!";
        coins += 500;
      } else {
        txtsup.innerHTML = "Parabéns! + 700 moedas!";
        coins += 700;
      }
    }

  // ? Não ganhou
  } else {
    txtsup.innerHTML = "Você perdeu! Tente de novo!";
  }

  qtdMoedas.innerHTML = coins;
}

function perdeu() {
  let janela = confirm(
    "Fim de Jogo! Você não possui mais moedas para apostar! \n\nDeseja reiniciar?"
  );
  if (janela == 1) {
    location.reload();
  }
}

function playAudio() {
  const audio = document.querySelector("#audio");
  audio.play();
}

function playAudioWin() {
  const audio = document.querySelector("#audioWin");
  audio.play();
}

function rodar() {
  divGirar.innerHTML = "Girar";

  if (coins <= 0) {
    perdeu();
  } else if(coins > 2000){
    aposta = Math.floor(coins / 1000) * 100
  }else{
    aposta = 100
  }
    coins -= aposta;
    qtdMoedas.innerHTML = coins;

    playAudio();

    transition();
  
}

divGirar.addEventListener("click", rodar);
