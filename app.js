google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);


var myVar = setInterval(myTimer, 25)
var controle = 0;
var teste = [
    ['Valores', 'Variação'],
    ['0', 0]
];

var altura_agua = 170; //min 0 && max 170
var init = false;
var agua;




// gráfico
function drawChart() {
    var data = google.visualization.arrayToDataTable(teste);

    var options = {
        title: 'Gráfico de variação',
        curveType: 'function',
        legend: { position: 'top' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('div-grafico'));

    chart.draw(data, options);
}

// animação
function animacao_agua(ultima_altura_adicionada) {
    if (init == false) {
        //agua = draw.image("./water.svg").size(100, 100).move((250+2), (500-215));
        agua = draw.rect(100, 100).move((250 + 2), (500 - 253)).fill('#33b9e4').rotate(180);
        agua.height(20);
        init = true;
    }
    if (controle > 49) {
        controle = 0;
    }

    //agua.height(20+controle*3);
    agua.height(ultima_altura_adicionada);
}

//ANIMAÇÃO
var X_page = 500;
var Y_page = 500;
var auxY = 380 - 55;
var draw = SVG().addTo('.div-animacao').size('' + X_page, '' + Y_page);
draw.rect(500, 500).fill('#333');
var X_imagem = 260;
var Y_imagem = 260;
var imagem_tank = draw.image("./water_tank.png");
imagem_tank.move((X_page / 2) - (X_imagem / 2), (Y_page / 2) - (Y_imagem / 2)).size(X_imagem, Y_imagem);
var imagem_flecha1 = draw.image("./arrow.svg");
imagem_flecha1.move((X_page / 2) - (50 / 2), 75).size(50, 50);
var imagem_flecha2 = draw.image("./arrow.svg");
imagem_flecha2.move((X_page / 2) - (50 / 2), 380).size(50, 50);

var slider1;
var slider2;


//Slider
function updateSlider1(slideAmount) {
    slider1 = slideAmount;
}
//Slider
function updateSlider2(slideAmount) {
    slider2 = slideAmount;
}
//Number
function updateNumber1(slideAmount) {
    sp = slideAmount;
}
//Number
function updateNumber2(slideAmount) {
    kd = slideAmount;
}
//Number
function updateNumber3(slideAmount) {
    kp = slideAmount;
}
//Number
function updateNumber4(slideAmount) {
    ki = slideAmount;
}

function control_data_object() {
    while (teste.length > 300) {
        teste.splice(1, 1);
    }
}

var primeira_exec = 0;
if (primeira_exec == 0) {
    sp = 0;
    kd = 0;
    kp = 0;
    ki = 0;
    slider1 = 0;
    slider2 = 50;
    primeira_exec++;
}
function myTimer() {
    //console.log(slider2);

    nivel_tanque_desejado = slider2;

    //teste.push(['00' + controle, 7 * Math.cos(controle)]);

    animacao_agua((nivel_tanque_atual*165)/100);
    // animacao_agua(165);

    control_data_object();

    controle++;

    pid();
    teste.push(['' + controle, nivel_tanque_atual]);
    drawChart();
}

var p_term;
var i_term;
var d_term;
var sum_erro = 0;
var last_erro = 0;
var OV_value; //valor de saida
var dist_altDesejada_altAtual = 0;
var tmp_erro;

var erro = 0;
var sp = 0;//setpoint - inicio
var kp = 0;
var ki = 2;
var kd = 5;

var entrada_liquido = 10; //entrada de liquido
var nivel_tanque_desejado = slider2; // controle vertical
var nivel_tanque_atual = 0;// posição inicial
var nivel_maximo_suportado = 100; //limite do tanque

var saida_fixa_liquido = slider1; //10 L/s


var aux = 1000;

function pid() {
    dist_altDesejada_altAtual = (nivel_tanque_desejado - nivel_tanque_atual);
    console.log(nivel_tanque_desejado);

    erro = dist_altDesejada_altAtual - sp;


    // Calculate Pterm and limit error overflow
    if (erro > aux / (kp + 1)) {
        p_term = aux;
    } else if (p_term < -(aux / (kp + 1))) {
        p_term = -aux;
    } else {
        p_term = kp * erro;
    }

    // Calculate Iterm and limit integral runaway
    tmp_erro = sum_erro + erro;

    if (tmp_erro > aux / (ki + 1)) {
        i_term = aux;
        sum_erro = aux / (ki + 1);
    } else if (tmp_erro < -aux / (ki + 1)) {
        i_term = -aux;
        sum_erro = -(aux / (ki + 1));
    } else {
        sum_erro = tmp_erro;
        i_term = ki * sum_erro;
    }

    // Calculate Dterm
    d_term = kd * (last_erro - erro);
    last_erro = erro;

    //Saida
    OV_value = (p_term + i_term + d_term);
    if (OV_value > aux) {
        OV_value = aux;
    } else if (OV_value < -aux) {
        OV_value = -aux;
    }

    nivel_tanque_atual += (OV_value / 100);
    if (nivel_tanque_atual < 0) nivel_tanque_atual = 0;
    if (nivel_tanque_atual > 100) nivel_tanque_atual = 100;
}