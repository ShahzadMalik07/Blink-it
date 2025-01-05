const forgotPasswordTemplate = ({ name, otp }) => {
    return `
     
     <div>
    <p>Dear, ${name}</p>
    <p>You are requested a password reset. please use following OTP code to reset your password.</p>
    <div style="background:yellow; font-size:20px" >${otp}</div>
    <p>This otp is valid for 1 hour only.</p>
    <br />
    <p>Thanks</p>
    <p>blink-it</p>
    
    </div>
    
    
    
    `

}

export default forgotPasswordTemplate