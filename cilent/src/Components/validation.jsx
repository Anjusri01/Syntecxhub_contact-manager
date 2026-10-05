export default function validation(values) {
    let errors = {}

    const email_pattern= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const password_pattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if(values.name){
    if (!values.name || values.name.trim()==="") {
        errors.name = "Name shouldn't be empty"
    }else if (!/^[A-Za-z]+/.test(values.name)) {
        errors.name = "Name should contain only alphabets"
    }else{
        errors.name="";
    }
    }

     if (!values.email || values.email.trim()==="") {
        errors.email = "Email shouldn't be empty"
    // }else if (!email_pattern.test(values.email)) {
    //     errors.email= "Invalid email format"
    }else{
        errors.email="";
    }
     if (!values.password || values.password.trim()==="") {
         errors.password = "Password shouldn't be empty"
    // }else if (!password_pattern.test(values.password)) {
    //     errors.password = "Password should contain capital letter ,lower letter and numbers"
    }else{
        errors.password="";
    }
    return errors
}
