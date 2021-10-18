namespace PrototypePattern1 {
  class Computer {
    private os: string;
    private office: string;
    private antivirus: string;
    private browser: string;
    private others: string;

    constructor(
      os: string,
      office: string,
      antivirus: string,
      browser: string,
      others: string
    ) {
      this.os = os;
      this.office = office;
      this.antivirus = antivirus;
      this.browser = browser;
      this.others = others;
    }

    public clone(): this {
      try {
        const clone = Object.create(this);
        clone.os = this.os;
        clone.office = this.office;
        clone.antivirus = this.antivirus;
        clone.browser = this.browser;
        clone.others = this.others;
        return clone;
      } catch (err) {
        throw err;
      }
    }

    public setOthers(others: string) {
      this.others = others;
    }

    public toString(): string {
      return (
        'Computer [os=' +
        this.os +
        ', office=' +
        this.office +
        ', antivirus=' +
        this.antivirus +
        ', browser=' +
        this.browser +
        ', others=' +
        this.others +
        ']'
      );
    }
  }

  const clientCode = () => {
    const computer1 = new Computer(
      'Window 10',
      'Word 2013',
      'BKAV',
      'Chrome v69',
      'Skype'
    );
    const computer2 = computer1.clone();
    computer2.setOthers('Skype, Teamviewer, FileZilla Client');

    console.log('computer1: ', computer1.toString());
    console.log('computer2: ', computer2.toString());
  };

  clientCode();
}
