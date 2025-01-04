const verifyEmailTemplate = ({name, url}) => {
    return `
    <p>${name}</p>
    <p>Thank You for registering. </p>

    <a href=${url} style="color:white; background:blue; margin-top:10px; ">
    Verify Email
    </a>
    `

}
export default verifyEmailTemplate
