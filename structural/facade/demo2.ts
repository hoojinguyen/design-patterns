namespace FacadePattern {
  class AccountService {
    public getAccount(email: string) {
      console.log('Getting the account of ', email);
    }
  }

  class PaymentService {
    public paymentByPaypal() {
      console.log('Payment by Paypal');
    }

    public paymentByCreditCard() {
      console.log('Payment by Credit card');
    }

    public paymentByEBanking() {
      console.log('Payment by EBanking');
    }

    public paymentByCash() {
      console.log('Payment by Cash');
    }
  }

  class ShippingService {
    public freeShipping() {
      console.log('Free Shipping');
    }

    public standardShipping() {
      console.log('Standard Shipping');
    }

    public expressShipping() {
      console.log('Express Shipping');
    }
  }

  class EmailService {
    public sendMail(mailTo: string) {
      console.log('Sending an email to ', mailTo);
    }
  }

  class SmsService {
    public sendSMS(mobilePhone: string) {
      console.log('Sending an message to ', mobilePhone);
    }
  }

  class ShopFacade {
    private static INSTANCE: ShopFacade = new ShopFacade();

    private accountService: AccountService;
    private paymentService: PaymentService;
    private shippingService: ShippingService;
    private emailService: EmailService;
    private smsService: SmsService;

    private constructor() {
      this.accountService = new AccountService();
      this.paymentService = new PaymentService();
      this.shippingService = new ShippingService();
      this.emailService = new EmailService();
      this.smsService = new SmsService();
    }

    public static getInstance(): ShopFacade {
      return this.INSTANCE;
    }

    public buyProductByCashWithFreeShipping(email: string) {
      this.accountService.getAccount(email);
      this.paymentService.paymentByCash();
      this.shippingService.freeShipping();
      this.emailService.sendMail(email);
      console.log('DONE\n');
    }

    public buyProductByPaypalWithStandardShipping(
      email: string,
      mobilePhone: string
    ) {
      this.accountService.getAccount(email);
      this.paymentService.paymentByPaypal();
      this.shippingService.standardShipping();
      this.emailService.sendMail(email);
      this.smsService.sendSMS(mobilePhone);
      console.log('DONE\n');
    }
  }

  function main() {
    ShopFacade.getInstance().buyProductByCashWithFreeShipping(
      'vanhoinguyen98@gmail.com'
    );
    ShopFacade.getInstance().buyProductByPaypalWithStandardShipping(
      'vanhoinguyen98@gmail.com',
      '0389456021'
    );
  }

  main();
}
