var app = new Vue({
    el: '#app',
    data: {
        inicio: true,
        jugar: false,
        botonInicio: true,
        puesto: 1,
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

            response = await axios.get('/puesto')
            this.puesto = await response.data.Puesto
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
            this.datosJuego.estado = await response.data.Estado
        },
        async hit() {
            let response = await axios.get('/hit')
            this.datosJuego.cartas = await response.data.Cartas
        },
        async update() {
            let response = await axios.get('/estado')
            this.datosJuego.cartas = await response.data.Cartas
            this.datosJuego.estado = await response.data.Estado
            this.datosJuego.segundos = await response.data.Segundos
            this.datosJuego.turno = await response.data.Turno
            
            this.$forceUpdate()
        }
    },
    asyncComputed: {
        async verEstado() {
            let response = await axios.get('/estado')
            if (await response.data.Estado=='Disponible' || await response.data.Estado=='Recibiendo') {
               //this.botonInicio=false 
            }
            this.datosJuego.estado = await response.data.Estado

            console.log(response)
            return await this.datosJuego.estado
        }, 
        async calcSuma(){
            let response = await axios.get('/estado')
            this.datosJuego.cartas = await response.data.Cartas
            for(i in this.datosJuego.cartas[this.puesto]){
                let naipe=this.datosJuego.cartas[this.puesto][i]
                valor=naipe.Valor
                if(valor=='J'||valor=='Q'||valor=='K'){
                    valor=10
                }else if(valor=='A'){
                    valor=11
                }
                this.suma=this.suma+parseInt(valor)
            }
            
            return await this.suma
        }

    }

});

