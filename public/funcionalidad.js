var app = new Vue({
    el: '#app',
    data: {
        inicio: true,
        jugar: false,
        suma: 21,
        apuesta: 2000
    },
    methods: {
        comenzarAJugar() {
            this.inicio = false;
            this.jugar = true;
        },
        salirseDelJuego() {
            this.inicio = true;
            this.jugar = false;
        }
    }

});