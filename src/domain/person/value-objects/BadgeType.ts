import { Type } from "@/domain/logros/badge/Type";
import { BadgeField } from "@/domain/logros/badge/value-objects/abstract/BadgeField";
import LogroValidationException from "@/domain/logros/exception/LogroValidationException";

export default class BadgeType extends BadgeField<Type> {
  constructor(value: Type) {
    super(value);
  }
  public validate(): void {
    if (!this.value)
      throw new LogroValidationException("Invalidate badge type provided.");
  }
}
