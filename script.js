document.addEventListener('DOMContentLoaded', () => {

    AOS.init({ duration: 1000 }); // Inicia a animação com duração de 1 segundo
    //ANIMAÇÃO DE DIGITAÇÃO COM LOOP INFINITO
    function typeLoopAnimation(element) {
        if (!element) return; // Se o elemento não existir, não faz nada
        const originalText = element.getAttribute('data-text'); // Pega o texto de um atributo de dados
        element.innerHTML = '';
        element.style.visibility = 'visible';

        let charIndex = 0;
        let isDeleting = false;

        function type() {
            // Se o texto atual for o original, começa a apagar
            if (charIndex === originalText.length && !isDeleting) {
                isDeleting = true;
                setTimeout(type, 2000); // Pausa antes de apagar
                return;
            }

            // Se o texto foi todo apagado, começa a escrever
            if (charIndex === 0 && isDeleting) {
                isDeleting = false;
                setTimeout(type, 500); // Pausa antes de reescrever
                return;
            }

            // Aumenta ou diminui o índice do caractere
            charIndex += isDeleting ? -1 : 1;
            const textToShow = originalText.substring(0, charIndex);
            
            element.innerHTML = `${textToShow}<span class="blinking-cursor">|</span>`;

            const typeSpeed = isDeleting ? 75 : 150;
            setTimeout(type, typeSpeed);
        }
        
        type();
    }
    
    // Preparando os elementos para a animação
    // Colocamos o texto que queremos animar em um atributo 'data-text'
    const helloElement = document.getElementById('hello-world');
    if (helloElement) helloElement.setAttribute('data-text', 'Hello, World!');
    
    const aboutTitle = document.querySelector('#about h2');
    if(aboutTitle) aboutTitle.setAttribute('data-text', 'Sobre Mim');

    const projectsTitle = document.querySelector('#projects h2');
    if(projectsTitle) projectsTitle.setAttribute('data-text', 'Meus Projetos');
    
    const skillsTitle = document.querySelector('#skills h2');
    if(skillsTitle) skillsTitle.setAttribute('data-text', 'Minhas Habilidades');
    
    document.querySelectorAll('.typing-effect').forEach(el => typeLoopAnimation(el));


    // Animação de Código "Matrix" (sem alterações)
    function setupMatrix(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = window.innerHeight;
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ1234567890@#$%^&*()';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        for (let x = 0; x < columns; x++) { drops[x] = 1; }

        function draw() {
            ctx.fillStyle = 'rgba(18, 12, 24, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#8e44ad';
            ctx.font = `${fontSize}px arial`;
            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(draw, 40);
        window.addEventListener('resize', () => { canvas.height = window.innerHeight; });
    }
    setupMatrix('matrix-canvas-left');
    setupMatrix('matrix-canvas-right');
});