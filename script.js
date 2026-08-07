(function() {
    // =============================================
    // DOM ELEMENTS
    // =============================================
    const loadingScreen = document.getElementById('loadingScreen');
    const cursorGlow = document.getElementById('cursorGlow');
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const typingText = document.getElementById('typingText');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const certModal = document.getElementById('certModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalIssuer = document.getElementById('modalIssuer');
    const modalDate = document.getElementById('modalDate');
    const currentYearSpan = document.getElementById('currentYear');
    const allNavLinkEls = document.querySelectorAll('.nav__link');
    const revealEls = document.querySelectorAll('.reveal');

    // =============================================
    // LOADING SCREEN
    // =============================================
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800);
    });
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 3000);

    // =============================================
    // CURSOR GLOW
    // =============================================
    let mouseX = -500, mouseY = -500, currentX = -500, currentY = -500;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    function animateCursorGlow() {
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        requestAnimationFrame(animateCursorGlow);
    }
    animateCursorGlow();
    document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursorGlow.style.opacity = '1'; });

    // =============================================
    // THEME TOGGLE
    // =============================================
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

    // =============================================
    // MOBILE NAVIGATION
    // =============================================
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isOpen);
    });
    navLinks.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // =============================================
    // NAVBAR SCROLL & BACK TO TOP
    // =============================================
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 50);
        backToTop.classList.toggle('visible', scrollY > 500);
        updateActiveNavLink();
    });
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        allNavLinkEls.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =============================================
    // TYPING EFFECT
    // =============================================
    const typingRoles = ['Laravel Developer', 'PHP Developer', 'Front-End Developer', 'Back-End Developer'];
    let roleIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;
    function typeEffect() {
        const currentRole = typingRoles[roleIndex];
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % typingRoles.length;
            typingSpeed = 400;
        }
        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // =============================================
    // SCROLL REVEAL
    // =============================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    // =============================================
    // SKILL BARS ANIMATION (now works on static cards)
    // =============================================
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const barFill = entry.target.querySelector('.skill-card__bar-fill');
                if (barFill) {
                    const targetWidth = barFill.getAttribute('data-width');
                    setTimeout(() => { barFill.style.width = targetWidth + '%'; }, 200);
                }
                skillBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('.skill-card').forEach(card => skillBarObserver.observe(card));

    // =============================================
    // EXPERIENCE & EDUCATION TIMELINE (still dynamic for convenience)
    // =============================================
    const experienceData = [
        { date: '2024 – Present', title: 'Personal Projects', subtitle: 'Developed multiple full-stack applications including event ticketing system, hotel booking, and fastfood management system.' },
        { date: 'Open to Opportunities', title: 'Freelance Developer', subtitle: 'Available for freelance web development projects. Specializing in Laravel, PHP, and MySQL solutions.' }
    ];
    const experienceTimeline = document.getElementById('experienceTimeline');
    experienceData.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline__item';
        item.innerHTML = `<div class="timeline__card">
            <span class="timeline__date">${exp.date}</span>
            <h3 class="timeline__title">${exp.title}</h3>
            <p class="timeline__subtitle">${exp.subtitle}</p>
        </div>`;
        experienceTimeline.appendChild(item);
    });

    const educationData = [
        { date: '2024 – 2027', title: 'Bachelor of Science in Information Technology', subtitle: 'ACLC College of Mandaue' },
        { date: '2020 – 2022', title: 'Senior High School — HUMSS', subtitle: 'Libertad National High School - With Honors' }
    ];
    const educationTimeline = document.getElementById('educationTimeline');
    educationData.forEach(edu => {
        const item = document.createElement('div');
        item.className = 'timeline__item';
        item.innerHTML = `<div class="timeline__card">
            <span class="timeline__date">${edu.date}</span>
            <h3 class="timeline__title">${edu.title}</h3>
            <p class="timeline__subtitle">${edu.subtitle}</p>
        </div>`;
        educationTimeline.appendChild(item);
    });

    // =============================================
    // CERTIFICATES (still dynamic, click to preview)
    // =============================================
    const certificatesData = [
        { icon: '📜', title: 'Laravel Fundamentals', issuer: 'Laracasts', date: '2024' },
        { icon: '🏅', title: 'PHP Developer Certification', issuer: 'W3Schools', date: '2024' },
        { icon: '🎖️', title: 'SQL & MySQL Mastery', issuer: 'Udemy', date: '2023' },
        { icon: '📋', title: 'Responsive Web Design', issuer: 'freeCodeCamp', date: '2023' },
        { icon: '🔐', title: 'Cybersecurity Essentials', issuer: 'Cisco Networking Academy', date: '2024' }
    ];
    const certsGrid = document.getElementById('certsGrid');
    certificatesData.forEach((cert, index) => {
        const card = document.createElement('div');
        card.className = 'cert-card reveal';
        card.setAttribute('data-index', index);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View ${cert.title} certificate`);
        card.innerHTML = `<span class="cert-card__icon">${cert.icon}</span>
                          <div class="cert-card__title">${cert.title}</div>
                          <div class="cert-card__issuer">${cert.issuer} · ${cert.date}</div>`;
        card.addEventListener('click', () => openCertModal(cert));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCertModal(cert); }
        });
        certsGrid.appendChild(card);
    });

    function openCertModal(cert) {
        modalTitle.textContent = cert.title;
        modalIssuer.textContent = cert.issuer;
        modalDate.textContent = cert.date;
        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    }
    function closeCertModal() {
        certModal.classList.remove('active');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    modalClose.addEventListener('click', closeCertModal);
    certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCertModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal.classList.contains('active')) closeCertModal();
    });

    // =============================================
    // CONTACT FORM (mailto implementation)
    // =============================================
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Build the mailto link
        const recipient = 'jayveegarcia988@gmail.com';
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the email client
        window.location.href = mailtoLink;

        // Show success message and reset form
        contactForm.style.display = 'none';
        formSuccess.classList.add('active');
        setTimeout(() => {
            contactForm.style.display = '';
            formSuccess.classList.remove('active');
            contactForm.reset();
        }, 3000);
    });

    // =============================================
    // STAT COUNTER ANIMATION
    // =============================================
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberEl = entry.target;
                const target = parseInt(numberEl.getAttribute('data-count'));
                animateCount(numberEl, target);
                statObserver.unobserve(numberEl);
            }
        });
    }, { threshold: 0.6 });
    document.querySelectorAll('.stat-card__number').forEach(el => statObserver.observe(el));

    function animateCount(el, target) {
        let current = 0;
        const duration = 1500;
        const startTime = performance.now();
        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(eased * target);
            el.textContent = current + (target > 10 ? '+' : '');
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + (target > 10 ? '+' : '');
            }
        }
        requestAnimationFrame(update);
    }

    // =============================================
    // FOOTER YEAR & PARALLAX
    // =============================================
    currentYearSpan.textContent = new Date().getFullYear();
    updateActiveNavLink();

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const blobs = document.querySelectorAll('.bg-blob');
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.03;
            blob.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    console.log('%c🚀 Jayvee Garcia Portfolio Ready %c| %cPremium Full Stack Developer', 'color:#3B82F6;font-size:1.2em;font-weight:bold;', '', 'color:#8B5CF6;');
    console.log('%c✨ All systems loaded. Scroll to explore!', 'color:#94A3B8;');
})();