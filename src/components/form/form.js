window.Inputmask = require('inputmask');

$('.form-validate').each((i, el) => {
    el.addEventListener('invalid', (e) => {
        e.preventDefault();
        e.target.classList.add('invalid');
    }, true);
    el.addEventListener('focusin', (e) => {
        e.target.classList.remove('invalid');
    }, true);
});

const email = new Inputmask({
    mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@{1}*{1,20}d{1}*{2,6}[.*{1,2}]',
    greedy: false,
    definitions: {
        '*': {
            validator: "[0-9A-Za-z_-]",
            cardinality: 1,
            casing: "lower"
        },
        '@': {
            validator: '@',
            cardinality: 1,
            casing: 'lower'
        },
        'd': {
            validator: '.',
            cardinality: 1,
            casing: 'lower'
        }
    }
});


let phone = new Inputmask({
    mask: '+^{2} (^{3}) ^{3} ^{2} ^{1,15}',
    definitions: {
        '#': '',
        '^': {
            validator: "[0-9\\s]",
            cardinality: 1,
            casing: "lower"
        }
    },
    oncomplete: (e) => {
        // console.log(e.target);
        // console.log('tel oncomplete');
        e.target.classList.remove('onincomplete');
        e.target.classList.add('oncomplete');
    },
    onincomplete: (e) => {
        if($(e.target).attr('required')){
            e.target.classList.remove('oncomplete');
            e.target.classList.add('onincomplete');
            // e.target.value = '';
        }
    },
    oncleared: () => {
        completePhone = false;
        clearIncomplete  = true;
    },
    // positionCaretOnClick: testMask()
});
phone.mask($('[type="tel"]'));
email.mask($('.email'));

$('.email:required').attr('pattern', `^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$`);
$('[type="tel"]:required').attr('pattern', `\\+[0-9]{2}\\s\\([0-9]{3}\\)\\s[0-9]{3}\\s[0-9]{2}\\s[0-9]{2,6}`);
