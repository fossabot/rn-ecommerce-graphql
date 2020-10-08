export default class M2ApiResponseError extends Error {
  constructor({
    method,
    resourceUrl,
    response,
    bodyText
  }, ...args) {
    let body = "";
    let parsedBodyText;

    try {
      parsedBodyText = JSON.parse(bodyText);
      const {
        message,
        trace,
        ...rest
      } = parsedBodyText;

      if (message) {
        body += "Message:\n\n  ".concat(message, "\n");
      }

      const addl = Object.entries(rest);

      if (addl.length > 0) {
        body += "\nAdditional info:\n\n".concat(JSON.stringify(rest, null, 4), "\n\n");
      }

      if (trace) {
        body += "Magento PHP stack trace: \n\n".concat(trace);
      }

      body += '\n';
    } catch (e) {
      body = bodyText;
    }

    super("".concat(method, " ").concat(resourceUrl, " responded ").concat(response.status, " ").concat(response.statusText, ": \n\n").concat(body), ...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, M2ApiResponseError);
    }

    this.response = response;
    this.method = method;
    this.resourceUrl = resourceUrl; // Preserve the original error message.

    this.baseMessage = parsedBodyText ? parsedBodyText.message : bodyText;
  }

}
//# sourceMappingURL=M2ApiResponseError.js.map