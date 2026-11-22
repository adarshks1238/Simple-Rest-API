let form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();                          // stop page refresh

    // Step 1: read the form values
    let person = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
        phone: Number(document.getElementById("phone").value)
    };

    // Step 2: convert the object to JSON
    let jsonData = JSON.stringify(person);

    // Step 3: send it to the backend
    // CHANGE 1: relative URL (no http://localhost:8082)
    fetch("/api/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to save person (status " + response.status + ")");
            }
            return response.json();
        })
        .then(data => {
            // Step 4: show confirmation
            document.getElementById("formstatus").textContent =
                "Person saved successfully! Your id is " + data.id;
            form.reset();
        })
        .catch(error => {
            document.getElementById("formstatus").textContent =
                "Error saving person!";
            console.log("Error:", error);
        });
});


//search by email
let btnsubmitemail = document.getElementById("submitemail");

btnsubmitemail.addEventListener("click", function() {
    let email = document.getElementById("searchEmail").value.trim();
    let result = document.getElementById("result");

    // CHANGE 2: relative URL + encodeURIComponent so "+" and "@" are sent safely
    let promise1 = fetch(
        `/api/findbyemail?email=${encodeURIComponent(email)}`
    );

    promise1.then((response) => {

        if (!response.ok) {
            throw new Error("Person not found");
        }

        return response.json();

    })

        .then((data) => {
            result.innerHTML = `
        <h2>Person details</h2>
        <p>ID:${data.id}</p>
        <p>Name:${data.name}</p>
        <p>email:${data.email}</p>
        <p>Phone No:${data.phone}</p>
        <p>Password:${data.password}</p>
        `;

        })

        .catch((error) => {

            result.innerHTML = `<p>${error.message}</p>`;

        });

});


//search By Id
let btnsubmitid = document.getElementById("submitid");

btnsubmitid.addEventListener("click", function() {

    // Get ID from input
    let id = document.getElementById("searchId").value;

    // CHANGE 3: write into "result" (not "result-panel") so the output div is not destroyed
    let result = document.getElementById("result");

    // Fetch data from API
    // CHANGE 4: relative URL
    let promise1 = fetch(`/api/findbyid?id=${id}`);

    promise1.then((response) => {

        if (!response.ok) {
            throw new Error("Person not found");
        }

        return response.json();

    })

        .then((data) => {
            result.innerHTML = `
        <h2>Person details</h2>
        <p>ID:${data.id}</p>
        <p>Name:${data.name}</p>
        <p>email:${data.email}</p>
        <p>Phone No:${data.phone}</p>
        <p>Password:${data.password}</p>
        `;

        })

        .catch((error) => {

            result.innerHTML = `<p>${error.message}</p>`;

        });

});