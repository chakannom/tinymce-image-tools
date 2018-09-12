const resizing = function (editor, size) {
    return function () {
        console.log(size);
    };
};

const isEditableImage = function (editor, img) {
    const selectorMatched = editor.dom.is(img, 'img:not([data-mce-object],[data-mce-placeholder])');

    return selectorMatched;
};

export default {
    resizing,
    isEditableImage
};