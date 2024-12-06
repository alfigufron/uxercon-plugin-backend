import { ErrorHandler } from "@config/http";
import { HTTPCode } from "@global/constant/http.constant";
import {
  Schema,
  ValidationResult,
  ValidationError as JoiValidationError,
} from "joi";

type TErrorResponse = {
  field: string;
  message: string;
};

export type TQueryValidatorOptions = {
  throwError?: boolean;
};

export class ValidationMiddleware {
  private static formatQueryErrors(
    errors: JoiValidationError
  ): TErrorResponse[] {
    return errors.details.map(error => {
      const { context, message } = error;

      return {
        field: context.key,
        message: message.replace(
          /"(\w+)"/,
          (match, p1) => p1.charAt(0).toUpperCase() + p1.slice(1)
        ),
      };
    });
  }

  static validateQuery<T>(
    query: unknown,
    schema: Schema,
    options: TQueryValidatorOptions = { throwError: true }
  ): T {
    const validationResult: ValidationResult<T> = schema.validate(query, {
      abortEarly: false,
    });

    const { error, value: result }: { error: JoiValidationError; value: T } =
      validationResult;

    if (options.throwError && error) {
      throw new ErrorHandler(
        "Validation Error",
        ValidationMiddleware.formatQueryErrors(error),
        HTTPCode.ValidationError
      );
    }

    return result;
  }
}
