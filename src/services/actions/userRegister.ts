"use server";

export const registerPatient = async (formData: FormData) => {
  const res = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    body: formData,
    cache: "no-store",
  });
  const patientInfo = await res.json();
  return patientInfo;
};
