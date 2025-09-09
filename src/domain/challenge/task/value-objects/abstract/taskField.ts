export abstract class TaskField<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
    this.validate();
  }
  public validate() {}
}
