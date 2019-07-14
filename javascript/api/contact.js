export const sendContactForm = async (contactData) => {
  const response = await fetch(
    '/api/contact',
    {
      method: 'POST',
      body: JSON.stringify(contactData)
    }
  );

  if (!response.ok || response.status >= 300) {
    throw new Error(`Error sending contact form (status code ${
      response.status
    }): ${response.statusText}`);
  }
};
