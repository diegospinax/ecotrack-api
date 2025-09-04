export abstract class UserField<T> {
  value: T

  constructor(value: T) {
    this.value = value;
    this.validate();
  }

  public validate() {}
}