// ДАННЫЕ УЧАСТНИКОВ - 28 УЧАСТНИКОВ
const members = [
    {
        id: 1,
        nickname: "ВРЕМЕНЫЙ АКК",
        username: "@notshafo",
        category: "Владелец",
        role: "Владелец",
        description: "ТГ САМ УДАЛИЛСЯ ДОСТУП К АККУ УТЕРЯЛ ЖДИТЕ НОВЫЙ АККИЧ(НОВЫЙ ЮЗ БУДЕТ ТУТ ЖЕ) Владелец этого фейм листа. Вход 50 зв, галочка 30зв, закреп 50зв.",
        avatar: "img/avatar1.png",
        verified: true,
        pinned: true,
        project: "https://t.me/+UO-WJgp_j65iYjA6",
        telegram: "nothevo",
        chat: "https://t.me/+I8WOJDuVRIdjNGUy",
        joinDate: "2026-01-04",
        activity: "Постоянная",
        posts: 1000,
        followers: 1500,
        priceEntry: "50 зв",
        priceVerified: "30 зв",
        pricePinned: "50 зв",
        details: "Создатель и владелец Fame TG. Занимаюсь развитием сообщества и модерацией. Отвечаю на вопросы по поводу добавления в список и других услуг.",
        skills: ["Администрирование", "Модерация", "Развитие сообщества"],
        socials: {
            telegram: "@nothevo",
            project: "t.me/+UO-WJgp_j65iYjA6",
            chat: "t.me/+I8WOJDuVRIdjNGUy"
        }
    },
    // ... остальные 27 участников (такие же как были)
];

// Массив всех фонов
const allBackgrounds = [
    'particles', 'waves', 'pulse', 'hooks', 'circuit',
    'grid', 'dots', 'lines', 'hexagon', 'triangles',
    'squares', 'circles', 'nebula', 'galaxy', 'cosmic',
    'stardust', 'matrix', 'cyberpunk', 'circuit2', 'glitch',
    'rain', 'fire', 'water', 'wind', 'vortex',
    'spiral', 'radar', 'sonar'
];

// Текущие настройки
let currentUser = null;
let currentTheme = 'dark';
let currentNeonColor = '#808080';
let currentNeonIntensity = 0.5;
let currentNeonSpeed = 5;
let currentAnimatedBg = 'hooks';
let currentBgSpeed = 10;
let currentBgOpacity = 0.5;

// API ключ для Firebase (замените на свой в реальном проекте)
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyC4y1KQ2K6wK9X9Q2Z7Q8R9T0U1V2W3X4Y5Z6",
    authDomain: "fame-tg.firebaseapp.com",
    projectId: "fame-tg",
    storageBucket: "fame-tg.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Fame TG загружен');
    
    // Основные функции
    initNavigation();
    initMembers();
    initSnow();
    initSettings();
    initNeonControls();
    initAnimatedBg();
    initModals();
    loadSavedSettings();
    initDynamicNeon();
    initAllAvatars();
    generateBgGrid();
    
    // Инициализация авторизации и заявок
    initAuth();
    initApplicationForm();
    checkAuth();
    
    console.log('Все функции инициализированы');
});

// Генерация сетки фонов
function generateBgGrid() {
    const grid = document.querySelector('.animated-bg-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    allBackgrounds.forEach(bg => {
        const option = document.createElement('div');
        option.className = `animated-bg-option ${bg === currentAnimatedBg ? 'active' : ''}`;
        option.dataset.bg = bg;
        
        option.innerHTML = `
            <div class="bg-preview ${bg}-bg"></div>
            <span>${getBgName(bg)}</span>
        `;
        
        option.addEventListener('click', function() {
            document.querySelectorAll('.animated-bg-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            currentAnimatedBg = this.dataset.bg;
        });
        
        grid.appendChild(option);
    });
}

// Получение читаемого имени фона
function getBgName(bg) {
    const names = {
        'particles': 'Частицы', 'waves': 'Волны', 'pulse': 'Пульсация',
        'hooks': 'Зацепки', 'circuit': 'Микросхемы', 'grid': 'Сетка',
        'dots': 'Точки', 'lines': 'Линии', 'hexagon': 'Шестиугольники',
        'triangles': 'Треугольники', 'squares': 'Квадраты', 'circles': 'Круги',
        'nebula': 'Туманность', 'galaxy': 'Галактика', 'cosmic': 'Космос',
        'stardust': 'Звёздная пыль', 'matrix': 'Матрица', 'cyberpunk': 'Киберпанк',
        'circuit2': 'Микросхема 2', 'glitch': 'Глитч', 'rain': 'Дождь',
        'fire': 'Огонь', 'water': 'Вода', 'wind': 'Ветер',
        'vortex': 'Воронка', 'spiral': 'Спираль', 'radar': 'Радар',
        'sonar': 'Сонар'
    };
    
    return names[bg] || bg;
}

// Функция для безопасной загрузки изображения
function loadAvatarWithFallback(imgElement, src, nickname) {
    return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
            imgElement.src = src;
            imgElement.style.opacity = '1';
            resolve(true);
        };
        
        img.onerror = () => {
            // Создаем SVG аватар с первой буквой ника
            const initial = nickname.charAt(0).toUpperCase();
            const color = generateColorFromNickname(nickname);
            
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="${color}" rx="50"/>
                    <text x="50" y="50" text-anchor="middle" dy="0.35em" 
                          font-family="Arial, sans-serif" font-size="40" 
                          font-weight="bold" fill="#fff">${initial}</text>
                </svg>
            `;
            
            imgElement.src = 'data:image/svg+xml;base64,' + btoa(svg);
            imgElement.style.opacity = '1';
            imgElement.classList.add('avatar-fallback');
            resolve(false);
        };
        
        // Добавляем индикатор загрузки
        imgElement.style.opacity = '0';
        if (imgElement.parentElement) {
            imgElement.parentElement.classList.add('loading');
        }
        
        setTimeout(() => img.src = src, 100);
        
        // Убираем индикатор через 2 секунды
        setTimeout(() => {
            if (imgElement.parentElement) {
                imgElement.parentElement.classList.remove('loading');
            }
            imgElement.style.opacity = '1';
        }, 2000);
    });
}

// Генерация цвета на основе ника
function generateColorFromNickname(nickname) {
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
    ];
    
    let hash = 0;
    for (let i = 0; i < nickname.length; i++) {
        hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
}

// Инициализация навигации
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const sideMenu = document.getElementById('side-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.add('active');
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            sideMenu.classList.remove('active');
        });
    }
    
    // Переключение секций
    const navTabs = document.querySelectorAll('.nav-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');
    
    function switchSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }
        
        navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.section === sectionId) {
                tab.classList.add('active');
            }
        });
        
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });
    }
    
    navTabs.forEach(tab => {
        if (tab.dataset.section) {
            tab.addEventListener('click', () => {
                switchSection(tab.dataset.section);
            });
        }
    });
    
    menuItems.forEach(item => {
        if (item.dataset.section) {
            item.addEventListener('click', () => {
                switchSection(item.dataset.section);
                sideMenu.classList.remove('active');
            });
        }
    });
    
    // Специальные кнопки
    const faqBtn = document.getElementById('faq-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const menuSettings = document.getElementById('menu-settings');
    const animatedBgBtn = document.getElementById('animated-bg-btn');
    const menuAnimatedBg = document.getElementById('menu-animated-bg');
    
    if (faqBtn) {
        faqBtn.addEventListener('click', () => {
            switchSection('faq-section');
        });
    }
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            openModal('settings-modal');
        });
    }
    
    if (menuSettings) {
        menuSettings.addEventListener('click', () => {
            openModal('settings-modal');
            sideMenu.classList.remove('active');
        });
    }
    
    if (animatedBgBtn) {
        animatedBgBtn.addEventListener('click', () => {
            openModal('animated-bg-modal');
        });
    }
    
    if (menuAnimatedBg) {
        menuAnimatedBg.addEventListener('click', () => {
            openModal('animated-bg-modal');
            sideMenu.classList.remove('active');
        });
    }
}

// Инициализация всех аватаров
function initAllAvatars() {
    // Предзагрузка первых нескольких аватаров
    const preloadAvatars = members.slice(0, 6).map(member => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = `img/avatar${member.id}.png`;
            img.onload = resolve;
            img.onerror = resolve;
        });
    });
    
    // Инициализируем карточки после небольшой задержки
    setTimeout(loadMembers, 100);
}

// Инициализация участников
function initMembers() {
    loadMembers();
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterMembers(category);
        });
    });
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            searchMembers(searchTerm);
        });
    }
}

// Загрузка участников
function loadMembers() {
    const container = document.getElementById('members-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const sortedMembers = [...members].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        if (a.verified && !b.verified) return -1;
        if (!a.verified && b.verified) return 1;
        return 0;
    });
    
    sortedMembers.forEach(member => {
        const card = createMemberCard(member);
        container.appendChild(card);
    });
    
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('click', function() {
            const memberId = this.dataset.id;
            showProfile(memberId);
        });
    });
}

// Создание карточки участника
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.dataset.id = member.id;
    card.dataset.category = member.category;
    
    if (member.pinned) card.classList.add('pinned');
    if (member.verified) card.classList.add('verified');
    
    let badges = '';
    if (member.pinned) badges += '📍 ';
    if (member.verified) badges += '✓ ';
    
    // Создаем ID для аватара
    const avatarId = `avatar-${member.id}`;
    
    card.innerHTML = `
        <div class="member-avatar" data-initial="${member.nickname.charAt(0).toUpperCase()}">
            <img id="${avatarId}" 
                 src="" 
                 alt="${member.nickname}"
                 loading="lazy">
        </div>
        
        <div class="member-info">
            <h3>${member.nickname} ${member.verified ? '✓' : ''}</h3>
            <div class="member-role">${member.role}</div>
            <p class="member-description">${member.description}</p>
            <div class="member-badges">
                ${badges}${member.category}
            </div>
        </div>
    `;
    
    // Загружаем аватар после создания элемента
    setTimeout(() => {
        const img = card.querySelector(`#${avatarId}`);
        const avatarPath = `img/avatar${member.id}.png`;
        loadAvatarWithFallback(img, avatarPath, member.nickname);
    }, 10);
    
    return card;
}

// Фильтрация участников
function filterMembers(category) {
    const cards = document.querySelectorAll('.member-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Поиск участников
function searchMembers(term) {
    const cards = document.querySelectorAll('.member-card');
    const activeFilter = document.querySelector('.filter-btn.active').dataset.category;
    
    cards.forEach(card => {
        const nickname = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.member-description').textContent.toLowerCase();
        
        const matchesSearch = nickname.includes(term) || description.includes(term);
        const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
        
        if (matchesSearch && matchesFilter) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Дополнительные функции для отображения кнопок
function createSocialButton(icon, text, url, className = '') {
    if (!url) return '';
    return `
        <a href="${url}" class="action-btn ${className}" target="_blank">
            <i class="${icon}"></i> ${text}
        </a>
    `;
}

// ПОЛНЫЙ ПРОФИЛЬ УЧАСТНИКА
function showProfile(memberId) {
    const member = members.find(m => m.id == memberId);
    if (!member) return;
    
    const container = document.getElementById('profile-content');
    
    // Форматирование даты
    const joinDate = new Date(member.joinDate);
    const formattedDate = joinDate.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Создание бейджей
    let badgesHtml = '';
    if (member.verified) badgesHtml += '<span class="badge verified">✓ Верифицирован</span>';
    if (member.pinned) badgesHtml += '<span class="badge pinned">📌 Закреплён</span>';
    badgesHtml += `<span class="badge category">${member.category}</span>`;
    
    // Основные кнопки
    let mainButtons = createSocialButton('fab fa-telegram', 'Написать в ЛС', `https://t.me/${member.telegram}`, 'telegram');
    if (member.project) mainButtons += createSocialButton('fas fa-external-link-alt', 'Основной канал', member.project);
    if (member.chat) mainButtons += createSocialButton('fas fa-comments', 'Чат', member.chat, 'telegram');
    
    // Дополнительные кнопки
    let extraButtons = '';
    const extraLinks = {
        'tiktok': {icon: 'fab fa-tiktok', text: 'TikTok'},
        'website': {icon: 'fas fa-globe', text: 'Сайт'},
        'reputation': {icon: 'fas fa-star', text: 'Репутация'},
        'priceList': {icon: 'fas fa-tag', text: 'Прайс'},
        'work': {icon: 'fas fa-briefcase', text: 'Ворк'},
        'forum': {icon: 'fas fa-users', text: 'Форум'},
        'def': {icon: 'fas fa-shield-alt', text: 'Деф'},
        'whitelist': {icon: 'fas fa-list', text: 'White List'},
        'blog': {icon: 'fas fa-blog', text: 'Блог'},
        'private': {icon: 'fas fa-lock', text: 'Приват'}
    };
    
    Object.keys(extraLinks).forEach(key => {
        if (member[key]) {
            extraButtons += createSocialButton(extraLinks[key].icon, extraLinks[key].text, member[key]);
        }
    });
    
    // Статистика
    const stats = {
        'Статус': member.role,
        'Верификация': member.verified ? '✓ Подтверждён' : '✓ Не подтверждён',
        'Закреп': member.pinned ? '📌 Включён' : '📌 Выключен',
        'Дата регистрации': formattedDate,
        'Активность': member.activity,
        'Подписчики': member.followers,
        'ID': member.id
    };
    
    // Добавляем цены если есть
    if (member.priceEntry) stats['Цена входа'] = member.priceEntry;
    if (member.priceVerified) stats['Цена галочки'] = member.priceVerified;
    if (member.pricePinned) stats['Цена закрепа'] = member.pricePinned;
    
    let statsHtml = '';
    Object.entries(stats).forEach(([label, value]) => {
        if (value) {
            statsHtml += `
                <div class="stat-item">
                    <span class="stat-label">${label}:</span>
                    <span class="stat-value">${value}</span>
                </div>
            `;
        }
    });
    
    // ID для аватара профиля
    const profileAvatarId = `profile-avatar-${member.id}`;
    
    container.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar" data-initial="${member.nickname.charAt(0).toUpperCase()}">
                <img id="${profileAvatarId}" 
                     src="" 
                     alt="${member.nickname}"
                     loading="eager">
            </div>
            
            <h1 class="profile-title">${member.nickname}</h1>
            <p class="profile-username">${member.username}</p>
            
            <div class="profile-badges">
                ${badgesHtml}
            </div>
            
            <div class="profile-actions">
                ${mainButtons}
                <button class="action-btn" onclick="copyProfileLink('${member.nickname}')">
                    <i class="fas fa-share"></i> Поделиться
                </button>
            </div>
        </div>
        
        <div class="profile-content">
            <div class="profile-description">
                <h3>Описание</h3>
                <p>${member.description || 'Нет описания'}</p>
                
                ${member.details ? `
                    <h3 style="margin-top: 30px;">Детали</h3>
                    <p>${member.details}</p>
                ` : ''}
                
                ${member.skills && member.skills.length > 0 ? `
                    <h3 style="margin-top: 30px;">Навыки и специализация</h3>
                    <p>${member.skills.join(' • ')}</p>
                ` : ''}
                
                ${extraButtons ? `
                    <h3 style="margin-top: 30px;">Дополнительные ссылки</h3>
                    <div class="profile-actions">
                        ${extraButtons}
                    </div>
                ` : ''}
            </div>
            
            <div class="profile-stats">
                <h3>Статистика</h3>
                ${statsHtml}
            </div>
        </div>
    `;
    
    // Загружаем аватар профиля
    setTimeout(() => {
        const img = document.getElementById(profileAvatarId);
        const avatarPath = `img/avatar${member.id}.png`;
        if (img) {
            loadAvatarWithFallback(img, avatarPath, member.nickname);
        }
    }, 10);
    
    switchSection('profile-details');
}

// Инициализация снега
function initSnow() {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;
    
    createSnowflakes();
    
    const snowToggle = document.getElementById('snow-effect');
    if (snowToggle) {
        snowToggle.addEventListener('change', function() {
            if (this.checked) {
                snowContainer.style.display = 'block';
                createSnowflakes();
            } else {
                snowContainer.style.display = 'none';
                snowContainer.innerHTML = '';
            }
        });
    }
}

// Создание снежинок
function createSnowflakes() {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;
    
    snowContainer.innerHTML = '';
    
    for (let i = 0; i < 60; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const opacity = Math.random() * 0.5 + 0.3;
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${startX}vw`;
        snowflake.style.opacity = opacity;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        
        snowContainer.appendChild(snowflake);
    }
}

// Инициализация настроек
function initSettings() {
    const settingsTabs = document.querySelectorAll('.settings-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab + '-tab';
            
            settingsTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            applyTheme(theme);
        });
    });
    
    const bgUpload = document.getElementById('bg-upload');
    const bgPreview = document.getElementById('bg-preview');
    
    if (bgUpload) {
        bgUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    bgPreview.innerHTML = `<img src="${e.target.result}" alt="Фон">`;
                    bgPreview.style.display = 'block';
                    
                    localStorage.setItem('fame_background', e.target.result);
                    document.body.style.backgroundImage = `url(${e.target.result})`;
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundAttachment = 'fixed';
                    document.body.style.backgroundPosition = 'center';
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    const neonFlowEffect = document.getElementById('neon-flow-effect');
    if (neonFlowEffect) {
        neonFlowEffect.addEventListener('change', function() {
            if (this.checked) {
                initDynamicNeon();
            } else {
                removeNeonFlow();
            }
        });
    }
}

// Инициализация контролов неона
function initNeonControls() {
    const neonColor = document.getElementById('neon-color');
    const neonIntensity = document.getElementById('neon-intensity');
    const neonSpeed = document.getElementById('neon-speed');
    const applyNeonBtn = document.getElementById('apply-neon');
    const intensityValue = document.getElementById('intensity-value');
    const speedValue = document.getElementById('speed-value');
    const colorPreview = document.getElementById('neon-color-preview');
    
    if (neonColor && colorPreview) {
        neonColor.addEventListener('input', function() {
            colorPreview.style.backgroundColor = this.value;
        });
        colorPreview.style.backgroundColor = neonColor.value;
    }
    
    if (neonIntensity && intensityValue) {
        neonIntensity.addEventListener('input', function() {
            intensityValue.textContent = this.value + '%';
        });
        intensityValue.textContent = neonIntensity.value + '%';
    }
    
    if (neonSpeed && speedValue) {
        const speedLabels = {
            1: 'Очень медленно',
            2: 'Медленно',
            3: 'Немного медленно',
            4: 'Ниже средней',
            5: 'Средняя',
            6: 'Выше средней',
            7: 'Быстро',
            8: 'Очень быстро',
            9: 'Супер быстро',
            10: 'Максимальная'
        };
        
        neonSpeed.addEventListener('input', function() {
            speedValue.textContent = speedLabels[this.value] || 'Средняя';
        });
        speedValue.textContent = speedLabels[neonSpeed.value] || 'Средняя';
    }
    
    if (applyNeonBtn) {
        applyNeonBtn.addEventListener('click', function() {
            const color = neonColor.value;
            const intensity = parseInt(neonIntensity.value) / 100;
            const speed = parseInt(neonSpeed.value);
            
            applyNeonSettings(color, intensity, speed);
        });
    }
}

// Применение настроек неона
function applyNeonSettings(color, intensity, speed) {
    currentNeonColor = color;
    currentNeonIntensity = intensity;
    currentNeonSpeed = speed;
    
    localStorage.setItem('fame_neon_color', color);
    localStorage.setItem('fame_neon_intensity', intensity);
    localStorage.setItem('fame_neon_speed', speed);
    
    initDynamicNeon();
}

// Динамический неон
function initDynamicNeon() {
    const oldStyle = document.getElementById('dynamic-neon-style');
    if (oldStyle) oldStyle.remove();
    
    const hex = currentNeonColor;
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    
    const duration = (11 - currentNeonSpeed) + 's';
    
    const style = document.createElement('style');
    style.id = 'dynamic-neon-style';
    
    style.textContent = `
        @keyframes neonFlow {
            0%, 100% { 
                box-shadow: 0 0 ${10 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.8 * currentNeonIntensity}),
                          0 0 ${20 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.6 * currentNeonIntensity}),
                          0 0 ${30 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.4 * currentNeonIntensity}),
                          inset 0 0 ${10 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.5 * currentNeonIntensity}); 
            }
            50% { 
                box-shadow: 0 0 ${15 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.9 * currentNeonIntensity}),
                          0 0 ${25 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.7 * currentNeonIntensity}),
                          0 0 ${35 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.5 * currentNeonIntensity}),
                          inset 0 0 ${15 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.6 * currentNeonIntensity}); 
            }
        }
        
        @keyframes textNeonFlow {
            0%, 100% { 
                text-shadow: 0 0 ${5 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.8 * currentNeonIntensity}),
                           0 0 ${10 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.6 * currentNeonIntensity}); 
            }
            50% { 
                text-shadow: 0 0 ${8 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.9 * currentNeonIntensity}),
                           0 0 ${15 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.7 * currentNeonIntensity}); 
            }
        }
        
        .neon-flow {
            animation: neonFlow ${duration} ease-in-out infinite !important;
        }
        
        .text-neon-flow {
            animation: textNeonFlow ${duration} ease-in-out infinite !important;
        }
    `;
    
    document.head.appendChild(style);
    
    const neonFlowEffect = document.getElementById('neon-flow-effect');
    if (neonFlowEffect && neonFlowEffect.checked) {
        applyNeonToElements();
    }
}

// Применение неона к элементам
function applyNeonToElements() {
    document.querySelectorAll('.member-card').forEach(card => {
        card.classList.add('neon-flow');
    });
    
    document.querySelectorAll('.modal-content').forEach(modal => {
        modal.classList.add('neon-flow');
    });
    
    document.querySelectorAll('.upload-btn').forEach(btn => {
        btn.classList.add('neon-flow');
    });
    
    const profileHeader = document.querySelector('.profile-header');
    if (profileHeader) {
        profileHeader.classList.add('neon-flow');
    }
}

// Удаление эффекта переливания
function removeNeonFlow() {
    document.querySelectorAll('.neon-flow').forEach(el => {
        el.classList.remove('neon-flow');
    });
    document.querySelectorAll('.text-neon-flow').forEach(el => {
        el.classList.remove('text-neon-flow');
    });
}

// Инициализация анимированного фона
function initAnimatedBg() {
    const bgSpeed = document.getElementById('bg-speed');
    const bgOpacity = document.getElementById('bg-opacity');
    const applyBgBtn = document.getElementById('apply-animated-bg');
    
    if (bgSpeed) {
        bgSpeed.addEventListener('input', function() {
            currentBgSpeed = parseInt(this.value);
        });
    }
    
    if (bgOpacity) {
        bgOpacity.addEventListener('input', function() {
            currentBgOpacity = parseInt(this.value) / 100;
        });
    }
    
    if (applyBgBtn) {
        applyBgBtn.addEventListener('click', applyAnimatedBg);
    }
}

// Применение анимированного фона
function applyAnimatedBg() {
    const bgElement = document.getElementById('animated-bg');
    
    // Удаляем все классы фонов
    allBackgrounds.forEach(bg => {
        bgElement.classList.remove(`${bg}-bg`);
    });
    
    // Добавляем выбранный фон
    bgElement.classList.add(`${currentAnimatedBg}-bg`);
    
    // Настраиваем скорость анимации
    const speed = currentBgSpeed / 10;
    bgElement.style.animationDuration = `${20 / speed}s`;
    
    // Настраиваем прозрачность
    bgElement.style.opacity = currentBgOpacity;
    
    // Сохраняем настройки
    localStorage.setItem('fame_animated_bg', currentAnimatedBg);
    localStorage.setItem('fame_bg_speed', currentBgSpeed);
    localStorage.setItem('fame_bg_opacity', currentBgOpacity);
}

// Инициализация модальных окон
function initModals() {
    const settingsBtns = document.querySelectorAll('#settings-btn, #menu-settings');
    
    settingsBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                openModal('settings-modal');
            });
        }
    });
    
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
}

// Открытие модального окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Закрытие модального окна
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Загрузка сохраненных настроек
function loadSavedSettings() {
    // Тема
    const savedTheme = localStorage.getItem('fame_theme');
    if (savedTheme) {
        const themeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
        if (themeOption) {
            themeOption.click();
        }
    }
    
    // Фон
    const savedBg = localStorage.getItem('fame_background');
    if (savedBg) {
        document.body.style.backgroundImage = `url(${savedBg})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
    }
    
    // Настройки неона
    const savedNeonColor = localStorage.getItem('fame_neon_color') || '#808080';
    const savedNeonIntensity = parseFloat(localStorage.getItem('fame_neon_intensity')) || 0.5;
    const savedNeonSpeed = parseInt(localStorage.getItem('fame_neon_speed')) || 5;
    
    const neonColor = document.getElementById('neon-color');
    const neonIntensity = document.getElementById('neon-intensity');
    const neonSpeed = document.getElementById('neon-speed');
    
    if (neonColor) neonColor.value = savedNeonColor;
    if (neonIntensity) neonIntensity.value = savedNeonIntensity * 100;
    if (neonSpeed) neonSpeed.value = savedNeonSpeed;
    
    applyNeonSettings(savedNeonColor, savedNeonIntensity, savedNeonSpeed);
    
    // Анимированный фон
    const savedAnimatedBg = localStorage.getItem('fame_animated_bg') || 'hooks';
    const savedBgSpeed = parseInt(localStorage.getItem('fame_bg_speed')) || 10;
    const savedBgOpacity = parseFloat(localStorage.getItem('fame_bg_opacity')) || 0.5;
    
    currentAnimatedBg = savedAnimatedBg;
    currentBgSpeed = savedBgSpeed;
    currentBgOpacity = savedBgOpacity;
    
    const bgSpeed = document.getElementById('bg-speed');
    const bgOpacity = document.getElementById('bg-opacity');
    
    if (bgSpeed) bgSpeed.value = savedBgSpeed;
    if (bgOpacity) bgOpacity.value = savedBgOpacity * 100;
    
    applyAnimatedBg();
    
    // Эффект переливания
    const savedNeonFlow = localStorage.getItem('fame_neon_flow');
    const neonFlowCheckbox = document.getElementById('neon-flow-effect');
    if (neonFlowCheckbox) {
        if (savedNeonFlow === 'disabled') {
            neonFlowCheckbox.checked = false;
            removeNeonFlow();
        } else {
            neonFlowCheckbox.checked = true;
        }
    }
    
    // Снег
    const savedSnow = localStorage.getItem('fame_snow');
    const snowCheckbox = document.getElementById('snow-effect');
    if (snowCheckbox) {
        if (savedSnow === 'disabled') {
            snowCheckbox.checked = false;
            const snowContainer = document.querySelector('.snow-container');
            if (snowContainer) snowContainer.style.display = 'none';
        } else {
            snowCheckbox.checked = true;
        }
    }
}

// Применение темы
function applyTheme(theme) {
    currentTheme = theme;
    
    const themeClasses = ['dark-theme', 'black-theme', 'red-theme', 'red-black-theme', 
                         'red-gray-theme', 'purple-theme', 'blue-theme', 'green-theme', 
                         'orange-theme', 'pink-theme'];
    
    document.body.classList.remove(...themeClasses);
    document.body.classList.add(theme + '-theme');
    
    localStorage.setItem('fame_theme', theme);
}

// ==================== РЕАЛЬНАЯ АВТОРИЗАЦИЯ ====================

// Инициализация авторизации
function initAuth() {
    console.log('Инициализация авторизации...');
    
    // Кнопка входа
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal('auth-modal');
        });
    }
    
    // Кнопка заявки
    const appBtn = document.getElementById('application-btn');
    if (appBtn) {
        appBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (currentUser) {
                openModal('application-modal');
            } else {
                alert('Сначала войдите в систему!');
                openModal('auth-modal');
            }
        });
    }
    
    // Кнопка админа
    const adminBtn = document.getElementById('admin-btn');
    if (adminBtn) {
        adminBtn.addEventListener('click', function() {
            if (currentUser && currentUser.role === 'admin') {
                openModal('admin-modal');
                loadAdminPanel();
            }
        });
    }
    
    // Кнопка выхода
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }
    
    // Форма логина
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                alert('Заполните все поля');
                return;
            }
            
            console.log('Попытка входа:', email);
            
            // Реальная проверка для владельца
            if (email === 'uesxa225@gmail.com' && password === '2251830a') {
                // Вход как админ (владелец)
                currentUser = {
                    email: email,
                    token: 'admin_token_' + Date.now(),
                    role: 'admin',
                    nickname: 'Владелец'
                };
                
                // Сохраняем в localStorage
                localStorage.setItem('fame_user', JSON.stringify(currentUser));
                
                alert('Вход как владелец выполнен успешно!');
                closeModal(document.getElementById('auth-modal'));
                updateAuthUI();
                loginForm.reset();
                
                // Сохраняем заявки в localStorage если их нет
                initApplicationsStorage();
            } else {
                alert('Неверный email или пароль. Доступ только для владельца.');
            }
        });
    }
}

// Проверка авторизации
function checkAuth() {
    const userData = localStorage.getItem('fame_user');
    
    if (userData) {
        try {
            currentUser = JSON.parse(userData);
            updateAuthUI();
            console.log('Пользователь авторизован:', currentUser.email);
        } catch (e) {
            console.error('Ошибка загрузки данных пользователя:', e);
            localStorage.removeItem('fame_user');
        }
    }
    
    // Инициализация хранилища заявок
    initApplicationsStorage();
}

// Обновление UI авторизации
function updateAuthUI() {
    const loginBtn = document.getElementById('login-btn');
    const appBtn = document.getElementById('application-btn');
    const adminBtn = document.getElementById('admin-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (currentUser) {
        // Показываем кнопки для авторизованного пользователя
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        
        // Если это админ (владелец)
        if (currentUser.role === 'admin') {
            if (appBtn) appBtn.style.display = 'block';
            if (adminBtn) adminBtn.style.display = 'block';
        }
    } else {
        // Показываем кнопки для неавторизованного пользователя
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (appBtn) appBtn.style.display = 'none';
        if (adminBtn) adminBtn.style.display = 'none';
    }
}

// Инициализация формы заявки
function initApplicationForm() {
    const form = document.getElementById('application-form');
    const descTextarea = document.getElementById('app-description');
    const charRemaining = document.getElementById('char-remaining');
    const addLinkBtn = document.getElementById('add-link-btn');
    
    // Счетчик символов
    if (descTextarea && charRemaining) {
        descTextarea.addEventListener('input', function() {
            const remaining = 3000 - this.value.length;
            charRemaining.textContent = remaining;
        });
    }
    
    // Кнопка добавления ссылки
    if (addLinkBtn) {
        addLinkBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            addLinkField();
        });
    }
    
    // Отправка формы
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!currentUser) {
                alert('Сначала войдите в систему!');
                openModal('auth-modal');
                return;
            }
            
            const avatar = document.getElementById('app-avatar').value.trim();
            const nickname = document.getElementById('app-nickname').value.trim();
            const username = document.getElementById('app-username').value.trim();
            const project = document.getElementById('app-project').value.trim();
            const description = document.getElementById('app-description').value.trim();
            
            // Проверка обязательных полей
            if (!avatar || !nickname || !username) {
                alert('Заполните обязательные поля: аватар, никнейм и юзернейм');
                return;
            }
            
            // Собираем дополнительные ссылки
            const extraLinks = [];
            document.querySelectorAll('.extra-link').forEach(input => {
                if (input.value.trim()) {
                    extraLinks.push(input.value.trim());
                }
            });
            
            // Создаем объект заявки
            const application = {
                id: Date.now(),
                userId: currentUser.email,
                avatar: avatar,
                nickname: nickname,
                username: username,
                project: project || null,
                extraLinks: extraLinks,
                description: description,
                status: 'pending', // pending, approved, rejected
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            // Сохраняем заявку
            saveApplication(application);
            
            alert('Заявка успешно отправлена! Ожидайте рассмотрения.');
            closeModal(document.getElementById('application-modal'));
            form.reset();
            
            // Сбрасываем счетчик символов
            if (charRemaining) {
                charRemaining.textContent = '3000';
            }
            
            // Удаляем все дополнительные поля ссылок кроме первого
            const linkContainer = document.getElementById('extra-links-container');
            if (linkContainer) {
                const linkInputs = linkContainer.querySelectorAll('.link-input');
                linkInputs.forEach((link, index) => {
                    if (index > 0) {
                        link.remove();
                    } else {
                        link.querySelector('input').value = '';
                    }
                });
            }
        });
    }
}

// Инициализация хранилища заявок
function initApplicationsStorage() {
    if (!localStorage.getItem('fame_applications')) {
        localStorage.setItem('fame_applications', JSON.stringify([]));
    }
}

// Сохранение заявки
function saveApplication(application) {
    try {
        const applications = JSON.parse(localStorage.getItem('fame_applications') || '[]');
        applications.push(application);
        localStorage.setItem('fame_applications', JSON.stringify(applications));
        console.log('Заявка сохранена:', application.id);
        return true;
    } catch (error) {
        console.error('Ошибка сохранения заявки:', error);
        return false;
    }
}

// Загрузка заявок
function getApplications() {
    try {
        return JSON.parse(localStorage.getItem('fame_applications') || '[]');
    } catch (error) {
        console.error('Ошибка загрузки заявок:', error);
        return [];
    }
}

// Функции для ссылок
function addLinkField() {
    const container = document.getElementById('extra-links-container');
    const currentCount = container.querySelectorAll('.link-input').length;
    
    if (currentCount >= 10) {
        alert('Максимум 10 ссылок!');
        return;
    }
    
    const div = document.createElement('div');
    div.className = 'link-input';
    div.innerHTML = `
        <input type="url" class="extra-link" placeholder="https://...">
        <button type="button" class="remove-link">×</button>
    `;
    
    const removeBtn = div.querySelector('.remove-link');
    removeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        div.remove();
    });
    
    container.appendChild(div);
}

// Загрузка админ-панели
function loadAdminPanel() {
    const applications = getApplications();
    const totalApplications = document.getElementById('total-applications');
    const newApplications = document.getElementById('new-applications');
    const applicationsList = document.getElementById('applications-list');
    
    if (totalApplications) {
        totalApplications.textContent = applications.length;
    }
    
    if (newApplications) {
        const pendingCount = applications.filter(app => app.status === 'pending').length;
        newApplications.textContent = pendingCount;
    }
    
    if (applicationsList) {
        applicationsList.innerHTML = '';
        
        if (applications.length === 0) {
            applicationsList.innerHTML = '<p class="no-data">Нет заявок</p>';
            return;
        }
        
        // Сортируем заявки по дате (новые сверху)
        const sortedApplications = [...applications].sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        sortedApplications.forEach(application => {
            const appElement = document.createElement('div');
            appElement.className = 'application-item';
            appElement.dataset.id = application.id;
            
            const date = new Date(application.createdAt);
            const formattedDate = date.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            let statusClass = 'pending';
            let statusText = 'Ожидает';
            
            if (application.status === 'approved') {
                statusClass = 'approved';
                statusText = 'Принята';
            } else if (application.status === 'rejected') {
                statusClass = 'rejected';
                statusText = 'Отклонена';
            }
            
            appElement.innerHTML = `
                <div class="application-header">
                    <h3>${application.nickname}</h3>
                    <span class="application-status ${statusClass}">${statusText}</span>
                </div>
                <div class="application-info">
                    <p><strong>Юзернейм:</strong> ${application.username}</p>
                    <p><strong>Проект:</strong> ${application.project || 'Не указан'}</p>
                    <p><strong>Дата подачи:</strong> ${formattedDate}</p>
                    <p><strong>Описание:</strong> ${application.description || 'Нет описания'}</p>
                    
                    ${application.extraLinks && application.extraLinks.length > 0 ? `
                        <p><strong>Дополнительные ссылки:</strong></p>
                        <ul class="application-links">
                            ${application.extraLinks.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                <div class="application-actions">
                    ${application.status === 'pending' ? `
                        <button class="action-btn approve-btn" onclick="updateApplicationStatus(${application.id}, 'approved')">
                            <i class="fas fa-check"></i> Принять
                        </button>
                        <button class="action-btn reject-btn" onclick="updateApplicationStatus(${application.id}, 'rejected')">
                            <i class="fas fa-times"></i> Отклонить
                        </button>
                    ` : ''}
                    <button class="action-btn delete-btn" onclick="deleteApplication(${application.id})">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                </div>
            `;
            
            applicationsList.appendChild(appElement);
        });
    }
}

// Обновление статуса заявки
function updateApplicationStatus(appId, status) {
    const applications = getApplications();
    const appIndex = applications.findIndex(app => app.id === appId);
    
    if (appIndex !== -1) {
        applications[appIndex].status = status;
        applications[appIndex].updatedAt = new Date().toISOString();
        
        localStorage.setItem('fame_applications', JSON.stringify(applications));
        loadAdminPanel();
        
        alert(`Заявка ${status === 'approved' ? 'принята' : 'отклонена'}!`);
    }
}

// Удаление заявки
function deleteApplication(appId) {
    if (confirm('Вы уверены, что хотите удалить эту заявку?')) {
        const applications = getApplications();
        const filteredApplications = applications.filter(app => app.id !== appId);
        
        localStorage.setItem('fame_applications', JSON.stringify(filteredApplications));
        loadAdminPanel();
        
        alert('Заявка удалена!');
    }
}

// Выход из системы
function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.removeItem('fame_user');
        currentUser = null;
        updateAuthUI();
        alert('Вы вышли из системы');
    }
}

// Функция переключения секций
function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active-section');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }
    
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.section === sectionId) {
            tab.classList.add('active');
        }
    });
}

// Глобальные функции
window.copyProfileLink = function(username) {
    const link = `https://t.me/+UO-WJgp_j65iYjA6?text=Профиль%20${encodeURIComponent(username)}%20на%20Fame%20TG`;
    navigator.clipboard.writeText(link).then(() => {
        alert('Ссылка на профиль скопирована в буфер обмена!');
    });
};

// Экспорт функций для админ-панели
window.updateApplicationStatus = updateApplicationStatus;
window.deleteApplication = deleteApplication;

// Сохранение настроек при изменении
document.getElementById('snow-effect')?.addEventListener('change', function() {
    localStorage.setItem('fame_snow', this.checked ? 'enabled' : 'disabled');
});

document.getElementById('neon-flow-effect')?.addEventListener('change', function() {
    localStorage.setItem('fame_neon_flow', this.checked ? 'enabled' : 'disabled');
    if (this.checked) {
        initDynamicNeon();
    } else {
        removeNeonFlow();
    }
});