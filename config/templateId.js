export function sendGridTemplate(templateName) {
    const foundTemplateId = { test_service: "d-2a2b67294ae64a8d92164d51dbf8bd26" }[templateName] || null

    return foundTemplateId || console.log(`Cannot find template id with keyname : ${templateName}`)
}