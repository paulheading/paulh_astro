const messages = {};

messages.subject = {
  valueMissing: "Please add an email subject.",
};

messages.from = {
  valueMissing: `Please add your email address.`,
  typeMismatch: `This doesn't look like an email address.`,
  tooShort: `Just a few more letters please.`,
};

messages.message = {
  valueMissing: `Don't forget your message!`,
};

export default messages;
