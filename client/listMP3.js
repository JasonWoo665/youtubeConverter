function main(){
    list_link = document.getElementById('list_link')
    submit = document.getElementById('submit')
    submit.addEventListener('click', ()=>{
        let data = {link: list_link.value};
        console.log('sent', list_link.value)
        console.log('fuck you')
        fetch("./listmp3/download", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
            if (data.error!='no error'){
                alert(data.error)
            } else{
                console.log('complete')
            }
        })
    });
}

window.onload = () =>{
    main();
}