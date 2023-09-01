function fieldDisplay(){
    var countrySelected = document.getElementById('testCountry').value;
    if(countrySelected == 'USA'){
        document.getElementById('USA_field').style.display = block;
    }
    else{
        document.getElementById('IN_field').style.display = block;
    }
}