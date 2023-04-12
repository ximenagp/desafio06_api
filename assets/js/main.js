//tipo de moneda
let elegirMoneda = document.getElementById('valoresMonedas');
let moneda = elegirMoneda.value;
console.log("La moneda es " + moneda)

function nuevaMoneda() {
    moneda = elegirMoneda.value;
    return moneda}
let res;
let data;
let botonBuscar = document.querySelector('#btn-buscar');
const consulta = async () => {  //consulta desde la API
    try {
        let clp = document.querySelector('#clp').value;
        let respuestaConsulta = document.querySelector('.card-footer');

        res = await fetch(`https://mindicador.cl/api/${moneda}`);
        data = await res.json();
        if (clp <= 0) {
            alert('Debes ingresar una cantidad mínima de $1 peso chileno para poder usar este botón')
        } else {
            let operacion = clp / data['serie'][0]['valor'];
            respuestaConsulta.innerHTML = `<p>Resultado: ${operacion.toFixed(2)} de ${data['nombre']}`
        }
        let yValues = [
            data['serie'][9]['valor'],
            data['serie'][8]['valor'],
            data['serie'][7]['valor'],
            data['serie'][6]['valor'],
            data['serie'][5]['valor'],
            data['serie'][4]['valor'],
            data['serie'][3]['valor'],
            data['serie'][2]['valor'],
            data['serie'][1]['valor'],
            data['serie'][0]['valor']
        ];
        let xValues = [
            new Date(data['serie'][9]['fecha']).toLocaleDateString('es-es', {day:"numeric", month:"short", year:"numeric"}),
            new Date(data['serie'][8]['fecha']).toLocaleDateString('es-es', {day:"numeric", month:"short", year:"numeric"}),
            new Date(data['serie'][7]['fecha']).toLocaleDateString('es-es', {day:"numeric", month:"short", year:"numeric"}),
            new Date(data['serie'][6]['fecha']).toLocaleDateString('es-es', {day:"numeric", month:"short", year:"numeric"}),
            new Date(data['serie'][5]['fecha']).toLocaleDateString('es-es', {day:"numeric", month:"short", year:"numeric"}),
            new Date(data['serie'][4]['fecha']).toLocaleDateString('es-es', {day:"numeric", month:"short", year:"numeric"}),
            new Date(data['serie'][3]['fecha']).toLocaleDateString('es-es', {day:"numeric", month:"short", year:"numeric"}),
            new Date(data['serie'][2]['fecha']).toLocaleDateString('es-es', {day:"numeric", month:"short", year:"numeric"}),
            new Date(data['serie'][1]['fecha']).toLocaleDateString('es-es', {day:"numeric", month:"short", year:"numeric"}),
            new Date(data['serie'][0]['fecha']).toLocaleDateString('es-es', {day:"numeric", month:"short", year:"numeric"})
    ];
           new Chart("myChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                label: `últimos diez días de ${moneda}`,
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
              }]
            },
            options: {
              legend: {display: false},
              scales: {
                yAxes: [{ticks: {min: 6, max:16}}],
              }
            }
          });
    } catch (error) {
        error.message
    }}
    botonBuscar.addEventListener('click', () => {   // botón
    nuevaMoneda();
    consulta();
})