console.log('Js is working');
$(document).ready(pageReady);
let monthlyCost = 0;
let employeeList = [];//list of all employees
let dataID = 0;
let dataArray =[];

class Employee{
    constructor(firstName, lastName, idNumber, jobTitle, annualSalary){
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.jobTitle = jobTitle;
        this.annualSalary = annualSalary;
    }
}//employee class, template for every employee

function clickHandler(){
    $('#submit').on('click', submitEmployee);
    $('#tablebody').on('click','.delete', deleteEmployee );
}//handles click events

function submitEmployee(){
    if ($('#firstName').val()!=''&& $('#lastName').val()!= ''&& $('#idNumber').val()!=''&& $('#jobTitle').val()!=''&& $('#annualSalary').val()!='') {
        let enteredEmployee = new Employee($('#firstName').val(), $('#lastName').val(), $('#idNumber').val(), $('#jobTitle').val(), $('#annualSalary').val());
        addToDom(enteredEmployee);
        employeeList.push(enteredEmployee);
        $('#firstName').attr('placeholder', 'Insert First Name');
        $('#lastName').attr('placeholder', 'Insert Last Name');
        $('#idNumber').attr('placeholder', 'Insert ID');
        $('#jobTitle').attr('placeholder', 'Insert Job Title');
        $('#annualSalary').attr('placeholder', 'Insert Annual Salary');
    }
    else{ //notifies you which fields need to have more information in order to create new employee.
        console.log('not enough information');
        $('#firstName').attr('placeholder', 'missing information');
        $('#lastName').attr('placeholder', 'missing information');
        $('#idNumber').attr('placeholder', 'missing information');
        $('#jobTitle').attr('placeholder', 'missing information');
        $('#annualSalary').attr('placeholder', 'missing information');
    }
}//creates new employee, sends it to addToDom function and pushes new employee to employee array

function addToDom(employee){
    console.log('in addToDom');
    let $row = $('<tr class="'+dataID+'"></tr>'); //sets class to dataID which iterates. allows me to use .hasClass to match deleted row to value to subtract from monthly costs
    dataID++;
    $row.append('<td>'+employee.firstName+'</td>');
    $row.append('<td>'+employee.lastName+'</td>');
    $row.append('<td>'+employee.idNumber+'</td>');
    $row.append('<td>'+employee.jobTitle+'</td>');
    $row.append('<td>'+employee.annualSalary+'</td>');
    $row.append('<td><button class="delete">delete employee</button></td>');
    //$('button').data('salary', employee.annualSalary);
    dataArray.push(employee.annualSalary);//pushes annualSalary to the dataarray
    $('#tablebody').append($row); //adds above elements to table row element within the $row variable then appends them to tablebody
    monthlyCost += (parseInt(employee.annualSalary)/12);
    calculateMonthlyCostColor();//sends annual salary to function which evaluates the total monthly cost and assigns warning color
    displayMonthlyCost();//pulls the new monthly cost which was set by calculateMonthlyCost and displays it on the dom
    clearInputs();//clears all input fields
}

function calculateMonthlyCostColor(){
    //assigns new monthly cost value, global variable
    if (monthlyCost > 20000) {
        $('#monthlyCost').addClass('excessivecost');  
    }//adds red color when cost is too high
    else if (monthlyCost < 20000) {
        $('#monthlyCost').removeClass('excessivecost');
    }//removes red color when cost is not too high
}

function clearInputs(){
    $('#firstName').val('');
    $('#lastName').val('');
    $('#idNumber').val('');
    $('#jobTitle').val('');
    $('#annualSalary').val('');
}//clears all input fields

function deleteEmployee() {
    let i = 0; //value to interate thru in loop
    while ($(this).closest('tr').hasClass(''+i+'') === false) {
        console.log('in while');    
        i++;
    }//compares values in array to the class of the closest tr. once if finds the the matching class, it uses that array value 
    monthlyCost -= dataArray[i]/12; //to find the corresponding employee salary in dataarray
    calculateMonthlyCostColor();
    displayMonthlyCost();//update dom info and color
    $(this).closest('tr').remove(); //removes employee row
}

function pageReady(){
    console.log('jq is working');
    clickHandler();
} 

function displayMonthlyCost(){
    if (monthlyCost<.01) {
        monthlyCost=0;
    }
    $('#monthlyCost').empty();;
    $('#monthlyCost').append('Monthly Costs: $'+monthlyCost.toFixed(2));
}//checks if monthlyCost is a small number < 1 and sets it to 0 if it is
//then empties the monthly cost value at the bottom and appends the new value.



//notes
//shouldve deleted employees that were deleted from the array as well
//shouldve used the array to calculate the monthly cost
//therefore, whenever an employee was deleted from the array, and monthly cost can be recalculated and redisplayed
//without the need for all these crazy variable craps
//use .data with data-id="'data'" in the html section
