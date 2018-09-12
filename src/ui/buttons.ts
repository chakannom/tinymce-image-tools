const register = function (editor) {
    editor.addButton('small', {
        title: 'Small',
        text: 'Small',
        cmd: 'cksImageSmallSizing'
    });

    editor.addButton('middle', {
        title: 'Middle',
        text: 'Middle',
        cmd: 'cksImageMiddleSizing'
    });

    editor.addButton('large', {
        title: 'Large',
        text: 'Large',
        cmd: 'cksImageLargeSizing'
    });

    editor.addButton('original', {
        title: 'Original',
        text: 'Original',
        cmd: 'cksImageOriginalSizing'
    });
};

export default {
    register
};