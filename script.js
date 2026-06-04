window.addEventListener("load", function () {
    // 1. Controle do Preloader
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
    }, 3000); 
});

// 2. Animação de Surgimento (Fade-in com Scroll)
document.addEventListener("DOMContentLoaded", function() {
    
    const elementsToFade = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe que faz o elemento aparecer
                entry.target.classList.add('visivel');
                
                // Se o elemento tiver um contador dentro, dispara a animação de números
                const contador = entry.target.querySelector('.contador');
                if(contador && !contador.classList.contains('animado')) {
                    animateCounter(contador);
                    contador.classList.add('animado'); // Pra rodar só uma vez
                }
            }
        });
    }, {
        threshold: 0.1 // O elemento aparece quando 10% dele estiver na tela
    });

    elementsToFade.forEach(el => observer.observe(el));
});

// 3. Função de animação de contagem dos números (Finalizada)
function animateCounter(element) {
    const target = parseFloat(element.getAttribute("data-target"));
    const prefix = element.getAttribute("data-prefix") || "";
    const suffix = element.getAttribute("data-suffix") || "";
    
    let start = 0;
    const duration = 2000; 
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= duration) {
            element.textContent = prefix + target.toString().replace('.', ',') + suffix;
            return;
        }

        const progress = elapsedTime / duration;
        const currentValue = start + progress * (target - start);

        if (target % 1 !== 0) {
            element.textContent = prefix + currentValue.toFixed(1).replace('.', ',') + suffix;
        } else {
            element.textContent = prefix + Math.floor(currentValue) + suffix;
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    requestAnimationFrame(updateNumber);
}