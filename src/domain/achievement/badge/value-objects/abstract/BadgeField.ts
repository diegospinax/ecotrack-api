export abstract class BadgeField<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
    this.validate();
  }
  public validate() {};
}
