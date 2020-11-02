var app = new Vue({
    el: '#app',
    data: {
        inicio: true,
        jugar: false,
        suma: 0,
        apuesta: 0,
        ganancia: 0,
        datosJuego: ''
    },
    methods: {
        async comenzarAJugar() {

            this.inicio = false;
            this.jugar = true;

            let respuesta = await fetch('http://172.105.20.118:8080/join')
            this.datosJuego = await respuesta.json();
            
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
        salir(){
            
        },
    }

});