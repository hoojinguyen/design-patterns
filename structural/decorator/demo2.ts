namespace DecoratorPatter {
  interface EmployeeComponent {
    getName: () => string;
    doTask: () => void;
    join: (joinDate: Date) => void;
    terminate: (terminateDate: Date) => void;
    formatDate: (date: Date) => string;
    showBasicInformation: () => void;
  }

  class EmployeeConcreteComponent implements EmployeeComponent {
    private name: string;

    constructor(name: string) {
      this.name = name;
    }

    public getName() {
      return this.name;
    }

    public join(joinDate: Date) {
      console.log(this.getName() + ' joined on ' + this.formatDate(joinDate));
    }

    public terminate(terminateDate: Date) {
      console.log(
        this.getName() + ' terminated on ' + this.formatDate(terminateDate)
      );
    }

    public showBasicInformation() {
      console.log('-------');
      console.log('The basic information of ' + this.getName());

      const date = new Date();
      const terminateDate = new Date(date.setMonth(date.getMonth() + 6));

      this.join(new Date());
      this.terminate(terminateDate);
    }

    public formatDate(date: Date) {
      let d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [day, month, year].join('/');
    }

    public doTask() {}
  }

  abstract class EmployeeDecorator implements EmployeeComponent {
    public employee: EmployeeComponent;

    constructor(employee: EmployeeComponent) {
      this.employee = employee;
    }

    public getName() {
      return this.employee.getName();
    }

    public join(joinDate: Date) {
      return this.employee.join(joinDate);
    }

    public terminate(terminateDate: Date) {
      return this.employee.terminate(terminateDate);
    }

    public showBasicInformation() {
      return this.employee.showBasicInformation();
    }

    public formatDate(date: Date) {
      return this.employee.formatDate(date);
    }

    public doTask() {
      return this.employee.doTask();
    }
  }

  class Manager extends EmployeeDecorator {
    constructor(employee: EmployeeComponent) {
      super(employee);
    }

    public createRequirement() {
      console.log(this.employee.getName() + ' is create requirements.');
    }

    public assignTask() {
      console.log(this.employee.getName() + ' is assigning tasks.');
    }

    public manageProgress() {
      console.log(this.employee.getName() + ' is managing the progress.');
    }

    public doTask() {
      this.employee.doTask();
      this.createRequirement();
      this.assignTask();
      this.manageProgress();
    }
  }

  class TeamLeader extends EmployeeDecorator {
    constructor(employee: EmployeeComponent) {
      super(employee);
    }

    public planing() {
      console.log(this.employee.getName() + ' is planing.');
    }

    public motivate() {
      console.log(this.employee.getName() + ' is motivating his members.');
    }

    public monitor() {
      console.log(this.employee.getName() + ' is monitoring his members.');
    }

    public doTask() {
      this.employee.doTask();
      this.planing();
      this.motivate();
      this.monitor();
    }
  }

  class TeamMember extends EmployeeDecorator {
    constructor(employee: EmployeeComponent) {
      super(employee);
    }

    public reportTask() {
      console.log(
        this.employee.getName() + ' is reporting his assigned tasks.'
      );
    }

    public coordinateWithOthers() {
      console.log(
        this.employee.getName() +
          ' is coordinating with other members of his team.'
      );
    }

    public doTask() {
      this.employee.doTask();
      this.reportTask();
      this.coordinateWithOthers();
    }
  }

  function main() {
    console.log('NORMAL EMPLOYEE: ');
    const employee = new EmployeeConcreteComponent('Yan Tee');
    employee.showBasicInformation();
    employee.doTask();

    console.log('\nTEAM LEADER: ');
    const teamLeader = new TeamLeader(employee);
    teamLeader.showBasicInformation();
    teamLeader.doTask();

    console.log('\nMANAGER: ');
    const manager = new Manager(employee);
    manager.showBasicInformation();
    manager.doTask();

    console.log('\nTEAM LEADER AND MANAGER: ');
    const teamLeaderAndManager = new Manager(teamLeader);
    teamLeaderAndManager.showBasicInformation();
    teamLeaderAndManager.doTask();
  }

  main();
}
