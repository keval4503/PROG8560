const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    FRIES: Symbol('fries'),
    FRIES_SIZE: Symbol('fries_size'),
    FRIES_TOPPINGS: Symbol('fries_topping'),
    DRINKS:  Symbol("drinks"),
    DIPS: Symbol("dips"),
});

module.exports = class NachosOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "nachos";
        this.sItem2 = "";
        this.sFries_size = '';
        this.sFries_topping = '';
        this.sDips = '';
        this.sTotal_Price = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Keval's Nachos.");
                aReturn.push("What bowl size would you like to have?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                if(this.sSize.toLowerCase()=='small'){
                    this.sTotal_Price = this.sTotal_Price+10;
                } else if(this.sSize.toLowerCase()=='medium'){
                    this.sTotal_Price = this.sTotal_Price+15;
                } else if(this.sSize.toLowerCase()=='large'){
                    this.sTotal_Price = this.sTotal_Price+20;
                }
                aReturn.push("What toppings would you like to add to your nachos?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.FRIES
                this.sToppings = sInput;
                this.sTotal_Price = this.sTotal_Price+5;
                aReturn.push("Would you like to have Fries?");
                break;
            case OrderState.FRIES:
                if(sInput.toLowerCase() != "no"){
                    this.stateCur = OrderState.FRIES_SIZE;
                    this.sItem2 = 'FRIES';
                    this.sTotal_Price = this.sTotal_Price+15;
                    aReturn.push("What bowl size would you like to have of fries?");
                }else{
                    this.stateCur = OrderState.DIPS;
                    aReturn.push("Would you like to have Dips?");
                }
                break;
            case OrderState.FRIES_SIZE:
                this.stateCur = OrderState.FRIES_TOPPINGS;
                this.sFries_size = sInput;
                this.sTotal_Price = this.sTotal_Price+5;
                aReturn.push("What topping would you like to have on fries?");
                break;
            case OrderState.FRIES_TOPPINGS:
                this.stateCur = OrderState.DIPS;
                this.sTotal_Price = this.sTotal_Price+5;
                this.sFries_topping= sInput;
                aReturn.push("Would you like to have Dips?");
                break;
            case OrderState.DIPS:
                this.stateCur = OrderState.DRINKS;
                this.sTotal_Price = this.sTotal_Price+5;
                if(sInput.toLowerCase() != "no"){
                    this.sDips = sInput;
                }
                aReturn.push("Would you like to have Drinks?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sTotal_Price = this.sTotal_Price+6;
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings} Toppings`);
                if(this.sItem2){
                    aReturn.push(`${this.sFries_size} ${this.sItem2} with ${this.sFries_topping} Toppings`);
                }
                if(this.sDips){
                    aReturn.push(`Add On Dips ${this.sDips}`);
                }
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                if(this.sTotal_Price>0){
                    aReturn.push(`The total cost is: ${this.sTotal_Price}`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}