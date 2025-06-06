// src/app/actions.js
'use server'; // This directive marks all functions in this file as Server Actions

import { revalidatePath } from 'next/cache';

// Define the Getform.io endpoint for your demo requests.
// IMPORTANT: Replace 'YOUR_GETFORM_DEMO_ENDPOINT' with your actual Getform.io endpoint for the demo form.
const GETFORM_DEMO_ENDPOINT = process.env.GETFORM_DEMO_ENDPOINT || "https://getform.io/f/YOUR_GETFORM_DEMO_ENDPOINT";

export async function submitDemoRequest(prevState, formData) { // prevState will be null in this setup
  const name = formData.get('name');
  const email = formData.get('email');
  const mobile = formData.get('mobile');
  const project = formData.get('project');
  const message = formData.get('message');

  // Basic validation (enhance this with a library like Zod)
  if (!name || !email || !mobile || !project || !message) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  const payload = {
    name,
    email,
    mobile,
    project,
    message,
  };

  try {
    const response = await fetch(GETFORM_DEMO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // revalidatePath('/some-path-if-needed');
      return {
        success: true,
        message: "Your demo request has been sent successfully!",
      };
    } else {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error from Getform.io' }));
      console.error("Getform.io submission error:", errorData);
      return {
        success: false,
        message: errorData.message || "Failed to send demo request. Please check your Getform.io endpoint.",
      };
    }
  } catch (error) {
    console.error("Server Action error during Getform.io submission:", error);
    return {
      success: false,
      message: "An unexpected network error occurred. Please try again later.",
    };
  }
}