import { Option } from '@ephox/katamari';
import { SelectorFind, Element } from '@ephox/sugar';
import { atob } from '@ephox/dom-globals';

import * as Settings from '../api/Settings';
import Imgproxy from './Imgproxy';
import ImageSize from './ImageSize';

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
    return imgOpt.map((img) => isEditable(img.dom()) ? Option.some(img.dom()) : Option.none());
  }
  return isEditable(elem) ? Option.some(elem) : Option.none();
};

const displayError = function (editor, error) {
  editor.notificationManager.open({
    text: error,
    type: 'error'
  });
};

const getSelectedImage = (editor): Option<Element> => {
  const elem = editor.selection.getNode();
  if (isFigure(editor, elem)) {
    return getFigureImg(elem);
  } else {
    return Option.some(Element.fromDom(elem));
  }
};

const getImgproxySettings = function (editor) {
  return {
      url: Settings.getImgproxyUrl(editor),
      key: Settings.getImgproxyKey(editor),
      salt: Settings.getImgproxySalt(editor)
  };
};

const isUseImgproxy = function (editor, img) {
  const imgproxySettings = getImgproxySettings(editor);
  if (typeof imgproxySettings.url === 'undefined'
      || typeof imgproxySettings.key === 'undefined'
      || typeof imgproxySettings.salt === 'undefined') {
    return false;
  } else if (img.src.indexOf(imgproxySettings.url) !== 0) {
    return false;
  }
  return true;
};

const getOriginalImageUrlFromImgproxyUrl = (src: string) => {
    return atob(src.slice(src.lastIndexOf('/') + 1, src.lastIndexOf('.')));
};

const resizing = function (editor, limitSize) {
  return function () {
    const imgOpt = getSelectedImage(editor);
    return imgOpt.fold(() => {
      displayError(editor, 'Could not find selected image');
    }, (img) => {
      const selectedImageElement = img.dom();
      if (isUseImgproxy(editor, selectedImageElement)) {
        const src = getOriginalImageUrlFromImgproxyUrl(selectedImageElement.src);
        const enlarge = limitSize < 1600 ? 1 : 0;
        selectedImageElement.src = Imgproxy.createImgproxySignatureUrl('fit', limitSize, limitSize, 'ce', enlarge, src, 'png', getImgproxySettings(editor));
      } else {
        const originalSize = ImageSize.getNaturalImageSize(selectedImageElement);
        const size = {w: originalSize.w, h: originalSize.h};
        if (limitSize < 1600) {
          size.w = (originalSize.w >= originalSize.h ? limitSize : -1);
          size.h = (originalSize.w <= originalSize.h ? limitSize : -1);
        }
        ImageSize.setImageSize(selectedImageElement, size);
      }
      return selectedImageElement;
    });
  };
};

export default {
  getEditableImage,
  resizing
};