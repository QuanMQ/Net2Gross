export const regions = {
  region1: [
    "Hanoi",
    "Quang Ninh",
    "Da Nang",
    "Ho Chi Minh City",
    "Binh Duong",
    "Dong Nai",
    "Ba Ria-Vung Tau",
  ],
  region2: [
    "Haiphong",
    "Vinh Phuc",
    "Thai Nguyen",
    "Khanh Hoa",
    "Binh Phuoc",
    "Tay Ninh",
    "Long An",
    "An Giang",
    "Can Tho",
    "Ca Mau",
  ],
  region3: [
    "Bac Ninh",
    "Hai Duong",
    "Hung Yen",
    "Thua Thien Hue",
    "Binh Dinh",
    "Gia Lai",
    "Dak Lak",
    "Lam Dong",
    "Ninh Thuan",
    "Binh Thuan",
    "Dong Thap",
    "Tien Giang",
    "Vinh Long",
    "Ben Tre",
    "Kien Giang",
    "Hau Giang",
    "Soc Trang",
    "Bac Lieu",
  ],
  region4: "Other",
};

regions.all = regions.region1.concat(regions.region2, regions.region3).sort();
regions.all.push(regions.region4);
regions.all = regions.all.map((region, index) => ({
  id: index.toString(),
  title: region,
}));

export function insertComma(numStr) {
  if (numStr && numStr.length > 3) {
    const numArr = numStr
      .split("")
      .filter((num) => num !== ",")
      .reverse();
    const newArr = [];
    let counter = 0;
    numArr.forEach((digit, index, arr) => {
      counter++;
      newArr.push(digit);
      if (counter === 3 && arr[index + 1]) {
        newArr.push(",");
        counter = 0;
      }
    });
    const result = newArr.reverse().join("");
    return result;
  } else {
    return numStr;
  }
}

export function filterRegion(province) {
  if (!province) return "region1";

  for (let region in regions) {
    if (regions[region].includes(province)) return region;
  }
}
