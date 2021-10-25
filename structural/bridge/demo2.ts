namespace BridgePattern {
  interface Account {
    openAccount: () => void;
  }

  class CheckingAccount implements Account {
    openAccount() {
      console.log('Checking account');
    }
  }

  class SavingAccount implements Account {
    openAccount() {
      console.log('Saving account');
    }
  }

  abstract class Bank {
    protected account: Account;

    constructor(account: Account) {
      this.account = account;
    }

    abstract openAccount: () => void;
  }

  class VietcomBank extends Bank {
    constructor(account: Account) {
      super(account);
    }

    openAccount = () => {
      console.log('Open account at Vietcombank is a');
      this.account.openAccount();
    };
  }

  class TechcomBank extends Bank {
    constructor(account: Account) {
      super(account);
    }

    openAccount = () => {
      console.log('Open account at Techcombank is a');
      this.account.openAccount();
    };
  }

  function main() {
    const vietcomBank = new VietcomBank(new CheckingAccount());
    vietcomBank.openAccount();

    const techcomBank = new TechcomBank(new CheckingAccount());
    techcomBank.openAccount();
  }

  main();
}
