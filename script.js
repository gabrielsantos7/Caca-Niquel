const divGirar = document.getElementById("btnGirar"); // ? Botão de girar
const qtdMoedas = document.getElementById("qtdMoedas"); // ? h2 com o saldo
const txtsup = document.getElementById("txtsup"); // ? Texto da div superior

const imgEsq = document.getElementById("imgEsq"); // ? imagem do slot 1
const imgMeio = document.getElementById("imgMeio"); // ? imagem do slot 2
const imgDir = document.getElementById("imgDir"); // ? imagem do slot 1

const images = {
  1: "Imagens/fruits/apple.png",
  2: "Imagens/fruits/cherry.png",
  3: "Imagens/fruits/lemon.png",
  4: "Imagens/fruits/orange.png",
  5: "Imagens/fruits/plum.png",
  6: "Imagens/fruits/watermelon.png",
  7: "Imagens/lucky/clover.png",
  8: "Imagens/lucky/diamond.png",
  9: "Imagens/lucky/goldcoin.png",
  10: "Imagens/special/bar.png",
  11: "Imagens/special/bell.png",
  12: "Imagens/special/horseshoe.png",
  13: "Imagens/special/seven.png",
};

let coins = 1000;
let aposta = 100;

function sortear() {
  return Math.floor(Math.random() * 13) + 1;
}

function mudaImagem() {
  let sorteio = sortear();
  return images[sorteio];
}

function mudaHTMLAnimacao() {
  txtsup.innerHTML = "Girando...";
  divGirar.style.cursor = "not-allowed";
  divGirar.removeEventListener("click", rodar);

  divGirar.setAttribute("id", "btnRodando");
}

function mudaCorGanhou(){
  txtsup.style.backgroundColor = "#3fcc42";
}

function mudaCorPerdeu(){
  txtsup.style.backgroundColor = "goldenrod";
}

function transition() {
  let transition1 = setInterval(function () {
    mudaHTMLAnimacao();

    imgEsq.setAttribute("src", mudaImagem());
    imgMeio.setAttribute("src", mudaImagem());
    imgDir.setAttribute("src", mudaImagem());
  }, 100);

  setTimeout(() => {
    clearInterval(transition1); // Para a primeira animação
    let transition2 = setInterval(function () {
      mudaHTMLAnimacao();

      imgMeio.setAttribute("src", mudaImagem());
      imgDir.setAttribute("src", mudaImagem());
    }, 100);

    setTimeout(() => {
      clearInterval(transition2); // Para a segunda animação
      let transition3 = setInterval(function () {
        mudaHTMLAnimacao();

        imgDir.setAttribute("src", mudaImagem());
      }, 100);

      setTimeout(() => {
        clearInterval(transition3); // Para a terceira animação
        divGirar.style.cursor = "pointer";

        verifica();

        divGirar.setAttribute("id", "btnGirar");

        divGirar.addEventListener("click", rodar);
      }, 975);
    }, 975);
  }, 975);

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
    mudaCorGanhou();
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
    txtsup.innerHTML = "Não foi dessa vez...";
  }

  qtdMoedas.innerHTML = coins;
}

function perdeu() {
  let janela = confirm(
    "Fim de Jogo! Você não possui mais moedas para apostar! \n\nDeseja reiniciar?"
  );
  if (janela) {
    location.reload();
  } else {
    window.location.href = "index.html";
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
  mudaCorPerdeu();

  if (coins <= 0) {
    perdeu();
  } else if (coins > 2000) {
    aposta = Math.floor(coins / 1000) * 100;
  } else {
    aposta = 100;
  }
  coins -= aposta;
  qtdMoedas.innerHTML = coins;

  playAudio();

  transition();
}

divGirar.addEventListener("click", rodar);