export const getTagList = (tagList: string) => {
  const newTagList = tagList.split(',');
  const appendTagKeyList = newTagList.map((tagName: string) => {
    return { tag: tagName };
  });
  return appendTagKeyList;
};

export const getPostImageList = (files: {
  [fieldname: string]: Express.Multer.File[];
}) => {
  const fileArray: any = files;
  const postImages: Array<string> = [];
  fileArray.map((data: any) => postImages.push(data.location));
  return postImages;
};
