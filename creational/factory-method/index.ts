const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * max) + min;
};

enum BankType {
  TECHCOMBANK = 0,
  VIETCOMBANK = 1,
  TPBank = 2,
}

interface IBank {
  getName: () => string | null;
}

interface IBankFactory {
  createBank: () => IBank;
}

class TPBank implements IBank {
  public getName(): string {
    return 'TPBank';
  }
}

class VietcomBank implements IBank {
  public getName(): string {
    return 'VietcomBank';
  }
}

class TechcomBank implements IBank {
  public getName(): string {
    return 'TechcomBank';
  }
}

class BasicBankFactory implements IBankFactory {
  constructor() {}

  private index: number = 0;

  public createBank(): IBank {
    if (this.index === BankType.TECHCOMBANK) {
      this.index++;
      return new TechcomBank();
    } else if (this.index === BankType.VIETCOMBANK) {
      this.index++;
      return new VietcomBank();
    } else {
      this.index = 0;
      return new TPBank();
    }
  }
}

class RandomBankFactory {
  constructor() {}

  public createBank(): IBank {
    const type: number = randomNumber(0, 3);
    if (type === BankType.TECHCOMBANK) {
      return new TechcomBank();
    } else if (type === BankType.VIETCOMBANK) {
      return new VietcomBank();
    } else {
      return new TPBank();
    }
  }
}

(() => {
  const type: number = randomNumber(0, 101);

  let bank: IBankFactory;
  if (type % 2 === 0) {
    bank = new BasicBankFactory();
  } else {
    bank = new RandomBankFactory();
  }

  console.log(bank.createBank().getName());
  console.log(bank.createBank().getName());
  console.log(bank.createBank().getName());
  console.log(bank.createBank().getName());
  console.log(bank.createBank().getName());
  console.log(bank.createBank().getName());
})();
