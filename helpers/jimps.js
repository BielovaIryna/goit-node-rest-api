import jimp from 'jimp'

const jimp = async (img) => {
  const result = await jimp.read(img);
  await result.resize(250, 250).autocrop().write(img);
};