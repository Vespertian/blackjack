var app = new Vue({
    el: '#app',
    data: {
        inicio: true,
        jugar: false,
        botonInicio: true,
        puesto: 0,
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
            this.puesto = await axios.get('/puesto').Puesto
            console.log(this.puesto)

        },
        async verTiempo(){
            let response = await axios.get('/estado')
            this.datosJuego.segundos = await response.data.Segundos
        },
        async salirseDelJuego() {
            this.inicio = true;
            this.jugar = false;

            let response = await axios.get('/leave')
            this.datosJuego.cartas = await response.data.Cartas
            this.datosJuego.estado = await response.data.Estado
            this.datosJuego.segundos = await response.data.Segundos
            this.datosJuego.turno = await response.data.Turno
        },
        async hit() {
            let response = await axios.get('/hit')
            this.datosJuego.cartas = await response.data.Cartas
            this.datosJuego.estado = await response.data.Estado
            this.datosJuego.segundos = await response.data.Segundos
            this.datosJuego.turno = await response.data.Turno
            
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
    },
    asyncComputed: {
        async verEstado() {
            let response = await axios.get('/estado')
            if (await response.data.Estado=='Disponible' || await response.data.Estado=='Recibiendo') {
               //this.botonInicio=false 
            }
            console.log(response)
            return await response.data.Estado
        }, 

    }

});

