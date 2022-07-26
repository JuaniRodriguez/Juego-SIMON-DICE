const $bienvenida=document.querySelector("#bienvenida");
const $boton=document.querySelector("#botonJugar");
const $ronda=document.querySelector("#ronda");
const $cuadros=document.querySelectorAll(".cuadro");

let secuenciaMaquina=[];
secuenciaJugador=[];
let ronda=1;

$boton.onclick= empezarJuego;

function empezarJuego() {
    $boton.disabled=true;
    eliminarPropiedades();
    resetear();
    ronda=1;
    manejarRonda();  
    
}


function manejarRonda() {
    $ronda.textContent=`Ronda ${ronda}`;
    $bienvenida.textContent=`Turno de la maquina!`;
    bloquearJugador();
    
    const cuadroObtenido=cuadroAleatorio();
    secuenciaMaquina.push(cuadroObtenido);
    
    
    const turnoJugador=(secuenciaMaquina.length + 1)*1000;

    secuenciaMaquina.forEach(function(el,index)  {
        const retraso=(index + 1)*1000;
        const  retrasobis=(index + 1.6)*1000;
        setTimeout(() => {
            el.style.setProperty("animation-name","cambiaropacidad");
            el.style.setProperty("animation-duration","0.5s");
            
        }, retraso);

        setTimeout(() => {
            el.removeAttribute("style");
        },retrasobis );
    }); 

    

    setTimeout(() => {
        $bienvenida.textContent="Turno del jugador!";
        juegaJugador();
    }, turnoJugador);

    
}

function siguienteRonda() {
    ronda++;
}

function cuadroAleatorio() {
    registro=$cuadros[Math.floor(Math.random()*4)];
    return registro;
}

function juegaJugador() {
    $cuadros.forEach(function(cuadro,index) {
        cuadro.onclick=function(e) {
            
            const  retrasobis= 0.2*1000;
            const analisis=retrasobis+100;
            
            cuadro.style.setProperty("animation-name","cambiaropacidad");
            cuadro.style.setProperty("animation-duration","0.1s");
            
           
            setTimeout(() => {
                cuadro.removeAttribute("style");
            },retrasobis );
        
            setTimeout(() => {
            
                secuenciaJugador.push(cuadro.id);
                const cuadroMaquina=secuenciaMaquina[secuenciaJugador.length - 1];
                if(cuadro.id!==cuadroMaquina.id) {
                    alert("perdiste!");
                    $bienvenida.textContent="Perdiste!Presione jugar para comenzar";
                    $boton.disabled=false;
                    eliminarPropiedades();
                    resetear();
                    return;
                } else if(secuenciaJugador.length===secuenciaMaquina.length) {
                     bloquearJugador();
                     siguienteRonda();
                     manejarRonda();
                     eliminarPropiedades();
                     secuenciaJugador=[];
                }
            },analisis);
        }
    })
  
}    

function resetear() {
    secuenciaMaquina=[];
    secuenciaJugador=[];
    $ronda.textContent="Ronda #-";
  
}

function eliminarPropiedades() {
    secuenciaMaquina.forEach(function(el) {
    el.removeAttribute("style");
    })
}


function bloquearJugador() {
    $cuadros.forEach(function(cuadro) {
        cuadro.onclick=function() {        
        };
    });
        
}