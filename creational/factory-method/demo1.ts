namespace FactoryMethod {
  interface ITransport {
    deliver: () => string;
  }

  class Truck implements ITransport {
    constructor() {}

    public deliver(): string {
      return 'Delivery by land with truck';
    }
  }

  class MotorBike implements ITransport {
    constructor() {}

    public deliver(): string {
      return 'Delivery by land with motorbike';
    }
  }

  class Ship implements ITransport {
    constructor() {}

    public deliver(): string {
      return 'Delivery by sea with ship';
    }
  }

  interface ILogistics {
    wheel?: number;
    createTransport: () => ITransport;
  }

  class RoadLogistics implements ILogistics {
    private _wheel: number;

    constructor(wheel = 4) {
      this._wheel = wheel;
    }

    public createTransport() {
      if (this._wheel === 4) {
        return new Truck();
      } else {
        return new MotorBike();
      }
    }
  }

  class SeaLogistics implements ILogistics {
    constructor() {}
    public createTransport() {
      return new Ship();
    }
  }

  (() => {
    const randomNumber = (min: number, max: number): number => {
      return Math.floor(Math.random() * max) + min;
    };

    const type = randomNumber(0, 101);
    const wheel = type % 4 === 0 ? 4 : 2;
    const transport =
      type % 2 === 0 ? new RoadLogistics(wheel) : new SeaLogistics();

    console.log(transport.createTransport().deliver());
  })();
}
