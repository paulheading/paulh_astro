import $ from "~scripts/selectors";
import messages from "~data/messages";
import formSuccess from "~scripts/animate/success";

const fetchProps = (formData) => ({
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams(formData).toString(),
});

const inputs = ["subject", "from", "message"];

function createAlert(event) {
  if (event.target) event = event.target;

  const { id, validity } = event;
  const { valid, valueMissing, typeMismatch, tooShort } = validity;
  const alert = event.nextElementSibling;

  if (valid) {
    alert.removeAttribute("style");
    alert.innerText = "";
    return;
  }

  alert.setAttribute("style", "display:block:");

  if (valueMissing) alert.innerText = messages[id].valueMissing;
  if (typeMismatch) alert.innerText = messages[id].typeMismatch;
  if (tooShort) alert.innerText = messages[id].tooShort;
}

function listenForInput(input) {
  const element = $.contact_form.querySelector("#" + input);
  element.addEventListener("input", createAlert);
}

inputs.forEach(listenForInput);

$.contact_form.onsubmit = function (event) {
  event.preventDefault();

  let errors = false;

  inputs.forEach((input) => {
    const element = $.contact_form.querySelector("#" + input);
    const { valid } = element.validity;

    if (valid) return;

    errors = true;
    createAlert(element);
  });

  if (errors) return;

  const form = event.target;
  const formData = new FormData(form);

  fetch("/", fetchProps(formData))
    .then(formSuccess)
    .catch((error) => alert(error));
};
