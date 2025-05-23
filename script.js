const startArea = document.getElementById('startArea');
const container = document.querySelector('.container');
const choiceButtons13 = document.getElementById('choiceButtons13');
const choiceButtons25 = document.getElementById('choiceButtons25');
const returnButton = document.getElementById('returnButton');
const choiceButtons510 = document.getElementById('choiceButtons510');
const chapter5_1_button = document.getElementById('chapter5_1_button');
const chapter5_2_button = document.getElementById('chapter5_2_button');
const choiceButtons610 = document.getElementById('choiceButtons610');
const chapter6_1_button = document.getElementById('chapter6_1_button');
const chapter6_2_button = document.getElementById('chapter6_2_button');
let isAnimationComplete = false;
let currentImage = 0;
let currentChapter = null;
let isChapter1_2AutoPlay = false;
let isChapter2Animation = false;
let animationTimeout = null;
let isChapter2AnimationComplete = false;

// ДОБАВЛЯЕМ: элементы для главы 3
const choiceButtons311 = document.createElement('div');
choiceButtons311.id = 'choiceButtons311';
choiceButtons311.className = 'choice-buttons';
choiceButtons311.innerHTML = `
    <button class="choice-button" style="top: 40%;"></button>
    <button class="choice-button" style="top: 60%;"></button>
    <button class="choice-button" style="top: 80%;"></button>
`;
document.querySelector('.container').appendChild(choiceButtons311);

let isChapter3Animation = false;
let isChapter3Animation2 = false;
let isChapter3AnimationComplete = false;
let isChapter3Animation2Complete = false;

let isChapter4Animation1 = false;
let isChapter4Animation1Complete = false;
let isChapter4Animation2 = false;
let isChapter4Animation2Complete = false;

function showImage(id) {
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
    document.querySelectorAll('.image').forEach(img => img.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'chapter1_1_img7' || id === 'chapter5_1_img7') {
        returnButton.classList.add('active');
    } else {
        returnButton.classList.remove('active');
    }
    // Кнопки выбора для 3-11
    if (id === 'chapter3_img11') {
        choiceButtons311.classList.add('active');
    } else {
        choiceButtons311.classList.remove('active');
    }
    // АВТОМАТИЧЕСКИЙ ЗАПУСК АНИМАЦИИ 3-3.png -> 3-9.png
    if (id === 'chapter3_img3' && !isChapter3Animation) {
        isChapter3Animation = true;
        isChapter3AnimationComplete = false;
        container.style.pointerEvents = 'none';
        startChapter3Animation(3);
    }
    // АВТОМАТИЧЕСКИЙ ЗАПУСК АНИМАЦИИ 4-11.png -> 4-15.png
    if (id === 'chapter4_img11' && !isChapter4Animation1) {
        isChapter4Animation1 = true;
        isChapter4Animation1Complete = false;
        container.style.pointerEvents = 'none';
        startChapter4Animation1(11);
    }
    // АВТОМАТИЧЕСКИЙ ЗАПУСК АНИМАЦИИ 4-23.png -> 4-30.png
    if (id === 'chapter4_img23' && !isChapter4Animation2) {
        isChapter4Animation2 = true;
        isChapter4Animation2Complete = false;
        container.style.pointerEvents = 'none';
        startChapter4Animation2(23);
    }
    // Скрываем все кнопки выбора при показе изображений из chapter1_2
    if (id.includes('chapter1_2')) {
        choiceButtons13.classList.remove('active');
        choiceButtons25.classList.remove('active');
        if (isChapter1_2AutoPlay) {
            container.style.pointerEvents = 'none';
        }
        // Если достигли последнего изображения chapter1_2, переходим к chapter2
        if (id === 'chapter1_2_img15') {
            setTimeout(() => {
                currentChapter = 'chapter2';
                showImage('chapter2_img1');
            }, 1000);
        }
    } else {
        container.style.pointerEvents = 'auto';
    }
    if (id === 'chapter5_img10') {
        choiceButtons510.classList.add('active');
    } else {
        choiceButtons510.classList.remove('active');
    }
    if (id === 'chapter6_img12') {
        choiceButtons610.classList.add('active');
    } else {
        choiceButtons610.classList.remove('active');
    }
}

function showMainImage(number) {
    showImage(`img${number}`);
    
    // Показываем или скрываем кнопки выбора
    if (number === 13) {
        choiceButtons13.classList.add('active');
        choiceButtons25.classList.remove('active');
    } else if (number === 25) {
        choiceButtons13.classList.remove('active');
        choiceButtons25.classList.add('active');
    } else {
        choiceButtons13.classList.remove('active');
        choiceButtons25.classList.remove('active');
    }
}

function startAnimation() {
    currentImage = 0;
    const totalImages = 11;
    startArea.style.display = 'none';
    showMainImage(currentImage);
    
    function switchImage() {
        if (currentImage < totalImages) {
            currentImage++;
            showMainImage(currentImage);
            if (currentImage < totalImages) {
                setTimeout(switchImage, 500); // вернуть 500
            } else {
                isAnimationComplete = true;
            }
        }
    }
    
    setTimeout(switchImage, 500); // вернуть 500
}

function startChapter1_2AutoPlay(currentIdx = 5) {
    if (currentIdx <= 15) {
        showImage(`chapter1_2_img${currentIdx}`);
        setTimeout(() => startChapter1_2AutoPlay(currentIdx + 1), 500); // вернуть 500
    }
}

function startChapter2Animation(currentIdx = 4) {
    showImage(`chapter2_img${currentIdx}`);
    if (currentIdx < 7) {
        animationTimeout = setTimeout(() => startChapter2Animation(currentIdx + 1), 250);
    } else {
        isChapter2Animation = false;
        isChapter2AnimationComplete = true;
        container.style.pointerEvents = 'auto';
    }
}

function startChapter3Animation(currentIdx = 3) {
    showImage(`chapter3_img${currentIdx}`);
    if (currentIdx < 9) {
        animationTimeout = setTimeout(() => startChapter3Animation(currentIdx + 1), 250);
    } else {
        isChapter3Animation = false;
        isChapter3AnimationComplete = true;
        container.style.pointerEvents = 'auto';
    }
}

function startChapter3Animation2(currentIdx = 12) {
    showImage(`chapter3_img${currentIdx}`);
    if (currentIdx < 25) {
        animationTimeout = setTimeout(() => startChapter3Animation2(currentIdx + 1), 500); // вернуть 500
    } else {
        isChapter3Animation2 = false;
        isChapter3Animation2Complete = true;
        container.style.pointerEvents = 'auto';
    }
}

function startChapter4Animation1(currentIdx = 11) {
    showImage(`chapter4_img${currentIdx}`);
    if (currentIdx < 15) {
        animationTimeout = setTimeout(() => startChapter4Animation1(currentIdx + 1), 250);
    } else {
        isChapter4Animation1 = false;
        isChapter4Animation1Complete = true;
        container.style.pointerEvents = 'auto';
    }
}

function startChapter4Animation2(currentIdx = 23) {
    showImage(`chapter4_img${currentIdx}`);
    if (currentIdx < 30) {
        animationTimeout = setTimeout(() => startChapter4Animation2(currentIdx + 1), 250);
    } else {
        // Показываем последний кадр 4-30.png и завершаем анимацию, затем автопереход на 4-31.png
        isChapter4Animation2 = false;
        isChapter4Animation2Complete = true;
        container.style.pointerEvents = 'auto';
        setTimeout(() => showImage('chapter4_img31'), 250);
    }
}

// Показываем начальное изображение
showMainImage(0);

// Обработчик клика по контейнеру
container.addEventListener('click', (event) => {
    if (!event.target.classList.contains('choice-button')) {
        if (isAnimationComplete) {
            if (currentChapter === null) {
                // Основной путь до выбора главы
                if (currentImage !== 13 && currentImage < 25) {
                    currentImage++;
                    showMainImage(currentImage);
                }
            } else if (currentChapter === 'chapter1_1') {
                // Путь первой главы, вариант 1
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (currentId < 7) {
                    showImage(`chapter1_1_img${currentId + 1}`);
                }
            } else if (currentChapter === 'chapter1_2' && !isChapter1_2AutoPlay) {
                // Путь первой главы, вариант 2 (до автопрокрутки)
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (currentId < 5) {
                    const nextId = currentId + 1;
                    showImage(`chapter1_2_img${nextId}`);
                    if (nextId === 5) {
                        isChapter1_2AutoPlay = true;
                        container.style.pointerEvents = 'none';
                        setTimeout(() => startChapter1_2AutoPlay(5), 500); // вернуть 500
                    }
                }
            } else if (currentChapter === 'chapter2') {
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (!isChapter2Animation) {
                    if (currentId < 3) {
                        showImage(`chapter2_img${currentId + 1}`);
                    } else if (currentId === 3) {
                        isChapter2Animation = true;
                        isChapter2AnimationComplete = false;
                        container.style.pointerEvents = 'none';
                        startChapter2Animation(4);
                    } else if (currentId >= 7 && currentId < 9) {
                    showImage(`chapter2_img${currentId + 1}`);
                    } else if (currentId === 9) {
                        // Переход на главу 3
                        currentChapter = 'chapter3';
                        showImage('chapter3_img1');
                    }
                }
            } else if (currentChapter === 'chapter3') {
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (!isChapter3Animation && !isChapter3Animation2) {
                    if (currentId < 3) {
                        showImage(`chapter3_img${currentId + 1}`);
                    } else if (currentId === 3) {
                        // Запуск анимации с 3-4 по 3-8
                        isChapter3Animation = true;
                        isChapter3AnimationComplete = false;
                        container.style.pointerEvents = 'none';
                        startChapter3Animation(4);
                    } else if (currentId >= 8 && currentId < 11) {
                        showImage(`chapter3_img${currentId + 1}`);
                    } else if (currentId === 11) {
                        // Ждём выбора кнопки
                    } else if (currentId >= 25 && currentId < 27 && isChapter3Animation2Complete) {
                        showImage(`chapter3_img${currentId + 1}`);
                    } else if (currentId === 27) {
                        // Переход на главу 4
                        currentChapter = 'chapter4';
                        showImage('chapter4_img1');
                    }
                }
            } else if (currentChapter === 'chapter4') {
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (!isChapter4Animation1 && !isChapter4Animation2) {
                    if (currentId < 11) {
                        showImage(`chapter4_img${currentId + 1}`);
                    } else if (currentId === 11) {
                        isChapter4Animation1 = true;
                        isChapter4Animation1Complete = false;
                        container.style.pointerEvents = 'none';
                        startChapter4Animation1(11);
                    } else if (currentId > 15 && currentId < 23) {
                        showImage(`chapter4_img${currentId + 1}`);
                    } else if (currentId === 23) {
                        isChapter4Animation2 = true;
                        isChapter4Animation2Complete = false;
                        container.style.pointerEvents = 'none';
                        startChapter4Animation2(23);
                    } else if (currentId > 30 && currentId < 31) {
                        showImage(`chapter4_img${currentId + 1}`);
                    } else if (currentId >= 15 && currentId < 23 && isChapter4Animation1Complete) {
                        showImage(`chapter4_img${currentId + 1}`);
                    } else if (currentId === 31) {
                        // Переход на главу 5
                        currentChapter = 'chapter5';
                        showImage('chapter5_img1');
                    }
                }
            } else if (currentChapter === 'chapter5') {
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (currentId < 10) {
                    showImage(`chapter5_img${currentId + 1}`);
                } else if (currentId === 10) {
                    // Показываем кнопки выбора
                    choiceButtons510.classList.add('active');
                } else if (currentId === 'chapter5_1_img7') {
                    // Переход на главу 5-1
                    currentChapter = 'chapter5_1';
                    showImage('chapter5_1_img1');
                } else if (currentId === 'chapter5_2_img7') {
                    // Переход на главу 5-2
                    currentChapter = 'chapter5_2';
                    showImage('chapter5_2_img1');
                } else if (currentId === 5) {
                    // Переход на главу 6
                    currentChapter = 'chapter6';
                    showImage('chapter6_img1');
                }
            } else if (currentChapter === 'chapter5_1') {
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (currentId < 7) {
                    showImage(`chapter5_1_img${currentId + 1}`);
                }
            } else if (currentChapter === 'chapter5_2') {
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (currentId < 5) {
                    showImage(`chapter5_2_img${currentId + 1}`);
                } else if (currentId === 5) {
                    // Переход на главу 6
                    currentChapter = 'chapter6';
                    showImage('chapter6_img1');
                }
            } else if (currentChapter === 'chapter6') {
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (currentId < 12) {
                    showImage(`chapter6_img${currentId + 1}`);
                } else if (currentId === 12) {
                    // Показываем кнопки выбора
                    choiceButtons610.classList.add('active');
                }
            } else if (currentChapter === 'chapter6_1') {
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (currentId < 15) {
                    showImage(`chapter6_1_img${currentId + 1}`);
                } else if (currentId === 15) {
                    // Переход на главу 7
                    currentChapter = 'chapter7';
                    showImage('chapter7_img1');
                }
            } else if (currentChapter === 'chapter6_2') {
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (currentId < 12) {
                    showImage(`chapter6_2_img${currentId + 1}`);
                } else if (currentId === 12) {
                    // Переход на главу 7
                    currentChapter = 'chapter7';
                    showImage('chapter7_img1');
                }
            } else if (currentChapter === 'chapter7') {
                const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
                if (currentId < 9) {
                    showImage(`chapter7_img${currentId + 1}`);
                }
            }
        }
    }
});

// Обработчики для кнопок выбора на img13
document.querySelectorAll('#choiceButtons13 .choice-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        if (currentImage === 13) {
            currentImage = 14;
            showMainImage(14);
        }
    });
});

// Обработчики для кнопок выбора на img25
document.getElementById('chapter1_1_button').addEventListener('click', (event) => {
    event.stopPropagation();
    if (currentImage === 25) {
        currentChapter = 'chapter1_1';
        choiceButtons25.classList.remove('active');
        showImage('chapter1_1_img1');
    }
});

document.getElementById('chapter1_2_button').addEventListener('click', (event) => {
    event.stopPropagation();
    if (currentImage === 25) {
        currentChapter = 'chapter1_2';
        choiceButtons25.classList.remove('active');
        showImage('chapter1_2_img1');
    }
});

// Обработчики для кнопок выбора на 3-11
choiceButtons311.querySelectorAll('.choice-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const currentId = parseInt(document.querySelector('.image.active').id.match(/\d+$/)[0]);
        if (currentId === 11) {
            isChapter3Animation2 = true;
            isChapter3Animation2Complete = false;
            choiceButtons311.classList.remove('active');
            container.style.pointerEvents = 'none';
            startChapter3Animation2(12);
        }
    });
});

// Обработчики для кнопок выбора на 5-10.png
chapter5_1_button.addEventListener('click', (event) => {
    event.stopPropagation();
    currentChapter = 'chapter5_1';
    choiceButtons510.classList.remove('active');
    showImage('chapter5_1_img1');
});
chapter5_2_button.addEventListener('click', (event) => {
    event.stopPropagation();
    currentChapter = 'chapter5_2';
    choiceButtons510.classList.remove('active');
    showImage('chapter5_2_img1');
});

// Обработчики для кнопок выбора на 6-12.png
chapter6_1_button.addEventListener('click', (event) => {
    event.stopPropagation();
    currentChapter = 'chapter6_1';
    choiceButtons610.classList.remove('active');
    showImage('chapter6_1_img1');
});
chapter6_2_button.addEventListener('click', (event) => {
    event.stopPropagation();
    currentChapter = 'chapter6_2';
    choiceButtons610.classList.remove('active');
    showImage('chapter6_2_img1');
});

startArea.addEventListener('click', startAnimation);

// Обработчик для кнопки возврата
document.getElementById('return_to_start_button').addEventListener('click', (event) => {
    event.stopPropagation();
    // Очищаем анимацию при возврате
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
    // Если мы на 5-1-7.png — возвращаем на 5-10.png
    if (document.querySelector('.image.active').id === 'chapter5_1_img7') {
        currentChapter = 'chapter5';
        showImage('chapter5_img10');
        return;
    }
    // Сбрасываем все состояния
    currentChapter = null;
    currentImage = 0;
    isAnimationComplete = false;
    isChapter1_2AutoPlay = false;
    isChapter2Animation = false;
    isChapter2AnimationComplete = false;
    isChapter3Animation = false;
    isChapter3Animation2 = false;
    isChapter3AnimationComplete = false;
    isChapter3Animation2Complete = false;
    isChapter4Animation1 = false;
    isChapter4Animation1Complete = false;
    isChapter4Animation2 = false;
    isChapter4Animation2Complete = false;
    // Сбрасываем отображение всех элементов
    returnButton.classList.remove('active');
    choiceButtons13.classList.remove('active');
    choiceButtons25.classList.remove('active');
    choiceButtons311.classList.remove('active');
    choiceButtons510.classList.remove('active');
    choiceButtons610.classList.remove('active');
    container.style.pointerEvents = 'auto';
    // Показываем стартовую область
    startArea.style.display = '';
    // Возвращаемся к начальному изображению
    showMainImage(0);
});
