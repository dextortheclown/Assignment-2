document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65c26c4e71a4880c588b0be0";

  document.getElementById("add-contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const contactName = document.getElementById("contact-name").value;
    const contactOutlet = document.getElementById("contact-outlet").value;
    const contactMessage = document.getElementById("contact-msg").value;

    const jsondata = {
      "name": contactName,
      "outlet": contactOutlet,
      "message": contactMessage
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY
      },
      body: JSON.stringify(jsondata)
    };

    fetch("https://fedreview-f6cd.restdb.io/rest/review", settings)
      .then(response => {
        if (!response.ok) { throw new Error(`Error: ${response.statusText}`); }
        return response.json();
      })
      .then(data => {
        console.log("Data submitted:", data);
        document.getElementById("add-contact-form").reset();
        getContacts();
        // Optionally show a success message
        document.getElementById("add-update-msg").style.display = "block";
        setTimeout(() => {
          document.getElementById("add-update-msg").style.display = "none";
        }, 3000);
      })
      .catch(error => {
        console.error('Error during the fetch operation:', error);
      });
  });

  function getContacts(limit = 10, all = true) {
    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY
      }
    };

    fetch("https://fedreview-f6cd.restdb.io/rest/review", settings)
      .then(response => {
        if (!response.ok) { throw new Error(`Error: ${response.statusText}`); }
        return response.json();
      })
      .then(data => {
        let content = "";
        data.forEach((item, index) => {
          if (index < limit) {
            content += `<tr id='${item._id}'>
              <td>${item.name}</td>
              <td>${item.outlet}</td>
              <td>${item.message}</td>
            </tr>`;
          }
        });
        document.getElementById("contact-list").getElementsByTagName("tbody")[0].innerHTML = content;
        document.getElementById("total-contacts").textContent = data.length;
      })
      .catch(error => {
        console.error('Error during the fetch operation:', error);
      });
  }

  // Call getContacts on load
  getContacts();
});
