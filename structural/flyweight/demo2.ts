namespace FlyweightPattern {
  interface ISoldier {
    promote(context: Context): void;
  }

  class Context {
    private id: string;
    private star: number;
    constructor(id: string, star: number) {
      this.id = id;
      this.star = star;
    }

    getId(): string {
      return this.id;
    }

    getStar(): number {
      return this.star;
    }
  }

  class Soldier implements ISoldier {
    private name: string; // Intrinsic State

    constructor(name: string) {
      this.name = name;
      console.log('Soldier is created - ', name);
    }

    promote(context: Context): void {
      console.log(
        `${this.name} ${context.getId()} promoted ${context.getStar()}`
      );
    }
  }

  class SoldierFactory {
    private static soldiers: {
      [name: string]: ISoldier;
    } = {};

    constructor() {
      console.log('Initial SoldierFactory');
    }

    getSoldiers(): any {
      return SoldierFactory.soldiers;
    }

    setSoldiers(name: string, soldier: ISoldier): void {
      SoldierFactory.soldiers[name] = soldier;
    }

    async createSoldier(name: string): Promise<ISoldier> {
      let soldier: ISoldier = SoldierFactory.soldiers[name];
      if (!soldier) {
        await this.waitingForCreateSoldier(3000);
        soldier = new Soldier(name);
        SoldierFactory.soldiers[name] = soldier;
      }
      return soldier;
    }

    getTotalOfSoldiers() {
      return Object.keys(SoldierFactory.soldiers).length;
    }

    waitingForCreateSoldier(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  }

  function getObjectLength(obj: any) {
    return Object.keys(obj).length;
  }

  async function createSoldier(
    soldierFactory: SoldierFactory,
    quantity: number,
    name: string,
    star: number
  ) {
    const arr = new Array(quantity).fill(0);

    for await (const i of arr) {
      const id = `Soldier ${getObjectLength(soldierFactory.getSoldiers()) + 1}`;
      const context = new Context(id, star);
      const soldier = await soldierFactory.createSoldier(name);
      soldier.promote(context);
      soldierFactory.setSoldiers(name, soldier);
    }
  }

  async function main() {
    const start = Date.now();
    const soldierFactory = new SoldierFactory();
    await createSoldier(soldierFactory, 5, 'Yuri', 1);
    await createSoldier(soldierFactory, 5, 'Spy', 1);
    await createSoldier(soldierFactory, 3, 'Spy', 3);
    await createSoldier(soldierFactory, 2, 'Yuri', 2);

    const timeWork = Math.floor((Date.now() - start) / 1000);
    console.log('-------------------------');
    console.log(`Total time worked : ${timeWork} seconds`);
    console.log(
      'Total soldiers made : ' + getObjectLength(soldierFactory.getSoldiers())
    );
    console.log(
      'Total type of soldiers made : ' + soldierFactory.getTotalOfSoldiers()
    );
  }

  main();
}
