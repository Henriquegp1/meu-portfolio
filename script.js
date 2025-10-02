// -- Animacao 1 --
document.addEventListener('DOMContentLoaded', () => {
    // --- DRAG TO SCROLL (mouse e touch) ---
    let isDown = false;
    let startX, scrollLeftStart;
    skillsList.addEventListener('mousedown', (e) => {
        isDown = true;
        skillsList.classList.add('dragging');
        startX = e.pageX - skillsList.offsetLeft;
        scrollLeftStart = skillsList.scrollLeft;
    });
    skillsList.addEventListener('mouseleave', () => {
        isDown = false;
        skillsList.classList.remove('dragging');
    });
    skillsList.addEventListener('mouseup', () => {
        isDown = false;
        skillsList.classList.remove('dragging');
    });
    skillsList.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - skillsList.offsetLeft;
        const walk = (x - startX) * 1.2; // Sensibilidade
        skillsList.scrollLeft = scrollLeftStart - walk;
    });
    // Touch
    skillsList.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - skillsList.offsetLeft;
        scrollLeftStart = skillsList.scrollLeft;
    });
    skillsList.addEventListener('touchend', () => {
        isDown = false;
    });
    skillsList.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - skillsList.offsetLeft;
        const walk = (x - startX) * 1.2;
        skillsList.scrollLeft = scrollLeftStart - walk;
    });

    // --- HABILIDADES: Seleção e painel de detalhes ---
    const skillData = {
        python: {
            icon: '<i class="devicon-python-plain colored"></i>',
            desc: 'Python é uma linguagem poderosa e versátil, ideal para automação, backend, ciência de dados e muito mais.'
        },
        flask: {
            icon: '<i class="devicon-flask-original colored"></i>',
            desc: 'Flask é um microframework web em Python, perfeito para criar APIs e aplicações web rápidas e leves.'
        },
        html5: {
            icon: '<i class="devicon-html5-plain colored"></i>',
            desc: 'HTML5 é a base da web moderna, permitindo estruturar páginas e aplicações responsivas.'
        },
        css3: {
            icon: '<i class="devicon-css3-plain colored"></i>',
            desc: 'CSS3 traz estilos avançados, animações e layouts responsivos para a web.'
        },
        git: {
            icon: '<i class="devicon-git-plain colored"></i>',
            desc: 'Git é o sistema de controle de versão mais usado no mundo, essencial para colaboração e versionamento.'
        },
        github: {
            icon: '<i class="devicon-github-original colored"></i>',
            desc: 'GitHub é a principal plataforma de hospedagem de código e colaboração para desenvolvedores.'
        },
        vscode: {
            icon: '<i class="devicon-visualstudio-plain colored"></i>',
            desc: 'VS Code é um editor de código moderno, leve e extensível, muito popular entre desenvolvedores.'
        },
        java: {
            icon: '<i class="devicon-java-plain colored"></i>',
            desc: 'Java é uma linguagem robusta, multiplataforma e muito utilizada em sistemas corporativos e aplicações Android.'
        }
    };

    const skillsList = document.getElementById('skills-list');
    const detailPanel = document.getElementById('skill-detail-panel');
    const detailIcon = document.getElementById('skill-detail-icon');
    const detailDesc = document.getElementById('skill-detail-desc');

    // --- INFINITE SCROLL ---
    // Duplicar os itens para criar efeito de loop
    const originalItems = Array.from(skillsList.children);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('clone');
        skillsList.appendChild(clone);
    });

    // Largura total dos itens originais
    function getItemsWidth(items) {
        return items.reduce((acc, el) => acc + el.offsetWidth, 0);
    }
    const itemsWidth = getItemsWidth(originalItems);

    // Ao chegar no fim, volta para o início (sem piscar)
    skillsList.addEventListener('scroll', () => {
        // Suavizar o loop infinito: se passar do limite, reposiciona sem flicker
        if (skillsList.scrollLeft <= 1) {
            // Foi para o início, volta para o fim dos originais
            skillsList.scrollLeft = skillsList.scrollLeft + itemsWidth;
        } else if (skillsList.scrollLeft >= skillsList.scrollWidth - skillsList.clientWidth - 1) {
            // Foi para o fim, volta para o início dos originais
            skillsList.scrollLeft = skillsList.scrollLeft - itemsWidth;
        }
        // Seleção automática do item central
        const items = Array.from(skillsList.querySelectorAll('.habilidade-item'));
        const listRect = skillsList.getBoundingClientRect();
        let closest = null;
        let minDist = Infinity;
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const listCenter = listRect.left + listRect.width / 2;
            const dist = Math.abs(itemCenter - listCenter);
            if (dist < minDist) {
                minDist = dist;
                closest = item;
            }
        });
        if (closest) selectSkill(closest.getAttribute('data-skill'));
    });

    // Clique para selecionar
    skillsList.querySelectorAll('.habilidade-item').forEach(item => {
        item.addEventListener('click', () => {
            selectSkill(item.getAttribute('data-skill'));
            // Centralizar o item selecionado
            const listRect = skillsList.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            const scrollTo = item.offsetLeft - (listRect.width / 2 - itemRect.width / 2);
            skillsList.scrollTo({ left: scrollTo, behavior: 'smooth' });
        });
    });

    function selectSkill(skillKey) {
        // Remove seleção anterior
        skillsList.querySelectorAll('.habilidade-item').forEach(item => item.classList.remove('selected'));
        // Seleciona o novo (primeiro visível)
        const selected = skillsList.querySelector(`.habilidade-item[data-skill="${skillKey}"]:not(.clone)`);
        if (selected) selected.classList.add('selected');
        // Atualiza painel
        if (skillData[skillKey]) {
            detailIcon.innerHTML = skillData[skillKey].icon;
            detailDesc.textContent = skillData[skillKey].desc;
        } else {
            detailIcon.innerHTML = '';
            detailDesc.textContent = '';
        }
    }

    // Seleciona o primeiro por padrão e centraliza
    selectSkill('python');
    setTimeout(() => {
        const first = skillsList.querySelector('.habilidade-item[data-skill="python"]');
        if (first) {
            const listRect = skillsList.getBoundingClientRect();
            const itemRect = first.getBoundingClientRect();
            const scrollTo = first.offsetLeft - (listRect.width / 2 - itemRect.width / 2);
            skillsList.scrollLeft = scrollTo;
        }
    }, 100);
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
        const originalText = element.getAttribute('data-text');
        element.innerHTML = '';
        element.style.visibility = 'visible';
        let charIndex = 0;
        function type() {
            if (charIndex <= originalText.length) {
                const textToShow = originalText.substring(0, charIndex);
                element.innerHTML = `${textToShow}<span class="blinking-cursor">|</span>`;
                charIndex++;
                setTimeout(type, 40); // Mais rápido
            } else {
                element.innerHTML = `${originalText}<span class="blinking-cursor">|</span>`;
            }
        }
        type();
    }

    // Função para esconder e reiniciar animação ao entrar na seção
    function setupSectionTyping(sectionSelector, titleSelector) {
        const section = document.querySelector(sectionSelector);
        const title = document.querySelector(titleSelector);
        if (!section || !title) return;
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeOnceAnimation(title);
                } else {
                    title.innerHTML = '';
                }
            });
        }, { threshold: 0.5 });
        observer.observe(section);
    }
    

    const helloElement = document.getElementById('hello-world');
    if (helloElement) {
        helloElement.setAttribute('data-text', 'Hello, World!');
        typeLoopAnimation(helloElement);
    }

    // Para os títulos das seções, animação só de escrever e reinicia ao entrar na seção
    const aboutTitle = document.querySelector('#about h2');
    if (aboutTitle) aboutTitle.setAttribute('data-text', 'Sobre Mim');
    setupSectionTyping('#about', '#about h2');

    const projectsTitle = document.querySelector('#projects h2');
    if (projectsTitle) projectsTitle.setAttribute('data-text', 'Meus Projetos');
    setupSectionTyping('#projects', '#projects h2');

    const skillsTitle = document.querySelector('#skills h2');
    if (skillsTitle) skillsTitle.setAttribute('data-text', 'Minhas Habilidades');
    setupSectionTyping('#skills', '#skills h2');


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