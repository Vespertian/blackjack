var app = new Vue({
    el: '#app',
    data: {
        inicio: true,
        jugar: false,
        botonInicio: true,
        puesto: null,
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
    mounted() {
        this.autoUpdate();
    },
    methods: {
        async comenzarAJugar() {
            this.inicio = false;
            this.jugar = true;
            let response = await axios.get('/join')
            console.log("OBJETO: "+await response.data.Estado)
            this.update()
            this.updatePuesto()
        },
        async updatePuesto(){
            if (this.datosJuego.estado=='Disponible' || this.datosJuego.estado=='Recibiendo') {
                let response = await axios.get('/puesto')
                this.puesto = await response.data.Puesto
                console.log("PUESTO UPDATED: "+this.puesto)
            }else{
                console.log("La partida ya inició")
            }
        },
        async continuarJugando(){
            this.inicio = false;
            this.jugar = true;
        },
        async salirseDelJuego() {
            this.inicio = true;
            this.jugar = false;
            let response = await axios.get('/leave')
        },
        async hit() {
            let response = await axios.get('/hit')
        },
        autoUpdate: async function(){
            setInterval(() => {
                this.update()
            }, 1000);
        },
        async update() {
            let response = await axios.get('/estado')
            this.datosJuego.cartas = await response.data.Cartas
            this.datosJuego.estado = await response.data.Estado
            this.datosJuego.segundos = await response.data.Segundos
            this.datosJuego.turno = await response.data.Turno
            console.log("Segundos: "+this.datosJuego.segundos)
            //response = await axios.get('/puesto')
            //this.puesto = await response.data.Puesto
            // console.log(await response.data)
        }
    },
    asyncComputed: {
        async verEstado() {
            let response = await axios.get('/estado')
            if (await response.data.Estado=='Disponible' || await response.data.Estado=='Recibiendo') {
               //this.botonInicio=false 
            }
            this.datosJuego.estado = await response.data.Estado
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
        },
        async verCartas(){
            let response = await axios.get('/estado')
            this.datosJuego.estado = await response.data.Estado
            if (await response.data.Estado=='Disponible'||await response.data.Estado=='Recibiendo') {
                this.datosJuego.cartas = {'Valor':'','Tipo':''}
            }else{
                this.datosJuego.cartas = await response.data.Cartas
            }
            return await this.datosJuego.cartas[this.puesto]
        },
    }

});

