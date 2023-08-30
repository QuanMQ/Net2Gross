export const baseSalary = 1800000;
export const regionSalary = {
  region1: 4680000,
  region2: 4160000,
  region3: 3640000,
  region4: 3250000,
};
export const personalReductionRate = 11000000;
export const dependentReductionRate = 4400000;
export const socialInsuranceRate = 8 / 100;
export const healthInsuranceRate = 1.5 / 100;
export const unemploymentInsuranceRate = 1 / 100;
export const socialInsuranceRateForEmployer = 17.5 / 100;
export const healthInsuranceRateForEmployer = 3 / 100;
export const unemploymentInsuranceRateForEmployer = 1 / 100;
const taxLadder = {
  step1: {
    range: [0, 5000000],
    rate: 5 / 100,
    formula: function (income) {
      return income * this.rate;
    },
  },
  step2: {
    range: [5000000, 10000000],
    rate: 10 / 100,
    formula: function (income) {
      return income * this.rate - 250000;
    },
  },
  step3: {
    range: [10000000, 18000000],
    rate: 15 / 100,
    formula: function (income) {
      return income * this.rate - 750000;
    },
  },
  step4: {
    range: [18000000, 32000000],
    rate: 20 / 100,
    formula: function (income) {
      return income * this.rate - 1650000;
    },
  },
  step5: {
    range: [32000000, 52000000],
    rate: 25 / 100,
    formula: function (income) {
      return income * this.rate - 3350000;
    },
  },
  step6: {
    range: [52000000, 80000000],
    rate: 30 / 100,
    formula: function (income) {
      return income * this.rate - 5850000;
    },
  },
  step7: {
    range: [80000000, Infinity],
    rate: 35 / 100,
    formula: function (income) {
      return income * this.rate - 9850000;
    },
  },
};
const taxableIncomeLadder = {
  step1: {
    range: [0, 4750000],
    formula: function (income) {
      return income / 0.95;
    },
  },
  step2: {
    range: [4750000, 9250000],
    formula: function (income) {
      return (income - 250000) / 0.9;
    },
  },
  step3: {
    range: [9250000, 16050000],
    formula: function (income) {
      return (income - 750000) / 0.85;
    },
  },
  step4: {
    range: [16050000, 27250000],
    formula: function (income) {
      return (income - 1650000) / 0.8;
    },
  },
  step5: {
    range: [27250000, 42250000],
    formula: function (income) {
      return (income - 3250000) / 0.75;
    },
  },
  step6: {
    range: [42250000, 61850000],
    formula: function (income) {
      return (income - 5850000) / 0.7;
    },
  },
  step7: {
    range: [61850000, Infinity],
    formula: function (income) {
      return (income - 9850000) / 0.65;
    },
  },
};

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

export function insertComma(input) {
  const numStr = input.toString();
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

export function grossToNet(
  salaryInput,
  currency,
  exchangeRate,
  dependents,
  insurance,
  insuranceInput,
  region
) {
  let socialInsurance;
  let healthInsurance;
  let unemploymentInsurance;
  let socialInsuranceByEmployer;
  let healthInsuranceByEmployer;
  let unemploymentInsuranceByEmployer;
  let taxableIncome;
  let incomeTax;
  let grossSalary;
  let insuredSalary;
  function checkCurrency(num) {
    if (currency === "vnd") return Math.round(num);
    if (currency === "usd") return Math.round(num / exchangeRate);
  }

  if (currency === "vnd") {
    grossSalary = salaryInput;
    insuredSalary = insuranceInput;
  }
  if (currency === "usd") {
    grossSalary = salaryInput * exchangeRate;
    insuredSalary = insuranceInput * exchangeRate;
  }

  // *Insurance calculations
  if (insurance === "full") {
    socialInsurance =
      socialInsuranceRate *
      (grossSalary <= 20 * baseSalary ? grossSalary : 20 * baseSalary);
    healthInsurance =
      healthInsuranceRate *
      (grossSalary <= 20 * baseSalary ? grossSalary : 20 * baseSalary);
    unemploymentInsurance =
      unemploymentInsuranceRate *
      (grossSalary <= 20 * regionSalary[region]
        ? grossSalary
        : 20 * regionSalary[region]);

    socialInsuranceByEmployer =
      socialInsuranceRateForEmployer *
      (grossSalary <= 20 * baseSalary ? grossSalary : 20 * baseSalary);
    healthInsuranceByEmployer =
      healthInsuranceRateForEmployer *
      (grossSalary <= 20 * baseSalary ? grossSalary : 20 * baseSalary);
    unemploymentInsuranceByEmployer =
      unemploymentInsuranceRateForEmployer *
      (grossSalary <= 20 * regionSalary[region]
        ? grossSalary
        : 20 * regionSalary[region]);
  }
  if (insurance === "other") {
    socialInsurance =
      socialInsuranceRate *
      (insuredSalary <= 20 * baseSalary ? insuredSalary : 20 * baseSalary);
    healthInsurance =
      healthInsuranceRate *
      (insuredSalary <= 20 * baseSalary ? insuredSalary : 20 * baseSalary);
    unemploymentInsurance =
      unemploymentInsuranceRate *
      (insuredSalary <= 20 * regionSalary[region]
        ? insuredSalary
        : 20 * regionSalary[region]);

    socialInsuranceByEmployer =
      socialInsuranceRateForEmployer *
      (insuredSalary <= 20 * baseSalary ? insuredSalary : 20 * baseSalary);
    healthInsuranceByEmployer =
      healthInsuranceRateForEmployer *
      (insuredSalary <= 20 * baseSalary ? insuredSalary : 20 * baseSalary);
    unemploymentInsuranceByEmployer =
      unemploymentInsuranceRateForEmployer *
      (insuredSalary <= 20 * regionSalary[region]
        ? insuredSalary
        : 20 * regionSalary[region]);
  }

  // *Salary & Tax calculations
  const incomeBeforeTax =
    grossSalary - (socialInsurance + healthInsurance + unemploymentInsurance);
  const dependentReduction = dependents * dependentReductionRate;
  taxableIncome =
    incomeBeforeTax - (personalReductionRate + dependentReduction);
  if (taxableIncome > 0) {
    for (let step in taxLadder) {
      if (
        taxableIncome > taxLadder[step].range[0] &&
        taxableIncome <= taxLadder[step].range[1]
      ) {
        incomeTax = taxLadder[step].formula(taxableIncome);
        break;
      }
    }
  } else {
    taxableIncome = 0;
    incomeTax = 0;
  }
  const salaryOutput = incomeBeforeTax - incomeTax;

  // *Result outputs
  const results = {
    socialInsurance: checkCurrency(socialInsurance),
    healthInsurance: checkCurrency(healthInsurance),
    unemploymentInsurance: checkCurrency(unemploymentInsurance),
    employerPay: {
      socialInsuranceByEmployer: checkCurrency(socialInsuranceByEmployer),
      healthInsuranceByEmployer: checkCurrency(healthInsuranceByEmployer),
      unemploymentInsuranceByEmployer: checkCurrency(
        unemploymentInsuranceByEmployer
      ),
      total: checkCurrency(
        grossSalary +
          socialInsuranceByEmployer +
          healthInsuranceByEmployer +
          unemploymentInsuranceByEmployer
      ),
    },
    incomeBeforeTax: checkCurrency(incomeBeforeTax),
    personalReductionRate: checkCurrency(personalReductionRate),
    dependentReduction: checkCurrency(dependentReduction),
    taxableIncome: checkCurrency(taxableIncome),
    incomeTax: checkCurrency(incomeTax),
    salaryInputData: {
      vnd: currency === "vnd" ? salaryInput : salaryInput * exchangeRate,
      usd:
        currency === "usd"
          ? salaryInput
          : Math.round(salaryInput / exchangeRate),
    },
    salaryOutput: {
      vnd: Math.round(salaryOutput),
      usd: Math.round(salaryOutput / exchangeRate),
    },
  };
  return results;
}

export function netToGross(
  salaryInput,
  currency,
  exchangeRate,
  dependents,
  insurance,
  insuranceInput,
  region
) {
  let socialInsurance;
  let healthInsurance;
  let unemploymentInsurance;
  let socialInsuranceByEmployer;
  let healthInsuranceByEmployer;
  let unemploymentInsuranceByEmployer;
  let taxableIncome;
  let incomeTax;
  let netSalary;
  let insuredSalary;
  let salaryOutput;
  function checkCurrency(num) {
    if (currency === "vnd") return Math.round(num);
    if (currency === "usd") return Math.round(num / exchangeRate);
  }

  if (currency === "vnd") {
    netSalary = salaryInput;
    insuredSalary = insuranceInput;
  }
  if (currency === "usd") {
    netSalary = salaryInput * exchangeRate;
    insuredSalary = insuranceInput * exchangeRate;
  }

  // *Salary & Tax calculations
  const dependentReduction = dependents * dependentReductionRate;
  const incomeForConversion =
    netSalary - (personalReductionRate + dependentReduction);
  if (incomeForConversion > 0) {
    for (let step in taxableIncomeLadder) {
      if (
        incomeForConversion > taxableIncomeLadder[step].range[0] &&
        incomeForConversion <= taxableIncomeLadder[step].range[1]
      ) {
        taxableIncome = taxableIncomeLadder[step].formula(incomeForConversion);
        for (let step in taxLadder) {
          if (
            taxableIncome > taxLadder[step].range[0] &&
            taxableIncome <= taxLadder[step].range[1]
          ) {
            incomeTax = taxLadder[step].formula(taxableIncome);
            break;
          }
        }
        break;
      }
    }
  } else {
    taxableIncome = 0;
    incomeTax = 0;
  }
  const incomeBeforeTax = netSalary + incomeTax;
  salaryOutput = incomeBeforeTax / (1 - 10.5 / 100);
  if (insurance === "other") {
    salaryOutput =
      incomeBeforeTax +
      socialInsuranceRate *
        (insuredSalary <= 20 * baseSalary ? insuredSalary : 20 * baseSalary) +
      healthInsuranceRate *
        (insuredSalary <= 20 * baseSalary ? insuredSalary : 20 * baseSalary) +
      unemploymentInsuranceRate *
        (insuredSalary <= 20 * regionSalary[region]
          ? insuredSalary
          : 20 * regionSalary[region]);
  } else if (salaryOutput > 20 * regionSalary[region]) {
    salaryOutput =
      incomeBeforeTax +
      20 *
        ((socialInsuranceRate + healthInsuranceRate) * baseSalary +
          unemploymentInsuranceRate * regionSalary[region]);
  } else if (salaryOutput > 20 * baseSalary) {
    salaryOutput =
      (incomeBeforeTax +
        20 * baseSalary * (socialInsuranceRate + healthInsuranceRate)) /
      (1 - unemploymentInsuranceRate);
  }

  // *Insurance calculations
  if (insurance === "full") {
    socialInsurance =
      socialInsuranceRate *
      (salaryOutput <= 20 * baseSalary ? salaryOutput : 20 * baseSalary);
    healthInsurance =
      healthInsuranceRate *
      (salaryOutput <= 20 * baseSalary ? salaryOutput : 20 * baseSalary);
    unemploymentInsurance =
      unemploymentInsuranceRate *
      (salaryOutput <= 20 * regionSalary[region]
        ? salaryOutput
        : 20 * regionSalary[region]);

    socialInsuranceByEmployer =
      socialInsuranceRateForEmployer *
      (salaryOutput <= 20 * baseSalary ? salaryOutput : 20 * baseSalary);
    healthInsuranceByEmployer =
      healthInsuranceRateForEmployer *
      (salaryOutput <= 20 * baseSalary ? salaryOutput : 20 * baseSalary);
    unemploymentInsuranceByEmployer =
      unemploymentInsuranceRateForEmployer *
      (salaryOutput <= 20 * regionSalary[region]
        ? salaryOutput
        : 20 * regionSalary[region]);
  }
  if (insurance === "other") {
    socialInsurance =
      socialInsuranceRate *
      (insuredSalary <= 20 * baseSalary ? insuredSalary : 20 * baseSalary);
    healthInsurance =
      healthInsuranceRate *
      (insuredSalary <= 20 * baseSalary ? insuredSalary : 20 * baseSalary);
    unemploymentInsurance =
      unemploymentInsuranceRate *
      (insuredSalary <= 20 * regionSalary[region]
        ? insuredSalary
        : 20 * regionSalary[region]);

    socialInsuranceByEmployer =
      socialInsuranceRateForEmployer *
      (insuredSalary <= 20 * baseSalary ? insuredSalary : 20 * baseSalary);
    healthInsuranceByEmployer =
      healthInsuranceRateForEmployer *
      (insuredSalary <= 20 * baseSalary ? insuredSalary : 20 * baseSalary);
    unemploymentInsuranceByEmployer =
      unemploymentInsuranceRateForEmployer *
      (insuredSalary <= 20 * regionSalary[region]
        ? insuredSalary
        : 20 * regionSalary[region]);
  }

  // *Result outputs
  const results = {
    socialInsurance: checkCurrency(socialInsurance),
    healthInsurance: checkCurrency(healthInsurance),
    unemploymentInsurance: checkCurrency(unemploymentInsurance),
    employerPay: {
      socialInsuranceByEmployer: checkCurrency(socialInsuranceByEmployer),
      healthInsuranceByEmployer: checkCurrency(healthInsuranceByEmployer),
      unemploymentInsuranceByEmployer: checkCurrency(
        unemploymentInsuranceByEmployer
      ),
      total: checkCurrency(
        salaryOutput +
          socialInsuranceByEmployer +
          healthInsuranceByEmployer +
          unemploymentInsuranceByEmployer
      ),
    },
    incomeBeforeTax: checkCurrency(incomeBeforeTax),
    personalReductionRate: checkCurrency(personalReductionRate),
    dependentReduction: checkCurrency(dependentReduction),
    taxableIncome: checkCurrency(taxableIncome),
    incomeTax: checkCurrency(incomeTax),
    salaryInputData: {
      vnd: currency === "vnd" ? salaryInput : salaryInput * exchangeRate,
      usd:
        currency === "usd"
          ? salaryInput
          : Math.round(salaryInput / exchangeRate),
    },
    salaryOutput: {
      vnd: Math.round(salaryOutput),
      usd: Math.round(salaryOutput / exchangeRate),
    },
  };
  return results;
}
