import * as settings from '../api/settings';
import imgproxy from '../api/imgproxy';
import imageSize from './image-size';

const getSelectedImage = function (editor) {
    return editor.selection.getNode();
};

const getImgproxySettings = function (editor) {
    return {
        url: settings.getImgproxyUrl(editor),
        key: settings.getImgproxyKey(editor),
        salt: settings.getImgproxySalt(editor)
    };
}

const isUseImgproxy = function (editor, img) {
    const imgproxySettings = getImgproxySettings(editor);

    if (imgproxySettings.url === undefined || imgproxySettings.key === undefined || imgproxySettings.salt === undefined) {
        return false;
    } else if (img.src.indexOf(imgproxySettings.url) !== 0) {
        return false;
    }
    return true;
}

const getOriginalImageUrlFromImgproxyUrl = function (src: string) {
    return atob(src.slice(src.lastIndexOf('/') + 1, src.lastIndexOf('.')));
}

const isEditableImage = function (editor, img) {
    const selectorMatched = editor.dom.is(img, 'img:not([data-mce-object],[data-mce-placeholder])');

    return selectorMatched;
};

const resizing = function (editor, limitSize) {
    return function () {
        let selectedImage = getSelectedImage(editor);
        if (isUseImgproxy(editor, selectedImage)) {
            const src = getOriginalImageUrlFromImgproxyUrl(selectedImage.src);
            selectedImage.src = imgproxy.createImgproxySignatureUrl('fit', limitSize, limitSize, 'ce', 0, src, 'png', getImgproxySettings(editor));
        } else {
            const originalSize = imageSize.getNaturalImageSize(selectedImage);
            const size = {w: originalSize.w, h: originalSize.h};
            if (limitSize !== 1600) {
                if (originalSize.w > originalSize.h) {
                    size.w = limitSize;
                    size.h = -1;
                } else if (originalSize.w < originalSize.h) {
                    size.w = -1;
                    size.h = limitSize;
                } else {
                    size.w = limitSize;
                    size.h = limitSize;
                }
            }
            imageSize.setImageSize(selectedImage, size);
        }
    };
};

export default {
    isEditableImage,
    resizing
};