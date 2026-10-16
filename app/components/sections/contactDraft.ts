interface ContactDraft {
  recipient: string;
  subjectPrefix: string;
  name: string;
  replyTo: string;
  message: string;
}

export function createContactDraft({ recipient, subjectPrefix, name, replyTo, message }: ContactDraft): string {
  const subject = subjectPrefix + " — " + name.replace(/[\r\n]+/g, " ");
  const body = message + "\r\n\r\n" + name + "\r\n" + replyTo;
  return "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}
