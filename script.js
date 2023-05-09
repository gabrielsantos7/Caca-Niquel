let divGirar = document.getElementById("btnGirar");
let qtdMoedas = document.getElementById("qtdMoedas");
let txtsup = document.getElementById("txtsup");

let imgEsq = document.getElementById("imgEsq");
let imgMeio = document.getElementById("imgMeio");
let imgDir = document.getElementById("imgDir");

let sectionPrincipal = document.getElementById("principal");

let coins = 1000;

function sortear() {
  let sorteio = Math.floor(Math.random() * 10) + 1;
  return sorteio;
}

function mudaImagem() {
  let sorteio = sortear();
  let caminho;

  switch (sorteio) {
    case 1:
      caminho = "Imagens/img1.png";
      break;

    case 2:
      caminho = "Imagens/img2.png";
      break;

    case 3:
      caminho = "Imagens/img3.png";
      break;

    case 4:
      caminho = "Imagens/img4.png";
      break;

    case 5:
      caminho = "Imagens/img5.png";
      break;

    case 6:
      caminho = "Imagens/img6.png";
      break;

    case 7:
      caminho = "Imagens/img7.png";
      break;

    case 8:
      caminho = "Imagens/img8.png";
      break;

    case 9:
      caminho = "Imagens/img9.png";
      break;

    case 10:
      caminho = "Imagens/img10.png";
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
  (s1 = imgEsq.getAttribute("src")),
    (s2 = imgMeio.getAttribute("src")),
    (s3 = imgDir.getAttribute("src"));

  if (s1 == s2 && s1 == s3) {
    playAudioWin();

    if (
      s1 == "Imagens/img1.png" ||
      s1 == "Imagens/img5.png" ||
      s1 == "Imagens/img6.png" ||
      s1 == "Imagens/img8.png" ||
      s1 == "Imagens/img9.png" ||
      s1 == "Imagens/img10.png"
    ) {
      txtsup.innerHTML = "Parabéns! + 1000 moedas";
      coins += 1000;
    } else if (
      s1 == "Imagens/img2.png" ||
      s1 == "Imagens/img3.png" ||
      s1 == "Imagens/img7.png"
    ) {
      txtsup.innerHTML = "Parabéns! + 1500 moedas!";
      coins += 1500;
    } else {
      txtsup.innerHTML = "Parabéns! + 2000 moedas!";
      coins += 2000;
    }
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
  } else {
    coins -= 100;
    qtdMoedas.innerHTML = coins;

    playAudio();

    transition();
  }
}

divGirar.addEventListener("click", rodar);
