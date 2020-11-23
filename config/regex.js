module.exports={
    checkText:(text)=>{
        let textFormat=text.trim();
        return textFormat;
    },
     validateEmail:(email)=> {
        const re = /^([A-z0-9]|[\.\_])+\@(([A-z]{2,3})|([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
        return re.test(String(email).toLowerCase());
    }
}