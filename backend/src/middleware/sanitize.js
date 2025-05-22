import mongoSanitize from 'express-mongo-sanitize';

export const sanitizeData = mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`This request[${key}] is sanitized`, req.originalUrl);
  }
});