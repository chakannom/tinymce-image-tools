const getParams = (editor): any => {
  const params = editor.getParam('cks_image_params', {});
  return params ? params : undefined;
};

const getToolbarItems = (editor): string => {
  return editor.getParam('cks_imagetools_toolbar', 'small middle large original');
};

const getImgproxyUrl = (editor): string => {
  return getParams(editor).imgproxy_url;
};

const getImgproxyKey = (editor): string => {
  return getParams(editor).imgproxy_key;
};

const getImgproxySalt = (editor): string => {
  return getParams(editor).imgproxy_salt;
};

export {
  getToolbarItems,
  getImgproxyUrl,
  getImgproxyKey,
  getImgproxySalt
};