let submitButton = document.getElementById("submitButton")
function createLink(){
    console.log("CLick")
    const formData = new FormData(document.querySelector('form'))

    fetch('/api/new', {
        method: 'post',
        body: formData,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            // 'enctype': 'multipart/form-data'
        },
    })
    .then(res=>{
        console.log(res)
    });

    for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    // document.testForm.submit()
    // const testform = document.getElementById("testForm")
    // console.log(testform)
}

submitButton.addEventListener('click', createLink)

