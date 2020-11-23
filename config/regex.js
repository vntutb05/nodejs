module.exports={
    checkText:(text)=>{
        let textFormat=text.trim();
        return textFormat;
    },
     validateEmail:(email)=> {
        const re = /^([A-z0-9]|[\.\_])+\@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3})$/;
        return re.test(String(email).toLowerCase());
    }
}