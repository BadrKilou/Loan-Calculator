// List for submit

document.getElementById('loan-form').addEventListener('submit', function(e){
    
    // Hide Results
    document.getElementById('results').style.display = 'none';


    // SHOW Loader
    document.getElementById('loading').style.display = 'block';
    
    setTimeout(CalculateResults,2000)
    
    e.preventDefault()
});

function CalculateResults(){
    
    // Vars UI
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
     monthlyPayment.value = monthly.toFixed(2);
     totalPayment.value = (monthly * calculatedPayments).toFixed(2);
     totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
      // Show Results
     document.getElementById('results').style.display = 'block';
     // Hide Loader
     document.getElementById('loading').style.display = 'none';
    }else{
    showError('Please Check your Number');
    }
 
}

function showError(error){
    // Hide Results
    document.getElementById('results').style.display = 'none';
    // Hide Loader
    document.getElementById('loading').style.display = 'none';
   
    const errorDiv = document.createElement('div');
    // Get Elements
    
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error))

    // Insert error above heading
    card.insertBefore(errorDiv,heading);

    setTimeout(clearError,3000)

    function clearError(){
        document.querySelector('.alert').remove()
    }

}

