 const phoneInput = document.getElementById('phone');
        const otpSection = document.getElementById('otp-section');
        const signupForm = document.getElementById('signup-form');
        const otpForm = document.getElementById('otp-form');
        // Use same origin when page is served by this app, or set window.OTP_API_BASE to override
        const apiUrl = (typeof window !== 'undefined' && window.OTP_API_BASE) ? window.OTP_API_BASE : '/phone-verification';
        function getClientName() { return (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('client_name')) || 'MCINNES'; }

        function validatePhoneNumber(phone) {
            return /^\+[1-9]\d{1,14}$/.test(phone);
        }

        function validateOTP(otp) {
            return /^\d{4,6}$/.test(otp);
        }

        function showLoading(isLoading) {
            // Implement this function to show/hide a loading indicator
        }

        function showError(message) {
            alert(message);
        }

        function sendOTP( ) 
        {
                const phoneNumber = phoneInput.value;

            if (!validatePhoneNumber(phoneNumber)) {
                showError('Please enter a valid phone number.');
                return;
    }

    showLoading(true);
    
    fetch(`${apiUrl}/send-otp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone: phoneNumber,
            clientName: getClientName()
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        showLoading(false);
        if (data.success) {
            signupForm.style.display = 'none';
            otpSection.style.display = 'block';
        } else {
            showError(data.error || 'Failed to send OTP. Please try again.');
        }
    })
    .catch(error => {
        showLoading(false);
        console.error('Error:', error);
        showError('An error occurred. Please try again later.');
    });
}


function verifyOTP() 
{
    const otp = document.getElementById('otp').value;
    const phoneNumber = phoneInput.value;

    if (!validateOTP(otp)) {
        showError('Please enter a valid OTP.');
        return;
    }

    showLoading(true);

    fetch(`${apiUrl}/verify-otp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone: phoneNumber,
            otp: otp,
            clientName: getClientName()
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        showLoading(false);
        if (data.success) {
          //  window.location.href = '/thank-you';\

            //send data to zapier
            sendVarifiedDataToZapier();

        } else {
            showError(data.error || 'Invalid OTP. Please try again.');
        }
    })
    .catch(error => {
        showLoading(false);
        console.error('Error:', error);
        showError('An error occurred. Please try again later.');
    });

}




function sendVarifiedDataToZapier()
  { 
         var  varifiedPhoneNumber =    $("#phone").val();
        var zapierURL =  sessionStorage.getItem("zapierURL" )
        
       // console.log( "zapierURL = " + zapierURL ) ; 
        
      //    console.log(" next page url = " +    sessionStorage.getItem//("nextPageURL") )
         
         
            
        var postdata =  JSON.parse( sessionStorage.getItem("zapierPostData" )) ;

        postdata.refId = sessionStorage.getItem("recordID");
        
        postdata.phone = varifiedPhoneNumber ; 
        postdata.PhonNo = varifiedPhoneNumber ; 
        postdata.varifiedPhoneNumber = varifiedPhoneNumber;
        postdata.tag = "verified quote" ;  
     // console.log(  postdata ) 
 

        fetch(zapierURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postdata)
        })
        .then(() => {
            console.log('Session data sent to webhook successfully');
           
            window.location.href =  sessionStorage.getItem("nextPageURL"); 

        })
        .catch(error => {
            console.error('Error sending session data to webhook:', error);
        }); 

  }


 

