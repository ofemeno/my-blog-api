// function to conver title to url
export function postUrlmaker(text) {
  const slug = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\W_]+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");

  const randomNumber = Math.floor(Math.random() * 10000);

  return `${slug}-${randomNumber}`;
}
