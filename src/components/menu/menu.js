$('.menu__button, .menu__close-mobile').on('click', function() {
    $(this).closest('.menu').toggleClass('menu_active');
});

//const targets = document.querySelectorAll('.scroll-block');
//
//const checkActiveBlock = () => {
//    for(let i = 0; i < targets.length; i++) {
//        const top = targets[i].getBoundingClientRect().y;
//        if(top >= 0 && top < 100 && !$(`a[href="#${targets[i].id}"]`).hasClass('menu__link_active')) {
//            $('.menu__link').removeClass('menu__link_active');
//            $(`a[href="#${targets[i].id}"]`).addClass('menu__link_active');
//            break;
//        }
//    }
//};
//
//$(document).on('scroll', (e) => {
//    checkActiveBlock();
//});
//checkActiveBlock();
