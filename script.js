document.addEventListener("DOMContentLoaded", function () {
    loadAndCreateCharts();
  });
  
  async function loadAndCreateCharts() {
    try {
      console.log("Carregando dados...");
      const config = {
        headers: {
          "X-Parse-Application-Id": "iRnH8RFUpMtwo9rQA6oVwfUveShMIghHpOuQ7JPq",
          "X-Parse-REST-API-Key": "RnURHvIzxQHiw4Ok0zQpYmHuQJEuLAbYQxDv68dU",
        },
      };
  
      const response = await axios.get(
        "https://parseapi.back4app.com/classes/Microdados_NE?limit=100000",
        config
      );
      const data = response.data.results;
      console.log(`Quantidade de linhas carregadas: ${data.length}`);
      createCharts(data);
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
    }
  }
  
  function createCharts(data) {
    console.log("Criando gráficos...");
  
    const chartData = {
      esgoto: {
        data: [0, 0, 0, 0],
        labels: ["Fossa Séptica", "Fossa Comum", "Fossa", "Inexistente"],
      },
      agua: {
        data: [0, 0, 0, 0, 0, 0],
        labels: [
          "Potável",
          "Rede Pública",
          "Poço Artesiano",
          "Cacimba",
          "Fonte de Rio",
          "Inexistente",
        ],
      },
      energia: {
        data: [0, 0, 0, 0],
        labels: ["Rede Pública", "Gerador Fóssil", "Renovável", "Inexistente"],
      },
      lixo: {
        data: [0, 0, 0, 0, 0],
        labels: [
          "Serviço de Coleta",
          "Queima",
          "Enterra",
          "Destino Final Público",
          "Descarta em Outra Área",
        ],
      },
      internet: {
        data: [0, 0, 0, 0, 0],
        labels: [
          "Internet Geral",
          "Alunos",
          "Administrativo",
          "Aprendizagem",
          "Comunidade",
        ],
      },
    };
  
    data.forEach((item) => {
      chartData.esgoto.data[0] += item.IN_ESGOTO_FOSSA_SEPTICA || 0;
      chartData.esgoto.data[1] += item.IN_ESGOTO_FOSSA_COMUM || 0;
      chartData.esgoto.data[2] += item.IN_ESGOTO_FOSSA || 0;
      chartData.esgoto.data[3] += item.IN_ESGOTO_INEXISTENTE || 0;
  
      chartData.agua.data[0] += item.IN_AGUA_POTAVEL || 0;
      chartData.agua.data[1] += item.IN_AGUA_REDE_PUBLICA || 0;
      chartData.agua.data[2] += item.IN_AGUA_POCO_ARTESIANO || 0;
      chartData.agua.data[3] += item.IN_AGUA_CACIMBA || 0;
      chartData.agua.data[4] += item.IN_AGUA_FONTE_RIO || 0;
      chartData.agua.data[5] += item.IN_AGUA_INEXISTENTE || 0;
  
      chartData.energia.data[0] += item.IN_ENERGIA_REDE_PUBLICA || 0;
      chartData.energia.data[1] += item.IN_ENERGIA_GERADOR_FOSSIL || 0;
      chartData.energia.data[2] += item.IN_ENERGIA_RENOVAVEL || 0;
      chartData.energia.data[3] += item.IN_ENERGIA_INEXISTENTE || 0;
  
      chartData.lixo.data[0] += item.IN_LIXO_SERVICO_COLETA || 0;
      chartData.lixo.data[1] += item.IN_LIXO_QUEIMA || 0;
      chartData.lixo.data[2] += item.IN_LIXO_ENTERRA || 0;
      chartData.lixo.data[3] += item.IN_LIXO_DESTINO_FINAL_PUBLICO || 0;
      chartData.lixo.data[4] += item.IN_LIXO_DESCARTA_OUTRA_AREA || 0;
  
      chartData.internet.data[0] += item.IN_INTERNET || 0;
      chartData.internet.data[1] += item.IN_INTERNET_ALUNOS || 0;
      chartData.internet.data[2] += item.IN_INTERNET_ADMINISTRATIVO || 0;
      chartData.internet.data[3] += item.IN_INTERNET_APRENDIZAGEM || 0;
      chartData.internet.data[4] += item.IN_INTERNET_COMUNIDADE || 0;
    });
  
    const chartColors = {
      esgoto: ["#BF754B", "#A64826", "#732B1A", "#BEC092"],
      agua: ["#BABDBF", "#3F7373", "#BF754B", "#A64826", "#732B1A", "#BEC092"],
      energia: ["#BABDBF", "#3F7373", "#A64826", "#BF754B"],
      lixo: ["#3F7373", "#BABDBF", "#BF754B", "#732B1A", "#BEC092"],
      internet: ["#BABDBF", "#732B1A", "#BEC092", "#BF754B", "#3F7373"],
    };
  
    createChart(
      "esgotoChart",
      "Sistema de Esgoto",
      chartData.esgoto.data,
      chartData.esgoto.labels,
      chartColors.esgoto
    );
    createChart(
      "aguaChart",
      "Água",
      chartData.agua.data,
      chartData.agua.labels,
      chartColors.agua
    );
    createChart(
      "energiaChart",
      "Energia Elétrica",
      chartData.energia.data,
      chartData.energia.labels,
      chartColors.energia
    );
    createChart(
      "LixoChart",
      "Sistema de Coleta de Lixo",
      chartData.lixo.data,
      chartData.lixo.labels,
      chartColors.lixo
    );
    createChart(
      "internetChart",
      "Internet",
      chartData.internet.data,
      chartData.internet.labels,
      chartColors.internet
    );
  }
  
  function createChart(chartId, label, data, labels, colors) {
    const ctx = document.getElementById(chartId).getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            backgroundColor: colors,
            borderColor: colors,
            data: data,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: "bottom",
          align: "center",
          labels: {
            boxWidth: 20,
            padding: 20,
          },
        },
      },
    });
  }
  
  function pesquisar() {
  const termo = document.getElementById("pesquisar").value.trim().toLowerCase();
  const chartDataKeys = Object.keys(chartData);

  let encontrado = false;
  
  chartDataKeys.forEach(key => {
    const labels = chartData[key].labels.map(label => label.toLowerCase());
    const chartContainer = document.getElementById(key + "ChartContainer");

    if (labels.some(label => label.includes(termo))) {
      chartContainer.style.display = "block";
      encontrado = true;
    } else {
      chartContainer.style.display = "none";
    }
  });

  if (!encontrado) {
    alert("Nenhum gráfico encontrado.");
  }
}
