// -- Animacao 1 --
document.addEventListener('DOMContentLoaded', () => {
    // ======================================================
    // DICIONÁRIO COM TODAS AS TRADUÇÕES
    // ======================================================
    const translations = {
        'pt': {
            'nav_about': 'Sobre Mim',
            'nav_projects': 'Projetos',
            'nav_skills': 'Habilidades',
            'nav_contact': 'Contato',
            'hero_greeting': 'Hello, World!',
            'hero_intro': 'Prazer, eu sou',
            'hero_bio': 'Desenvolvedor Python focado em backend e automação, buscando resolver problemas complexos com código limpo e eficiente. Entusiasta de web scraping e APIs.',
            'about_title': 'Sobre Mim',
            'about_desc': 'Sou um estudante de Análise e Desenvolvimento de Sistemas com uma paixão por transformar ideias em realidade através do código. Minha jornada na programação começou com a curiosidade e rapidamente evoluiu para um foco em desenvolvimento <span class="highlight">backend com Python</span>.<br><br>Acredito que a melhor forma de aprender é construindo, e por isso dedico meu tempo a projetos práticos, como o desenvolvimento de <span class="highlight">web scrapers</span> e a criação de <span class="highlight">APIs com Flask</span>.<br><br>Atualmente, busco uma oportunidade de estágio onde eu possa aplicar meu conhecimento técnico em um ambiente de equipe, contribuir ativamente para a resolução de problemas e continuar crescendo como desenvolvedor.',
            'projects_title': 'Meus Projetos',
            'project1_title': 'Web Scraper de Vagas',
            'project1_desc': 'Script em Python que coleta vagas de tecnologia diretamente da API da Gupy.',
            'project2_title': 'Site de Portfólio Pessoal',
            'project2_desc': 'Meu portfólio profissional construído com HTML/CSS e deploy automatizado na Vercel.',
            'project3_title': 'Pc Control Hub',
            'project3_desc': 'Aplicativo de gerenciamento do computador feito exclusivamente por Python.',
            'project_button': 'Ver no GitHub',
            'skills_title': 'Minhas Habilidades',
            'contact_title': 'Contato',
            'contact_subtitle': 'Vamos conversar! Me encontre abaixo ou envie um email para henriquegp17@gmail.com',
            'cv_button': '<i class="fas fa-download"></i> Baixar Currículo',
            'desc_python': 'Python: Linguagem versátil, poderosa para backend, automação, ciência de dados e muito mais.',
            'desc_flask': 'Flask: Microframework web em Python, ideal para APIs e aplicações leves.',
            'desc_html5': 'HTML5: Estrutura fundamental para páginas web modernas e responsivas.',
            'desc_css3': 'CSS3: Estilização avançada, responsividade e animações para a web.',
            'desc_git': 'Git: Controle de versão distribuído, essencial para colaboração em projetos.',
            'desc_github': 'GitHub: Plataforma para hospedagem de código, colaboração e portfólio.',
            'desc_vscode': 'VS Code: Editor de código moderno, extensível e produtivo.',
            'desc_java': 'Java: Linguagem robusta, multiplataforma, muito usada em sistemas corporativos.'
            
        },
        'en': {
            'nav_about': 'About Me',
            'nav_projects': 'Projects',
            'nav_skills': 'Skills',
            'nav_contact': 'Contact',
            'hero_greeting': 'Hello, World!',
            'hero_intro': 'Hi, I am',
            'hero_bio': 'Python developer focused on backend and automation, seeking to solve complex problems with clean and efficient code. Web scraping and APIs enthusiast.',
            'about_title': 'About Me',
            'about_desc': 'I am a Systems Analysis and Development student with a passion for turning ideas into reality through code. My programming journey began with curiosity and quickly evolved to a focus on <span class="highlight">backend development with Python</span>.<br><br>I believe the best way to learn is by building, which is why I dedicate my time to practical projects, such as developing <span class="highlight">web scrapers</span> and creating <span class="highlight">APIs with Flask</span>.<br><br>Currently, I am looking for an internship opportunity where I can apply my technical knowledge in a team environment, actively contribute to problem-solving, and continue to grow as a developer.',
            'projects_title': 'My Projects',
            'project1_title': 'Job Vacancy Scraper',
            'project1_desc': 'Python script that collects tech job vacancies directly from the Gupy API. ㅤㅤㅤ',// Letra invisivel para alinhar
            'project2_title': 'Personal Portfolio Website',
            'project2_desc': 'My professional portfolio built with HTML/CSS and automated deployment on Vercel.',
            'project3_title': 'Pc Control Hub',
            'project3_desc': 'Computer management application written exclusively in Python.',
            'project_button': 'View on GitHub',
            'skills_title': 'My Skills',
            'contact_title': 'Contact',
            'contact_subtitle': 'Let\'s talk! Find me below or send an email to henriquegp17@gmail.com',
            'cv_button': '<i class="fas fa-download"></i> Download CV',
            'desc_python': 'Python: A versatile and powerful language for backend, automation, data science, and much more.',
            'desc_flask': 'Flask: A Python microframework, ideal for APIs and lightweight applications.',
            'desc_html5': 'HTML5: The fundamental structure for modern and responsive web pages.',
            'desc_css3': 'CSS3: Advanced styling, responsiveness, and animations for the web.',
            'desc_git': 'Git: A distributed version control system, essential for project collaboration.',
            'desc_github': 'GitHub: A platform for code hosting, collaboration, and portfolio management.',
            'desc_vscode': 'VS Code: A modern, extensible, and productive code editor.',
            'desc_java': 'Java: A robust, multi-platform language widely used in corporate systems.'
            
            
        }
    };

    // ======================================================
    // FUNÇÕES QUE FAZEM A TRADUÇÃO ACONTECER
    // ======================================================
    const langSelector = document.querySelector('.language-selector');
    const langElements = document.querySelectorAll('[data-lang]');
    const allTranslatableElements = document.querySelectorAll('[data-key]');

    // Função principal que troca os textos
    function translatePage(language) {
        // Muda o atributo 'lang' da página inteira
        document.documentElement.lang = language;
        // Itera sobre todos os elementos com a etiqueta 'data-key'
        allTranslatableElements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[language] && translations[language][key]) {
                element.innerHTML = translations[language][key];
            }
        });

        // Atualiza qual botão (PT ou EN) está com o estilo "ativo"
        langElements.forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('data-lang') === language) {
                el.classList.add('active');
            }
        });
        
        // Salva a escolha do idioma no armazenamento local do navegador
        localStorage.setItem('language', language);
        updateTitleDataText(language);
    }

    // "Ouvinte" que espera por um clique no seletor de idiomas
    if (langSelector) {
        langSelector.addEventListener('click', (event) => {
            const selectedLang = event.target.getAttribute('data-lang');
            if (selectedLang) {
                translatePage(selectedLang);
            }
        });
    }

    // Ao carregar a página, verifica se já existe um idioma salvo na memória
    const savedLang = localStorage.getItem('language') || 'pt'; // O padrão é 'pt'
    translatePage(savedLang);
    // ======================================================
    
    
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
            desc_key: 'skill_desc_python' // <-- MUDANÇA AQUI
        },
        flask: {
            icon: '<i class="devicon-flask-original colored"></i>',
            desc_key: 'skill_desc_flask' // <-- MUDANÇA AQUI
        },
        html5: {
            icon: '<i class="devicon-html5-plain colored"></i>',
            desc_key: 'skill_desc_html5' // <-- MUDANÇA AQUI
        },
        css3: {
            icon: '<i class="devicon-css3-plain colored"></i>',
            desc_key: 'skill_desc_css3' // <-- MUDANÇA AQUI
        },
        git: {
            icon: '<i class="devicon-git-plain colored"></i>',
            desc_key: 'skill_desc_git' // <-- MUDANÇA AQUI
        },
        github: {
            icon: '<i class="devicon-github-original colored"></i>',
            desc_key: 'skill_desc_github' // <-- MUDANÇA AQUI
        },
        vscode: {
            icon: '<i class="devicon-visualstudio-plain colored"></i>',
            desc_key: 'skill_desc_vscode' // <-- MUDANÇA AQUI
        },
        java: {
            icon: '<i class="devicon-java-plain colored"></i>',
            desc_key: 'skill_desc_java' // <-- MUDANÇA AQUI
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
                
                // A MÁGICA ACONTECE AQUI:
                const currentLang = document.documentElement.lang || 'pt';
                const descKey = 'desc_' + skill; // Cria a chave (ex: 'desc_python')
                painelDescricao.textContent = translations[currentLang][descKey]; // Pega a tradução correta

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

// --- TRADUÇÃO --- 
    function translatePage(language) {
    document.documentElement.lang = language;
    const keys = document.querySelectorAll('[data-key]');
    keys.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[language] && translations[language][key]) {
            el.innerHTML = translations[language][key];
        }
    });


    const painel = document.getElementById('painel-habilidade');
    if (painel) {
        painel.style.display = 'none'; // Esconde o painel de descrição
    }
    const selectedSkill = document.querySelector('.habilidade-item.selecionada');
    if (selectedSkill) {
        selectedSkill.classList.remove('selecionada'); // Remove a classe de seleção da habilidade
    }
    // ATUALIZAÇÃO: Controla as classes do 'toggle switch'
    const langContainer = document.querySelector('.language-selector');
    langElements.forEach(el => {
        el.classList.remove('active');
        if (el.getAttribute('data-lang') === language) {
            el.classList.add('active');
        }
    });

    // Adiciona/remove a classe que move a pílula de fundo
    if (language === 'en') {
        langContainer.classList.add('lang-en-active');
        langContainer.classList.remove('lang-pt-active');
    } else {
        langContainer.classList.add('lang-pt-active');
        langContainer.classList.remove('lang-en-active');
    }

    localStorage.setItem('language', language);
    updateTitleDataText(language);
}
    

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
            'Programmer Back End',
            'Enthusiast in Full-Stack'
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


    if (savedLang === 'en') {
    if (aboutTitle) aboutTitle.setAttribute('data-text', 'About Me');
    setupSectionTyping('#about', '#about h2');
    if (projectsTitle) projectsTitle.setAttribute('data-text', 'My Projects');
    setupSectionTyping('#projects', '#projects h2');
    if (skillsTitle) skillsTitle.setAttribute('data-text', 'My Skills');
    setupSectionTyping('#skills', '#skills h2');
    let contactTitle = document.querySelector('#contact h2');
    if (contactTitle) contactTitle.setAttribute('data-text', 'Contact');
    setupSectionTyping('#contact', '#contact h2');
    } else {
        if (aboutTitle) aboutTitle.setAttribute('data-text', 'Sobre Mim');
        setupSectionTyping('#about', '#about h2');
        if (projectsTitle) projectsTitle.setAttribute('data-text', 'Meus Projetos');
        setupSectionTyping('#projects', '#projects h2');
        if (skillsTitle) skillsTitle.setAttribute('data-text', 'Minhas Habilidades');
        setupSectionTyping('#skills', '#skills h2');
        let contactTitle = document.querySelector('#contact h2');
        if (contactTitle) contactTitle.setAttribute('data-text', 'Contato');
        setupSectionTyping('#contact', '#contact h2');
}
    function updateTitleDataText(language) {
    const titles = {
        pt: {
            about: 'Sobre Mim',
            projects: 'Meus Projetos',
            skills: 'Minhas Habilidades',
            contact: 'Contato'
        },
        en: {
            about: 'About Me',
            projects: 'My Projects',
            skills: 'My Skills',
            contact: 'Contact'
        }
    };

    const aboutTitle = document.querySelector('#about h2');
    const projectsTitle = document.querySelector('#projects h2');
    const skillsTitle = document.querySelector('#skills h2');
    const contactTitle = document.querySelector('#contact h2');

    if (aboutTitle) aboutTitle.setAttribute('data-text', titles[language].about);
    if (projectsTitle) projectsTitle.setAttribute('data-text', titles[language].projects);
    if (skillsTitle) skillsTitle.setAttribute('data-text', titles[language].skills);
    if (contactTitle) contactTitle.setAttribute('data-text', titles[language].contact);
}


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

    // Cascata lateral animada (efeito Matrix adaptado)
    function setupCascade(canvasId, color) {
        // Letras saltando para o mouse
        let flyingLetters = [];
        let mouse = { x: null, y: null };
        // Detecta mouse próximo à lateral
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        function launchFlyingLetter(col, y) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            // Posição inicial na lateral da tela
            let startX;
            if (canvasId === 'cascade-left') {
                startX = 0 + col * fontSize + 18; // 18px de offset da borda
            } else {
                startX = window.innerWidth - canvas.width + col * fontSize - 18;
            }
            flyingLetters.push({
                text,
                x: startX,
                y,
                alpha: 1,
                life: 0,
                vx: (mouse.x - startX) / 30 + (Math.random()-0.5)*2,
                vy: (mouse.y - y) / 30 + (Math.random()-0.5)*2
            });
        }
            // Letras saltando para o mouse
            if (mouse.x !== null && mouse.y !== null) {
                // Se mouse perto da lateral (esquerda ou direita)
                const near = (canvasId === 'cascade-left' && mouse.x < 120) || (canvasId === 'cascade-right' && mouse.x > window.innerWidth - 120);
                if (near && Math.random() > 0.85) {
                    // Sorteia uma coluna para soltar letra
                    const col = Math.floor(Math.random() * columns);
                    const y = (drops[col] - Math.floor(Math.random()*trailLength)) * fontSize;
                    if (y > 0 && y < canvas.height) {
                        launchFlyingLetter(col, y);
                    }
                }
            }

            // Desenha letras voando
            for (let i = flyingLetters.length - 1; i >= 0; i--) {
                const l = flyingLetters[i];
                ctx.save();
                ctx.globalAlpha = l.alpha;
                ctx.shadowColor = color;
                ctx.shadowBlur = 8;
                ctx.fillStyle = color;
                ctx.font = `bold ${fontSize}px monospace`;
                ctx.fillText(l.text, l.x, l.y);
                ctx.restore();
                // Move em direção ao mouse
                l.x += l.vx;
                l.y += l.vy;
                l.life++;
                l.alpha -= 0.025;
                if (l.life > 40 || l.alpha <= 0) flyingLetters.splice(i, 1);
            }
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
    canvas.width = 110;
        canvas.height = window.innerHeight;
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ1234567890@#$%';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    const trailLength = 22;
        for (let x = 0; x < columns; x++) { drops[x] = Math.floor(Math.random() * canvas.height / fontSize); }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `bold ${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                for (let j = 0; j < trailLength; j++) {
                    const text = letters[Math.floor(Math.random() * letters.length)];
                    // Opacidade decrescente para o rastro
                    ctx.globalAlpha = 1 - j / trailLength;
                    ctx.shadowColor = color;
                    ctx.shadowBlur = j === 0 ? 8 : 0;
                    ctx.fillStyle = color;
                    ctx.fillText(text, i * fontSize, (drops[i] - j) * fontSize);
                }
                drops[i]++;
                if (drops[i] * fontSize > canvas.height + trailLength * fontSize && Math.random() > 0.975) {
                    drops[i] = 0;
                }
            }
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }
        setInterval(draw, 60);
        window.addEventListener('resize', () => { canvas.height = window.innerHeight; });
    }
    setupCascade('cascade-left', '#d279ee');
    setupCascade('cascade-right', '#8e44ad');
    
    // ======================================================
    // SCROLL SPY (Destacar menu ao rolar)
    // ======================================================
    window.addEventListener('scroll', () => {
        let sections = document.querySelectorAll('section');
        // Seleciona APENAS os links dentro do menu de navegação (exclui o H)
        let navLinks = document.querySelectorAll('nav ul li a');

        let currentId = '';

        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150; // -150 é para compensar a altura do Header fixo
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            

            if(top >= offset && top < offset + height) {
                currentId = id;
            }
        });

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        currentId = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if(currentId && link.getAttribute('href').includes(currentId)) {
            link.classList.add('active-link');
        }
    });
});
});