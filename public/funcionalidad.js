var app = new Vue({
    el: '#app',
    data: {
        inicio: true,
        jugar: false,
        botonInicio: true,
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

            // let response = await axios.get('/')
            // this.datosJuego.estado = await response.data.Estado
            // this.datosJuego.segundos = await response.data.Segundos
            // this.datosJuego.turno = await response.data.Turno

            if (true) {
                this.inicio = false;
                this.jugar = true;
    
                let response = await axios.get('/join')
    
                this.datosJuego.cartas = await response.data.Cartas
                this.datosJuego.estado = await response.data.Estado
                this.datosJuego.segundos = await response.data.Segundos
                this.datosJuego.turno = await response.data.Turno
    
                console.log(await response.data.Estado);
            }else{
                console.log('Partida no disponible, turno: '+this.datosJuego.turno+", segundo: "+this.datosJuego.segundos)
            }
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
    },
    asyncComputed: {
        async verEstado() {
            let response = await axios.get('/estado')
            if (await response.data.Estado=='Disponible' || await response.data.Estado=='Recibiendo') {
               this.botonInicio=false 
            }
            console.log(response)
            return await response.data.Estado
        }
    }

});