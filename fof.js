
      function allowDrop(event) {
        event.preventDefault();
      }

      function drag(event) {
        event.dataTransfer.setData("text", event.target.outerHTML);
      }

      function drop(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        var secondFrameContent = document.getElementById("secondFrameContent");
        if (!secondFrameContent.contains(event.target)) {
          secondFrameContent.innerHTML += data;
        }
      }

      function toggleEdit() {
        var elementsToEdit = document.querySelectorAll(
          '#frame2 *[contenteditable="true"], #frame2 *[draggable="true"]'
        );
        elementsToEdit.forEach(function (element) {
          element.toggleAttribute("contenteditable");
          element.toggleAttribute("draggable");
        });

        var secondFrameContent = document.getElementById("secondFrameContent");
        secondFrameContent.contentEditable =
          secondFrameContent.contentEditable === "true" ? "false" : "true"; 

        var uploadButton = document.getElementById("uploadButton");
        var mainImgUploadButton = document.getElementById(
          "mainImgUploadButton"
        );
        var editButton = document.querySelector(".pagebtn button:nth-child(2)");

        if (editButton.textContent === "Edit") {
          uploadButton.style.display = "block";
          mainImgUploadButton.style.display = "block";
        } else {
          uploadButton.style.display = "none";
          mainImgUploadButton.style.display = "none";
        }
      }

      function handleImageUpload(event) {
        alert("shdf");
        var frame2 = document.getElementById("frame2");
        var img = frame2.querySelector("img");
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
          img.src = e.target.result;
        };

        reader.readAsDataURL(file);
      }

      function handleMainImageUpload(event) {
        // alert("didsh");
        var frame2 = document.getElementById("frame2");
        var mainImg = frame2.querySelector("#mainImg");
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
          mainImg.src = e.target.result;
        };

        reader.readAsDataURL(file);
      }

      function printKarwade() {
        const frame2Content = document.getElementById("frame2").innerHTML;

        // Create a container for the print content
        const printContainer = document.createElement("div");
        printContainer.innerHTML = frame2Content;

        // Hide elements not intended for printing
        const uploadButtons = printContainer.querySelectorAll(
          ".upload-button, .upload-button1"
        );
        uploadButtons.forEach(function (button) {
          button.style.display = "none";
        });

        // Print only the content of frame2
        const printContent = printContainer.innerHTML;

        // Replace the current page content with frame2 content and print it
        const origCont = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = origCont;
      }
