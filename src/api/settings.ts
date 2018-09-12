const getParams = function (editor) {
    const params = editor.getParam('ckn_image_params', {});
    return params ? params : undefined
}

const getToolbarItems = (editor): string => {
    return editor.getParam('cks_imagetools_toolbar', 'small middle large original');
};

const getImgproxyUrl = function (editor) {
    return getParams(editor)['imgproxy_url'];
};

const getImgproxyKey = function (editor) {
    return getParams(editor)['imgproxy_key'];
};

const getImgproxySalt = function (editor) {
    return getParams(editor)['imgproxy_salt'];
};

export {
    getToolbarItems,
    getImgproxyUrl,
    getImgproxyKey,
    getImgproxySalt
};