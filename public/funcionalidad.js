var app = new Vue({
    el: '#app',
    data: {
        inicio: true,
        jugar: false,
    },
    methods: {
        comenzarAJugar() {
            this.inicio = false;
            this.jugar = true;
        }
    }

});