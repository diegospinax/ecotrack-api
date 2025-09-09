export abstract class PersonField<T> {
  value: T

  constructor(value: T) {
    this.value = value;
    this.validate();
  }

  public validate() {}
}