const register = function (editor) {
    const cmd = (command: string) => () => editor.execCommand(command);

    editor.ui.registry.addButton('small', {
        tooltip: 'Small',
        text: 'Small',
        onAction: cmd('cksImageSmallSizing')
    });

    editor.ui.registry.addButton('middle', {
        tooltip: 'Middle',
        text: 'Middle',
        onAction: cmd('cksImageMiddleSizing')
    });

    editor.ui.registry.addButton('large', {
        tooltip: 'Large',
        text: 'Large',
        onAction: cmd('cksImageLargeSizing')
    });

    editor.ui.registry.addButton('original', {
        tooltip: 'Original',
        text: 'Original',
        onAction: cmd('cksImageOriginalSizing')
    });
};

export default {
    register
};