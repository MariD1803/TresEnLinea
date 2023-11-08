const spinnerActive =()=> {

    setTimeout(()=>{
        document.querySelector('.spinner').classList.add("spinner-active")
        document.querySelector('.spinner').classList.remove('hidden')
    
    },"600")
               
    


}

const spinnerDeactive = () => {
setTimeout(()=>{
    document.querySelector('.spinner').classList.remove("spinner-active")
    document.querySelector('.spinner').classList.add('hidden')
},"900")
}

const audio = new Audio()
audio.src = './mario-bros tuberia.mp3'
const win = new Audio()
win.src = './mario-bros.mp3'
const buttonClick = new Audio()
buttonClick.src = './Mouse_Click.mp3'


const app = Vue.createApp({
    
    data() {
        return{
            tablero: Array(9).fill(""),
            jugador: Math.random() > 0.5 ? 'X' : 'O',
            ganador: null,
            counter: 0,
        }
    },
    methods: {
        setFicha(index) {
            if (!this.tablero[index] && !this.ganador) {
                this.tablero[index] = this.jugador;
                this.counter++
                document.querySelector('#juego-info').style.animation="2s anim-lineUp ease-out"
                setTimeout(()=>{
                    
                document.querySelector('#juego-info').style.animation="none"
                }, "600")
                if(this.counter == 9){
                    this.setEmpate()
                }
                if (this.chequearJugador(this.jugador)) {
                    this.ganador = this.jugador;
                    this.setGanador()
                } else {
                    this.jugador = this.jugador === "X" ? "O" : "X";
                }
            }
        },
        async setFichaCPU(index) {

            if(this.counter == 9){
                this.setEmpate()
            }
           
            function wait (ms) {
                return new Promise(resolve =>setTimeout(resolve, ms))
            }

            if(this.jugador == "O" && !this.ganador) {
                document.querySelectorAll('.cuadro').forEach(e => e.style.cursor = 'none')

                let getRandomInt=(min, max) =>{
                    return Math.floor(Math.random() * (max - min)) + min;
                }   
                posicion = getRandomInt(0, 9); 
                        
                if(this.tablero[posicion] == ""){
                    if(this.tablero[4] == ""){
                        posicion = 4
                    }

                    this.chequearJugadaCPU('X')

                    await wait(600);
                    
                    this.tablero[posicion] = this.jugador;
                    buttonClick.play()
                    document.querySelector('#juego-info-cpu').style.animation="2s anim-lineUp ease-out"   
                    if (this.chequearJugador(this.jugador)) {
                        this.ganador = this.jugador;                        
                        this.setGanador()
                    }
                            
                    if(this.counter == 9){
                        this.setEmpate()
                    } 
                
                    await wait(500);
                   
                    this.counter++
                    this.jugador = "X"             
                       
                    setTimeout(()=>{
                       
                        document.querySelector('#juego-info-cpu').style.animation="none"
                    }, "400")               
                        
                    this.setFichaCPU()
                } else {
                    this.jugador= "O"
                    if(this.counter == 9){
                        this.setEmpate()
                    }
                    this.setFichaCPU()
                } 
                
              
            }
            
            await wait(300)
            

            if (!this.tablero[index] && !this.ganador && index != undefined) {
                document.querySelectorAll('.cuadro').forEach(e => e.style.cursor = 'pointer')
                
                document.querySelector('#juego-info-cpu').style.animation="2s anim-lineUp ease-out"
                setTimeout(()=>{
                    
                document.querySelector('#juego-info-cpu').style.animation="none"
                }, "600")


                this.tablero[index] = this.jugador;  
                
                this.counter++            
               

                if (this.chequearJugador(this.jugador)) {
                    this.ganador = this.jugador;
                    this.setGanador()
                }
                
                if(this.counter == 9){
                    this.setEmpate()
                }
                
                this.jugador = "O"
                this.setFichaCPU()
                return
           }           
           
        },
        chequearJugador(player) {
            const combosGanadores = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (const combo of combosGanadores) {
                const [a, b, c] = combo;
                if (this.tablero[a] === player && this.tablero[b] === player && this.tablero[c] === player) {
                    return true;
                }
            }
            return false;
        },
        chequearJugadaCPU(player) {           
            const combosGanadores = [
                [4, 8, 0],
                [4, 0, 8],
                [4, 2, 6],
                [4, 6, 2],
                [2, 8, 5],
                [2, 5, 8],
                [5, 8, 2],
                [1, 4, 7],
                [1, 7, 4],
                [7, 4, 1],
                [0, 3, 6],
                [3, 6, 0],
                [0, 6, 3],
                [0, 1, 2],
                [1, 2, 0],
                [2, 0, 1],
                [3, 4, 5],
                [3, 5, 4],
                [4, 5, 3],
                [6, 7, 8],
                [7, 8, 6],
                [6, 8, 7],
                
            ];

            for (const combo of combosGanadores) {
                const [a, b, c] = combo;
                if (this.tablero[a] === player && this.tablero[b] === player && this.tablero[c] === '') {
                    
                    return posicion = c;
                }
            }
            return;
        },
        setJugador(){
            if(this.jugador == 'X'){
                return 'Jugador'
            }else{
                return 'CPU'
            }
        },
        setGanadorCPU(){
            if(this.ganador == 'X'){
                return 'Jugador'
            }else{
                return 'CPU'
            }
        },

        setGanador () {       
            win.play()
            clearInterval(id);
            this.tablero = Array(9).fill("");
            this.counter = 0 

            if(document.querySelector('#tresEnLinea2Players').classList.contains('active')){
            document.querySelector('#juego-info').classList.add('hidden')
            document.querySelector('#modal-container').classList.remove('hidden')
            document.querySelector('#modal-container').classList.add('active-fast')
            document.querySelector('#mensajeGanador').classList.remove('hidden')
            document.querySelector('#mensajeGanador').classList.add('active-fast')
            document.querySelector('#mensajeEmpate').classList.add('hidden')
            document.querySelector('#mensajeEmpate').classList.remove('active-fast')
            return
            }
            document.querySelector('#juego-info-cpu').classList.add('hidden')
            document.querySelector('#modal-container-cpu').classList.remove('hidden')
            document.querySelector('#modal-container-cpu').classList.add('active-fast')
            document.querySelector('#mensajeGanadorCPU').classList.remove('hidden')
            document.querySelector('#mensajeGanadorCPU').classList.add('active-fast')
            document.querySelector('#mensajeEmpateCPU').classList.add('hidden')
            document.querySelector('#mensajeEmpateCPU').classList.remove('active-fast')
         },
        setEmpate () {
                
            win.play()
            clearInterval(id);
            this.tablero = Array(9).fill("");
            this.jugador = Math.random() > 0.5 ? 'X' : 'O';
            this.ganador = null;      
            this.counter = 0 
            
            if(document.querySelector('#tresEnLinea2Players').classList.contains('active')){
                document.querySelector('#juego-info').classList.add('hidden')
                document.querySelector('#modal-container').classList.remove('hidden')
                document.querySelector('#modal-container').classList.add('active-fast')
                document.querySelector('#mensajeEmpate').classList.remove('hidden')
                document.querySelector('#mensajeEmpate').classList.add('active-fast')
                document.querySelector('#mensajeGanador').classList.add('hidden')
                document.querySelector('#mensajeGanador').classList.remove('active-fast')
                
                return
            }
            document.querySelector('#juego-info-cpu').classList.add('hidden')
            document.querySelector('#modal-container-cpu').classList.remove('hidden')
            document.querySelector('#modal-container-cpu').classList.add('active-fast')
            document.querySelector('#mensajeEmpateCPU').classList.remove('hidden')
            document.querySelector('#mensajeEmpateCPU').classList.add('active-fast')
            document.querySelector('#mensajeGanadorCPU').classList.add('hidden')
            document.querySelector('#mensajeGanadorCPU').classList.remove('active-fast')         
            
        },

        setDisplay2Players (){
            spinnerActive()      

            setTimeout(()=>{
                spinnerDeactive()
                document.querySelector('.menu').classList.add('hidden')
                document.querySelector('.menu').classList.remove('active')
                document.querySelector('#tresEnLinea2Players').classList.remove('hidden')
                document.querySelector('#tresEnLinea2Players').classList.add('active')
            },"1000")

        },
        setDisplayCPU (){

            spinnerActive()      

            setTimeout(()=>{
                spinnerDeactive()
                document.querySelector('.menu').classList.add('hidden')
                document.querySelector('.menu').classList.remove('active')
                document.querySelector('#tresEnLineaCPU').classList.remove('hidden')
                document.querySelector('#tresEnLineaCPU').classList.add('active')
            },"1000")

        },

        cronometro(indicador){
            let cronometro = document.getElementById(indicador)
            cronometro.innerHTML='00:00:00';
            let h = 0;
            let m = 0;
            let s = 0;

            let escribir=()=>{
                let hAux, mAux, sAux;
                s++;
                if (s>59){m++;s=0;}
                if (m>59){h++;m=0;}
                if (h>24){h=0;}
            
                if (s<10){sAux="0"+s;}else{sAux=s;}
                if (m<10){mAux="0"+m;}else{mAux=m;}
                if (h<10){hAux="0"+h;}else{hAux=h;}
            
                cronometro.innerHTML = hAux + ":" + mAux + ":" + sAux; 
            }

            function cronometrar(){
                escribir();
                id = setInterval(escribir,1000);
            }

            cronometrar()
        },

        setStart(){
            
            if(document.querySelector('#tresEnLinea2Players').classList.contains('active')){
                this.cronometro("hms")           

                document.querySelector('.cronometro').classList.add('active-normal')
                document.querySelector('.cronometro').classList.remove('hidden')
                document.querySelector('#juego-boton').classList.add('active-normal')
                document.querySelector('#juego-boton').classList.remove('hidden')
                document.querySelector('#juego-info').classList.add('active-normal')
                document.querySelector('#juego-info').classList.remove('hidden')
                document.querySelector('#cuadricula').classList.add('juego-cuadricula')
                document.querySelector('#cuadricula').classList.remove('hidden')
                document.querySelector('#juego-titulo').style.margin = "0px";
                document.querySelector('#button-start').classList.add('hidden')
                return
            }

            //CPU


            this.cronometro("hms2")            
            document.querySelector('#juego-titulo-cpu').style.margin = "0px";
            document.querySelector('.cronometro-modocpu').classList.add('active-normal')
            document.querySelector('.cronometro-modocpu').classList.remove('hidden')
            document.querySelector('#juego-boton-cpu').classList.add('active-normal')
            document.querySelector('#juego-boton-cpu').classList.remove('hidden')
            document.querySelector('#juego-info-cpu').classList.add('active-normal')
            document.querySelector('#juego-info-cpu').classList.remove('hidden')
            document.querySelector('#cuadricula2').classList.add('juego-cuadricula')
            document.querySelector('#cuadricula2').classList.remove('hidden')    
            document.querySelector('#button-start-cpu').classList.add('hidden')
            this.setFichaCPU()
        },   

        restart(){           
                          
            if(document.querySelector('#tresEnLinea2Players').classList.contains('active')){
                spinnerActive()
                setTimeout(()=>{
                    spinnerDeactive() 
                    clearInterval(id);
                    document.getElementById("hms").innerHTML="00:00:00"; 
                   
                    document.querySelector('#mensajeGanador').classList.add('hidden')
                    document.querySelector('#mensajeGanador').classList.remove('active')
                    document.querySelector('#modal-container').classList.add('hidden')
                    document.querySelector('#modal-container').classList.remove('active')
                    document.querySelector('#juego-info').classList.remove('hidden')
                    setTimeout(()=>{
                        this.tablero = Array(9).fill("");
                        this.jugador = Math.random() > 0.5 ? 'X' : 'O';
                        this.ganador = null;      
                        this.counter = 0 
                    this.cronometro("hms")
                    }, "300")
                },"900")    
                return       
            }
            spinnerActive()
            setTimeout(()=>{
                
                clearInterval(id);
                document.getElementById("hms2").innerHTML="00:00:00";                
                document.querySelector('#mensajeGanadorCPU').classList.add('hidden')
                document.querySelector('#mensajeGanadorCPU').classList.remove('active')
                document.querySelector('#modal-container-cpu').classList.add('hidden')
               document.querySelector('#modal-container-cpu').classList.remove('active')
                document.querySelector('#juego-info-cpu').classList.remove('hidden')
                spinnerDeactive() 
                
                setTimeout(()=>{
                    this.tablero = Array(9).fill("");
                    this.jugador = Math.random() > 0.5 ? 'X' : 'O';
                    this.ganador = null;      
                    this.counter = 0 
                    this.setFichaCPU()
                this.cronometro("hms2")
                }, "300")
            },"900")   
            
            
            

        } ,

        setBackMenu (){  
            
            audio.play()  
            spinnerActive() 

            setTimeout(()=>{
                spinnerDeactive()
                // Menu y ambas pàginas
                document.querySelector('.menu').classList.remove('hidden')
                document.querySelector('.menu').classList.add('active')
                document.querySelector('#tresEnLinea2Players').classList.add('hidden')
                document.querySelector('#tresEnLinea2Players').classList.remove('active')
                document.querySelector('#tresEnLineaCPU').classList.add('hidden')
                document.querySelector('#tresEnLineaCPU').classList.remove('active')
                

                clearInterval(id);
                this.jugador = Math.random() > 0.5 ? 'X' : 'O';
                this.ganador = null;      
                this.tablero = Array(9).fill("");     
                this.counter = 0       
                
                // 2 Jugadores
                document.querySelector('.cronometro').classList.remove('active-normal')
                document.querySelector('.cronometro').classList.add('hidden')
                document.querySelector('#juego-boton').classList.remove('active-normal')
                document.querySelector('#juego-boton').classList.add('hidden')
                document.querySelector('#juego-info').classList.remove('active-normal')
                document.querySelector('#juego-info').classList.add('hidden')
                document.querySelector('#juego-titulo').style.margin = "10rem";
                document.querySelector('#cuadricula').classList.remove('juego-cuadricula')
                document.querySelector('#cuadricula').classList.add('hidden')
                document.querySelector('#button-start').classList.remove('hidden')
                document.querySelector('#mensajeGanador').classList.add('hidden')
                document.querySelector('#mensajeGanador').classList.remove('active')
                document.querySelector('#mensajeEmpate').classList.add('hidden')
                document.querySelector('#mensajeEmpate').classList.remove('active')
                document.querySelector('#modal-container').classList.add('hidden')
                document.querySelector('#modal-container').classList.remove('active')                
                document.getElementById("hms").innerHTML="00:00:00";

                //CPU vs Jugador
                document.querySelector('.cronometro-modocpu').classList.remove('active-normal')
                document.querySelector('.cronometro-modocpu').classList.add('hidden')
                document.querySelector('#juego-boton-cpu').classList.remove('active-normal')
                document.querySelector('#juego-boton-cpu').classList.add('hidden')
                document.querySelector('#juego-info-cpu').classList.remove('active-normal')
                document.querySelector('#juego-info-cpu').classList.add('hidden')
                document.querySelector('#juego-titulo-cpu').style.margin = "10rem";
                document.querySelector('#cuadricula2').classList.remove('juego-cuadricula')
                document.querySelector('#cuadricula2').classList.add('hidden')
                document.querySelector('#button-start-cpu').classList.remove('hidden')                
                document.querySelector('#modal-container-cpu').classList.add('hidden')
                document.querySelector('#modal-container-cpu').classList.remove('active')
                document.querySelector('#mensajeGanadorCPU').classList.add('hidden')
                document.querySelector('#mensajeGanadorCPU').classList.remove('active')
                document.querySelector('#mensajeEmpateCPU').classList.add('hidden')
                document.querySelector('#mensajeEmpateCPU').classList.remove('active')                
                document.getElementById("hms2").innerHTML="00:00:00";       
                
            },"900")

        },
        
    },
    
})





app.component('button-game', {
    template: `<div class="cuadro" ><slot></slot></div>`,
    
})
app.component('board-game', {
    template: `<div id="cuadricula" class="hidden"><slot></slot></div>`,
    

})





app.mount('#app')