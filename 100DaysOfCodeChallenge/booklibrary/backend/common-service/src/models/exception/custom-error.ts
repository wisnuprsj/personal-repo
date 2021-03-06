import { Kpi } from "../../service/kpi/types/kpi-types";
import { Completion } from "../enums/completion";

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract errorName: string;
  abstract kpi: Kpi;
  abstract serviceName: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract generateErrors(): {
    status: Completion;
    code: number;
    message: string;
    field?: any;
  };
}
