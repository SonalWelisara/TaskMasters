export class Feedback {
    fid!: number;
    employeeId: number;
    feedback: string;
  
    constructor(employeeId: number, feedback: string) {
      this.employeeId = employeeId;
      this.feedback = feedback;
    }
  }
  