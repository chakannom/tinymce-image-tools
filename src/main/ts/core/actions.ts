import { Option } from '@ephox/katamari';
import { SelectorFind, Element } from '@ephox/sugar';

import * as settings from '../api/settings';
import imgproxy from '../api/imgproxy';
import imageSize from './image-size';

const getFigureImg = (elem) => {
  return SelectorFind.child(Element.fromDom(elem), 'img');
};

const isFigure = (editor, elem) => {
  return editor.dom.is(elem, 'figure');
};

const getEditableImage = function (editor, elem) {
  const isImage = (imgNode) => editor.dom.is(imgNode, 'img:not([data-mce-object],[data-mce-placeholder])');
  const isEditable = (imgNode) => isImage(imgNode);

  if (isFigure(editor, elem)) {
      const imgOpt = getFigureImg(elem);
      return imgOpt.map((img) => {
          return isEditable(img.dom()) ? Option.some(img.dom()) : Option.none();
      });
  }
  return isEditable(elem) ? Option.some(elem) : Option.none();
};

const getSelectedImage = function (editor) {
    return editor.selection.getNode();
};

const getImgproxySettings = function (editor) {
    return {
        url: settings.getImgproxyUrl(editor),
        key: settings.getImgproxyKey(editor),
        salt: settings.getImgproxySalt(editor)
    };
};

const isUseImgproxy = function (editor, img) {
    const imgproxySettings = getImgproxySettings(editor);
    if (imgproxySettings.url === undefined || imgproxySettings.key === undefined || imgproxySettings.salt === undefined) {
        return false;
    } else if (img.src.indexOf(imgproxySettings.url) !== 0) {
        return false;
    }
    return true;
};

const getOriginalImageUrlFromImgproxyUrl = function (src: string) {
    return window.atob(src.slice(src.lastIndexOf('/') + 1, src.lastIndexOf('.')));
};

const resizing = function (editor, limitSize) {
    return function () {
        const selectedImage = getSelectedImage(editor);
        if (isUseImgproxy(editor, selectedImage)) {
            const src = getOriginalImageUrlFromImgproxyUrl(selectedImage.src);
            const enlarge = limitSize < 1600 ? 1 : 0;
            selectedImage.src = imgproxy.createImgproxySignatureUrl('fit', limitSize, limitSize, 'ce', enlarge, src, 'png', getImgproxySettings(editor));
        } else {
            const originalSize = imageSize.getNaturalImageSize(selectedImage);
            const size = {w: originalSize.w, h: originalSize.h};
            if (limitSize < 1600) {
                size.w = (originalSize.w >= originalSize.h ? limitSize : -1);
                size.h = (originalSize.w <= originalSize.h ? limitSize : -1);
            }
            imageSize.setImageSize(selectedImage, size);
        }
    };
};

export default {
    getEditableImage,
    resizing
};