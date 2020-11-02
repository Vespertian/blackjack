var app = new Vue({
    el: '#app',
    data: {
        inicio: true,
        jugar: false,
        suma: 0,
        apuesta: 0,
        ganancia: 0,
        datosJuego: {
            cartas: [],
            estado: '',
            segundos: 0,
            turno: 0
        }
    },
    methods: {
        async comenzarAJugar() {

            this.inicio = false;
            this.jugar = true;

            let response = await axios.get('/join')

            this.datosJuego.cartas = await response.data.Cartas
            this.datosJuego.estado = await response.data.Estado
            this.datosJuego.segundos = await response.data.Segundos
            this.datosJuego.turno = await response.data.Turno

            console.log(await response.data.Estado);

        },
        salirseDelJuego() {
            this.inicio = true;
            this.jugar = false;
        },
        apostar1000() {
            this.apuesta += 1000;
        },
        apostar2000() {
            this.apuesta += 2000;
        },
        apostar5000() {
            this.apuesta += 5000;
        },
        salir() {

        },
    }

});