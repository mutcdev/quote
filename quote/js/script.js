// ==========================================
// TEMA CLARO E ESCURO
// ==========================================

let themeMode = localStorage.getItem("themeMode") || "light";

const themeModeBtn = document.getElementById("themeMode_btn");

if (themeMode === "dark") {
    document.body.classList.add("dark-mode");
}

if (themeModeBtn) {

    themeModeBtn.innerHTML = themeMode === "dark"
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';

    themeModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        themeMode = document.body.classList.contains("dark-mode")
            ? "dark"
            : "light";

        localStorage.setItem("themeMode", themeMode);

        themeModeBtn.innerHTML = themeMode === "dark"
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';

        lucide.createIcons();
    });
}

if (window.lucide) {
    lucide.createIcons();
}


// ==========================================
// ELEMENTOS HTML
// ==========================================

const card = document.querySelector(".create");
const textocard = document.querySelector(".create_text");
const contador = document.querySelector(".contador");

const inputAutor = document.querySelector(".header_autor");
const inputOrigem = document.querySelector(".header_where");
const inputTitulo = document.querySelector("#inputTitle");

const cores = document.querySelectorAll(".cor");
const coresfonte = document.querySelectorAll(".corfonte");

const seletorFonte = document.querySelector("#fonte");

const botoesAlinhamento = document.querySelectorAll(".btn_alinhar");

const btn_viewCreate = document.querySelector(".btn_viewCreate");


// ==========================================
// DADOS DA CITAÇÃO
// ==========================================

const citacao = {
    corFundo: "",
    corFonte: "",
    fonte: "",
    texto: "",
    autor: "",
    origem: "",
    titulo: "",
    alinhamento: "left"
};

let corCard = "#E9A23B";
let corFonte = "#000000";


// ==========================================
// ATUALIZAR CITAÇÃO
// ==========================================

function atualizarCitacao() {
    citacao.corFundo = corCard;
    citacao.corFonte = corFonte;
    citacao.fonte = seletorFonte.value;
    citacao.texto = textocard.value;
    citacao.autor = inputAutor.value;
    citacao.origem = inputOrigem.value;
    citacao.titulo = inputTitulo.value;
    citacao.alinhamento = textocard.style.textAlign || "left";
}

btn_viewCreate.addEventListener("click", () => {
    atualizarCitacao();
    console.log(citacao);
});


// ==========================================
// CORES DA FONTE
// ==========================================

function atualizarBotoesFonte() {
    coresfonte.forEach(botao => {
        const corf = botao.dataset.cor.toLowerCase();

        const mesmaCor =
            (corCard.toLowerCase() === "#eaeaeb" && corf === "#ffffff") ||
            (corCard.toLowerCase() === "#2a2a2a" && corf === "#000000");

        botao.disabled = mesmaCor;
        botao.classList.toggle("desativado", mesmaCor);
    });
}

function atualizarFonteAtiva() {
    coresfonte.forEach(botao => {
        botao.classList.toggle(
            "ativa",
            botao.dataset.cor.toLowerCase() === corFonte.toLowerCase()
        );
    });
}


// ==========================================
// SELEÇÃO DA COR DO CARD
// ==========================================

cores.forEach(botao => {
    botao.addEventListener("click", () => {
        corCard = botao.dataset.cor;

        card.style.setProperty("--cor-escolhida", corCard);

        atualizarCorContador();

        cores.forEach(b => b.classList.remove("ativa"));
        botao.classList.add("ativa");

        if (
            corCard.toLowerCase() === "#eaeaeb" &&
            corFonte.toLowerCase() === "#ffffff"
        ) {
            corFonte = "#000000";
        }

        if (
            corCard.toLowerCase() === "#2a2a2a" &&
            corFonte.toLowerCase() === "#000000"
        ) {
            corFonte = "#FFFFFF";
        }

        textocard.style.color = corFonte;

        atualizarBotoesFonte();
        atualizarFonteAtiva();
    });
});


// ==========================================
// SELEÇÃO DA COR DA LETRA
// ==========================================

coresfonte.forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao.disabled) return;

        corFonte = botao.dataset.cor;

        textocard.style.color = corFonte;

        atualizarFonteAtiva();
    });
});


// ==========================================
// CONTADOR DE CARACTERES
// ==========================================

textocard.addEventListener("input", () => {
    const quantidade = textocard.value.length;

    contador.textContent = `${quantidade}/2000`;
});

function atualizarCorContador() {
    if (corCard.toLowerCase() === "#2a2a2a") {
        contador.style.color = "#ffffff";
    } else {
        contador.style.color = "#000000";
    }
}


// ==========================================
// SELEÇÃO DA FONTE
// ==========================================

seletorFonte.addEventListener("change", () => {
    textocard.style.fontFamily = seletorFonte.value;
});


// ==========================================
// ALINHAMENTO DO TEXTO
// ==========================================

function alinharTexto(alinhamento) {
    textocard.style.textAlign = alinhamento;

    citacao.alinhamento = alinhamento;
}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarBotoesFonte();
atualizarFonteAtiva();
atualizarCorContador();

const editor = document.querySelector("#editor");
const preview = document.querySelector("#preview");
const areaPreview = document.querySelector("#areaPreview");
const btnVoltar = document.querySelector("#btnVoltar");
const btnPostar = document.querySelector(".btn_postar");

btn_viewCreate.addEventListener("click", () => {

    atualizarCitacao();

    const previewText = document.querySelector("#preview_text");

    // Aplicar as cores e a fonte
    previewText.style.backgroundColor = citacao.corFundo;
    previewText.style.color = citacao.corFonte;
    previewText.style.fontFamily = citacao.fonte;
    previewText.style.textAlign = citacao.alinhamento;

    // Atualizar os textos
    document.querySelector("#preview_title").textContent = citacao.titulo;
    document.querySelector("#preview_quote").textContent = citacao.texto;
    document.querySelector("#preview_author").textContent = citacao.autor;
    document.querySelector("#preview_where").textContent = citacao.origem;

    // Exibir prévia
    editor.style.display = "none";
    preview.classList.add("ativo");

    lucide.createIcons();

});

btnVoltar.addEventListener("click", () => {

    preview.classList.remove("ativo");
    editor.style.display = "";

    

});

btnPostar.addEventListener('click', () => {

    if (citacao.texto.trim() === "" || citacao.autor.trim() === "") {
        alert("O texto da citação e o autor não podem estar vazios.");
        return;
    }
    
})
