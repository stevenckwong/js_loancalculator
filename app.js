document.getElementById('loan-form').addEventListener('submit', calculateResults);



function calculateResults(e) {
    hideResults();
    showLoading();

    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthlyRepayment = document.getElementById('monthly-repayment');
    const UItotalRepayment = document.getElementById('total-repayment');
    const UItotalInterest = document.getElementById('total-interest');

    const principal = parseFloat(UIamount.value);
    const monthlyInterest = (parseFloat(UIinterest.value) / 100) / 12;
    const tenureMonths = parseInt(UIyears.value) * 12;

    // calculate monthly repayment
    const x = Math.pow(1 + monthlyInterest, tenureMonths);
    const monthlyRepayment = ((principal*x*monthlyInterest) / (x-1)).toFixed(2);

    if (isFinite(monthlyRepayment)) {
        // calculate total repayment
        const totalRepayment = (monthlyRepayment * tenureMonths).toFixed(2);
        // calculate total interest
        const totalInterest = (totalRepayment - principal).toFixed(2);

        UImonthlyRepayment.value = monthlyRepayment;
        UItotalRepayment.value = totalRepayment;
        UItotalInterest.value = totalInterest;

        setTimeout(function(){
            hideLoading();
            showResults();
            },2000)
        
    
    } else {
        setTimeout(function(){
            hideLoading();
            showError('Cannot calculate. Please check your numbers')
        },2000)
    }
    e.preventDefault();
}

function showError(message) {
    // create the error panel
    const errorPanel = document.createElement('div');
    errorPanel.className = 'alert alert-danger';
    errorPanel.appendChild(document.createTextNode(message));

    // insert the error panel before the Loan Calculator heading
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(errorPanel,heading);

    setTimeout(removeElem, 3000, errorPanel);
}

function removeElem(elem) {
    elem.remove();
}

function showLoading() {
    const loadingPanel = document.getElementById('loading');
    loadingPanel.style.display='block';
}

function hideLoading() {
    const loadingPanel = document.getElementById('loading');
    loadingPanel.style.display='none';
}

function showResults() {
    const resultsPanel = document.getElementById('results');
    resultsPanel.style.display = 'block';

}

function hideResults() {
    const resultsPanel = document.getElementById('results');
    resultsPanel.style.display = 'none';
}

function showElem(elem) {
    elem.style.display='block';
}


