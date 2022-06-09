export const template1 = (
  config = {
    name: '<b> < Tên sản phẩm > </b>',
    chip: '<b> < Chip > </b>',
    ram: '<b> < Ram > </b>',
    rom: '<b> < Rom > </b>',
    color: '<b> < Màu sắc > </b>',
    description: '<b> < Mô tả chi tiết > </b>',
  },
) => {
  const { name, ram, chip, rom, color, description } = config;
  return `
${name} - Mới cứng như mới bóc seal
Chip: ${chip}
ram: ${ram}
rom: ${rom}
Màu sắc: ${color}
${description}
#Muaban #Dienthoai
    `;
};

export const templateClothes = (
  config = {
    name: '<b> < Tên sản phẩm > </b>',
    exportPrice: '<b> < Giá > </b>',
    description: '<b> < Mô tả > </b>',
  },
) => {
  const { name, exportPrice, description } = config;
  return `
🎉🎉🎉 HOT HOT HOT 🎉🎉🎉
Hàng mới về: ${name} 
${description}
Giá sản phẩm: ${exportPrice}
#Muaban #Quanao
    `;
};
