// -- Animacao 1 --
document.addEventListener('DOMContentLoaded', () => {
    // Oculta títulos das seções antes da animação
    let aboutTitle = document.querySelector('#about h2');
    if (aboutTitle) aboutTitle.innerHTML = '';
    let projectsTitle = document.querySelector('#projects h2');
    if (projectsTitle) projectsTitle.innerHTML = '';
    let skillsTitle = document.querySelector('#skills h2');
    if (skillsTitle) skillsTitle.innerHTML = '';
    // --- HABILIDADES: seleção e painel de detalhes ---
    const skillsData = {
        python: {
            icon: '<i class="devicon-python-plain colored"></i>',
            desc: 'Python: Linguagem versátil, poderosa para backend, automação, ciência de dados e muito mais.'
        },
        flask: {
            icon: '<i class="devicon-flask-original colored"></i>',
            desc: 'Flask: Microframework web em Python, ideal para APIs e aplicações leves.'
        },
        html5: {
            icon: '<i class="devicon-html5-plain colored"></i>',
            desc: 'HTML5: Estrutura fundamental para páginas web modernas e responsivas.'
        },
        css3: {
            icon: '<i class="devicon-css3-plain colored"></i>',
            desc: 'CSS3: Estilização avançada, responsividade e animações para a web.'
        },
        git: {
            icon: '<i class="devicon-git-plain colored"></i>',
            desc: 'Git: Controle de versão distribuído, essencial para colaboração em projetos.'
        },
        github: {
            icon: '<i class="devicon-github-original colored"></i>',
            desc: 'GitHub: Plataforma para hospedagem de código, colaboração e portfólio.'
        },
        vscode: {
            icon: '<i class="devicon-visualstudio-plain colored"></i>',
            desc: 'VS Code: Editor de código moderno, extensível e produtivo.'
        },
        java: {
            icon: '<i class="devicon-java-plain colored"></i>',
            desc: 'Java: Linguagem robusta, multiplataforma, muito usada em sistemas corporativos.'
        }
    };

    const habilidadesLista = document.querySelector('.habilidades-lista');
    const painel = document.getElementById('painel-habilidade');
    const painelIcone = document.getElementById('painel-icone');
    const painelDescricao = document.getElementById('painel-descricao');

    if (habilidadesLista && painel && painelIcone && painelDescricao) {
        habilidadesLista.querySelectorAll('.habilidade-item').forEach(item => {
            item.addEventListener('click', () => {
                habilidadesLista.querySelectorAll('.habilidade-item').forEach(i => i.classList.remove('selecionada'));
                item.classList.add('selecionada');
                const skill = item.getAttribute('data-skill');
                if (skillsData[skill]) {
                    painelIcone.innerHTML = skillsData[skill].icon;
                    painelDescricao.textContent = skillsData[skill].desc;
                    painel.style.display = 'flex';
                }
            });
        });
    }

    // Estilo para destacar a habilidade selecionada
    const style = document.createElement('style');
    style.innerHTML = `.habilidade-item.selecionada { border: 2px solid #d279ee; background: rgba(142,68,173,0.15); box-shadow: 0 2px 12px #8e44ad33; }`;
    document.head.appendChild(style);
    AOS.init({ duration: 1000 }); // Inicia a animação com duração de 1 segundo


    // Animação de digitação com loop (escreve e apaga)
    function typeLoopAnimation(element) {
        if (!element) return;
        const originalText = element.getAttribute('data-text');
        element.innerHTML = '';
        element.style.visibility = 'visible';
        let charIndex = 0;
        let isDeleting = false;
        function type() {
            if (charIndex === originalText.length && !isDeleting) {
                isDeleting = true;
                setTimeout(type, 3000);
                return;
            }
            if (charIndex === 0 && isDeleting) {
                isDeleting = false;
                setTimeout(type, 100);
                return;
            }
            charIndex += isDeleting ? -1 : 1;
            const textToShow = originalText.substring(0, charIndex);
            element.innerHTML = `${textToShow}<span class="blinking-cursor">|</span>`;
            const typeSpeed = isDeleting ? 100 : 150;
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // Animação de digitação simples (só escreve)
    function typeOnceAnimation(element) {
        if (!element) return;
        // Cancela animação anterior se existir
        if (element._typingTimeout) {
            clearTimeout(element._typingTimeout);
            element._typingTimeout = null;
        }
        const originalText = element.getAttribute('data-text');
        element.innerHTML = '<span class="blinking-cursor">|</span>';
        element.style.visibility = 'visible';
        let charIndex = 0;
        function type() {
            if (charIndex <= originalText.length) {
                const textToShow = originalText.substring(0, charIndex);
                element.innerHTML = `${textToShow}<span class="blinking-cursor">|</span>`;
                charIndex++;
                element._typingTimeout = setTimeout(type, 40);
            } else {
                element.innerHTML = `${originalText}<span class="blinking-cursor">|</span>`;
                element._typingTimeout = null;
            }
        }
        element._typingTimeout = setTimeout(type, 100);
    }

    // Função para esconder e reiniciar animação ao entrar na seção
    function setupSectionTyping(sectionSelector, titleSelector) {
        const section = document.querySelector(sectionSelector);
        const title = document.querySelector(titleSelector);
        if (!section || !title) return;
    let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!title._isTyping) {
                        title._isTyping = true;
                        typeOnceAnimation(title);
                    }
                } else {
                    // Cancela animação e remove texto ao sair
                    if (title._typingTimeout) {
                        clearTimeout(title._typingTimeout);
                        title._typingTimeout = null;
                    }
                    title.innerHTML = '';
                    title._isTyping = false;
                }
            });
    }, { threshold: 0.1 });
        observer.observe(section);
    }
    

    // Animação de frases alternadas no hello-world
    const helloElement = document.getElementById('hello-world');
    if (helloElement) {
        const frases = [
            'Hello, World!',
            'Programador Back End',
            'Entusiasta em Full-Stack'
        ];
        let fraseIndex = 0;
        function typeLoopFrases(element) {
            const originalText = frases[fraseIndex];
            element.innerHTML = '';
            element.style.visibility = 'visible';
            let charIndex = 0;
            let isDeleting = false;
            function type() {
                if (charIndex === originalText.length && !isDeleting) {
                    isDeleting = true;
                    setTimeout(type, 2000);
                    return;
                }
                if (charIndex === 0 && isDeleting) {
                    isDeleting = false;
                    fraseIndex = (fraseIndex + 1) % frases.length;
                    setTimeout(() => typeLoopFrases(element), 400);
                    return;
                }
                charIndex += isDeleting ? -1 : 1;
                const textToShow = originalText.substring(0, charIndex);
                element.innerHTML = `${textToShow}<span class="blinking-cursor">|</span>`;
                const typeSpeed = isDeleting ? 80 : 120;
                setTimeout(type, typeSpeed);
            }
            type();
        }
        typeLoopFrases(helloElement);
    }


    // Para os títulos das seções, animação só de escrever e reinicia ao entrar na seção
    if (aboutTitle) aboutTitle.setAttribute('data-text', 'Sobre Mim');
    setupSectionTyping('#about', '#about h2');

    if (projectsTitle) projectsTitle.setAttribute('data-text', 'Meus Projetos');
    setupSectionTyping('#projects', '#projects h2');

    if (skillsTitle) skillsTitle.setAttribute('data-text', 'Minhas Habilidades');
    setupSectionTyping('#skills', '#skills h2');

    // Contato
    let contactTitle = document.querySelector('#contact h2');
    if (contactTitle) contactTitle.setAttribute('data-text', 'Contato');
    setupSectionTyping('#contact', '#contact h2');


    // Animação de Código Matrix 
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