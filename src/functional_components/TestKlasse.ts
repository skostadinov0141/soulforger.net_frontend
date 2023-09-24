export default class TestKlasse{
    value1: number = 0;
    value2: number = 0;
    result: number = 0;

    AddNumbers() {
        this.result = this.value1 + this.value2;
    }
    SubtractNumbers() {
        this.result = this.value1 - this.value2;
    }
    MultiplyNumbers() {
        this.result = this.value1 * this.value2;
    }
    DivideNumbers() {
        if(this.value2 != 0) this.result = this.value1 / this.value2;
        else this.result = NaN
    }
}