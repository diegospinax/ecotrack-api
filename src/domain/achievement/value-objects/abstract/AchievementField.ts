export abstract class AchievementField<T>{
    value: T
    constructor(value:T){
        this.value = value;
        this.validate();
    }
    public validate(){}
}