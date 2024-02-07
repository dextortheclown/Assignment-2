document.addEventListener("DOMContentLoaded", function () {
    var infoButtons = document.querySelectorAll('.info-button');
    var modal = document.getElementById('myModal');
    var modalTitle = document.getElementById('modalTitle');
    var modalDescription = document.getElementById('modalDescription');
    var closeButton = document.getElementsByClassName('close')[0];

    infoButtons.forEach(function(button) {
        button.onclick = function() {
            modalTitle.textContent = this.getAttribute('data-title');
            modalDescription.textContent = this.getAttribute('data-description');
            modal.style.display = "block";
        };
    });

    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});