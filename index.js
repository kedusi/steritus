const getTable = () => {
    fetch('http://localhost:5000/sterilizers')
        .then(data => data.json())
        .then(res => {
            res.forEach(element => {
                buildDataRow(element)
                })
            })
        .catch(err => console.log(err))
}

const buildDataRow = element => {
    let newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td id="name_label_${element._id}">${element.name}</td>
        <td>
            <span id='status_label_${element._id}'>${element.status}</span>
            <small><a onClick="toggleForm('${element._id}')"> change</a></small>
            
            <span id='status_form_${element._id}' hidden>
                <form action="javascript:void(0)" onsubmit="updateUnit(new FormData(this), '${element._id}')">
                    <input type="radio" name="status" value="available"><label for="available">available</label><br />
                    <input type="radio" name="status" value="in cycle"><label for="in cycle">in cycle</label><br />
                    <input type="radio" name="status" value="out of service"><label for="out of service">out of service</label>
                    <label for="message">New Message</label><br>
                    <input type="text" name="message">
                    <button type="submit">Update</button>
                    <button onclick="toggleForm('${element._id}')">Cancel</button>
                </form>
            </span>
        </td>
        <td id="message_label_${element._id}">${element.message}</td>
    `
    document.querySelector("#sterilizer_table_data").appendChild(newRow)
}

const toggleForm = id => {
    document.querySelector(`#status_form_${id}`).hidden = !document.querySelector(`#status_form_${id}`).hidden
    document.querySelector(`#status_label_${id}`).hidden = !document.querySelector(`#status_label_${id}`).hidden
}

const updateUnit = (formData, id) => {
    // fetch(`http://localhost:5000/sterilizers/${id}`, {method: 'PUT', body: formData})
    //     .then(data => data.json())
    //     .then(result => console.log(result))
    //     .catch(err => console.log(err))

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("status", formData.get('status'));
    urlencoded.append("message", formData.get('message'));
    
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };
    
    fetch(`http://localhost:5000/sterilizers/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            ['message', 'status'].forEach(el => {
                document.getElementById(`${el}_label_${result._id}`).innerHTML = result[el]
            })
            toggleForm(id)
        })
        .catch(error => console.log('error', error));

    // console.log(formData.get('status'))
}