google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);


var myVar = setInterval(myTimer, 50)
var control = 0;
var test = [
    ['Valores', 'Variação'],
    ['0', 0]
];

var waterHeight = 170; //min 0 && max 170
var statusInit = false;
var water;




// gráfico
function drawChart() {
    var data = google.visualization.arrayToDataTable(test);

    var options = {
        title: 'Gráfico de variação',
        curveType: 'function',
        legend: { position: 'top' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('div-graph'));

    chart.draw(data, options);
}

function waterAnimation(lastHeight) {
    if (statusInit == false) {
        //water = draw.image("./water.svg").size(100, 100).move((250+2), (500-215));
        water = draw.rect(100, 100).move((250 + 2), (500 - 253)).fill('#33b9e4').rotate(180);
        water.height(20);
        statusInit = true;
    }
    if (control > 49) {
        control = 0;
    }

    //water.height(20+controle*3);
    water.height(lastHeight);
}

//ANIMAÇÃO
var X_page = 500;
var Y_page = 500;
var auxY = 380 - 55;
var draw = SVG().addTo('.div-animation').size('' + X_page, '' + Y_page);
draw.rect(500, 500).fill('#333');
var X_image = 260;
var Y_image = 260;
var image_tank = draw.image("./water_tank.png");
image_tank.move((X_page / 2) - (X_image / 2), (Y_page / 2) - (Y_image / 2)).size(X_image, Y_image);
var image_flecha1 = draw.image("./arrow.svg");
image_flecha1.move((X_page / 2) - (50 / 2), 75).size(50, 50);
var image_flecha2 = draw.image("./arrow.svg");
image_flecha2.move((X_page / 2) - (50 / 2), 380).size(50, 50);

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
    while (test.length > 300) {
        test.splice(1, 1);
    }
}

var firstExecution = 0;
if (firstExecution == 0) {
    sp = 0;
    kd = 0;
    kp = 0;
    ki = 0;
    slider1 = 0;
    slider2 = 50;
    firstExecution++;
}
function myTimer() {
    //console.log(slider2);

    idealTankLevel = slider2;

    //teste.push(['00' + controle, 7 * Math.cos(controle)]);

    waterAnimation((tankLevel*165)/100);
    // animacao_agua(165);

    control_data_object();

    control++;

    pid();
    test.push(['' + control, tankLevel]);
    drawChart();
}

var p_term;
var i_term;
var d_term;
var sum_erro = 0;
var last_erro = 0;
var OV_value; // out system value
var variation = 0;
var tmp_error;

var error = 0;
var sp = 0;//setpoint - inicio
var kp = 0;
var ki = 2;
var kd = 5;

var liquidInput = 10; //entrada de liquido
var idealTankLevel = slider2; // controle vertical
var tankLevel = 0;// posição inicial
var maxTankLevel = 100; //limite do tanque

var fixLiquidEvasion = slider1; //10 L/s


var aux = 1000;

function pid() {
    variation = (idealTankLevel - tankLevel);
    console.log(idealTankLevel);

    error = variation - sp;


    // Calculate Pterm and limit error overflow
    if (error > aux / (kp + 1)) {
        p_term = aux;
    } else if (p_term < -(aux / (kp + 1))) {
        p_term = -aux;
    } else {
        p_term = kp * error;
    }

    // Calculate Iterm and limit integral runaway
    tmp_error = sum_erro + error;

    if (tmp_error > aux / (ki + 1)) {
        i_term = aux;
        sum_erro = aux / (ki + 1);
    } else if (tmp_error < -aux / (ki + 1)) {
        i_term = -aux;
        sum_erro = -(aux / (ki + 1));
    } else {
        sum_erro = tmp_error;
        i_term = ki * sum_erro;
    }

    // Calculate Dterm
    d_term = kd * (last_erro - error);
    last_erro = error;

    // Output
    OV_value = (p_term + i_term + d_term);
    if (OV_value > aux) {
        OV_value = aux;
    } else if (OV_value < -aux) {
        OV_value = -aux;
    }

    tankLevel += (OV_value / 100);
    if (tankLevel < 0) tankLevel = 0;
    if (tankLevel > 100) tankLevel = 100;
}
