function Slider() {
    this.slider = document.querySelector(".content__slider");

    // Carousel objects
    this.slides = this.slider.querySelectorAll(".content__slider_slide");
    this.firstSlide = this.slider.querySelector(".content__slider_slide");
    this.indicatorDots = this.slider.querySelector(".content__slider_dots");

    // Initialization
    this.options = Slider.defaults;
    Slider.initialize(this);
};

Slider.defaults = {
    // Default options for the carousel
    loop: true,     // Бесконечное зацикливание слайдера
    auto: true,     // Автоматическое пролистывание
    interval: 5000, // Интервал между пролистыванием элементов (мс)
    dots: true      // Индикаторные точки
};

Slider.prototype.elemPrev = function (num) {
    num = num || 1;

    let prevSlide = this.currentSlide;
    this.currentSlide -= num;
    if (this.currentSlide < 0) this.currentSlide = this.slidesCount - 1;

    this.slides[this.currentSlide].style.opacity = '1';
    this.slides[prevSlide].style.opacity = '0';

    if (this.options.dots) {
        this.dotOn(prevSlide);
        this.dotOff(this.currentSlide);
    }
};

Slider.prototype.elemNext = function (num) {
    num = num || 1;

    let prevSlide = this.currentSlide;
    this.currentSlide += num;
    if (this.currentSlide >= this.slidesCount) this.currentSlide = 0;

    this.slides[this.currentSlide].style.opacity = '1';
    this.slides[prevSlide].style.opacity = '0';

    if (this.options.dots) {
        this.dotOn(prevSlide); this.dotOff(this.currentSlide)
    }
};

Slider.prototype.dotOn = function (num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#fff; cursor:pointer;'
};

Slider.prototype.dotOff = function (num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#4359e1; cursor:default;'
};

Slider.initialize = function (that) {

    // Constants
    that.slidesCount = that.slides.length; // Количество элементов

    // Variables
    that.currentSlide = 0;
    let beginTime = getTime();

    // Functions
    function getTime() {
        return new Date().getTime();
    };

    function setAutoScroll() {
        that.autoScroll = setInterval(function () {
            let finalTime = getTime();
            if (finalTime - beginTime + 10 > that.options.interval) {
                beginTime = finalTime; that.elemNext();
            }
        }, that.options.interval);
    };

    // Start initialization
    if (that.slidesCount <= 1) {   // Отключить навигацию
        that.options.auto = false; that.options.arrows = false; that.options.dots = false;
    };
    if (that.slidesCount >= 1) {   // показать первый элемент
        that.firstSlide.style.opacity = '1';
    };

    if (that.options.auto) {   // инициализация автопрокруки
        setAutoScroll();
        // Остановка прокрутки при наведении мыши на элемент
        that.slider.addEventListener('mouseenter', function () { clearInterval(that.autoScroll) }, false);
        that.slider.addEventListener('mouseleave', setAutoScroll, false)
    };

    if (that.options.dots) {  // инициализация индикаторных точек
        let sum = '', diffNum;
        for (let i = 0; i < that.slidesCount; i++) {
            sum += '<span class="content__slider_dots-dot"></span>'
        };
        that.indicatorDots.innerHTML = sum;
        that.indicatorDotsAll = that.slider.querySelectorAll('.content__slider_dots-dot');
        // Назначаем точкам обработчик события 'click'
        for (let n = 0; n < that.slidesCount; n++) {
            that.indicatorDotsAll[n].addEventListener('click', function () {
                diffNum = Math.abs(n - that.currentSlide);
                if (n < that.currentSlide) {
                    beginTime = getTime(); that.elemPrev(diffNum)
                }
                else if (n > that.currentSlide) {
                    beginTime = getTime(); that.elemNext(diffNum)
                }
                // Если n == that.currentSlide ничего не делаем
            }, false)
        };
        that.dotOff(0);  // точка[0] выключена, остальные включены
        for (let i = 1; i < that.slidesCount; i++) {
            that.dotOn(i)
        }
    }
};

new Slider();