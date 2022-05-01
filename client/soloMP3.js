function main(){
    list_link = document.getElementById('list_link')
    submit = document.getElementById('submit')
    submit.addEventListener('click', ()=>{
        let data = {link: list_link.value};
        waitPop(true);
        fetch("./solomp3/download", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
            if (data.error!='no error'){
                alert(data.error)
            } else{
                waitPop(false);
                window.open(`./solomp3/download/${data.vidName}`);
                let removeData = {remove: data.vidName};
                fetch("./solomp3/remove", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify(removeData)
                })
            }
        })
    });
}

function waitPop(open){
    let waitPop = document.getElementById('waitPop')
    if (open){
        waitPop.style.display = "block";
    }else{
        waitPop.style.display = "none";
    }
}


window.onload = () =>{
    main();
}