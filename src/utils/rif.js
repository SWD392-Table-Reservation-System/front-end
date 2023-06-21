export function rif(exp, template, elseTemplate = null) {
    if (exp) {
        return template;
    } else {
        return elseTemplate;
    }
}