export type ResumeSectionId =
  | "identity"
  | "education"
  | "experience"
  | "skills"
  | "certifications"
  | "extracurricular";

export interface ResumeSectionMeta {
  id: ResumeSectionId;
  title: string;
  number: string;
}

export const RESUME_SECTIONS: ResumeSectionMeta[] = [
  { id: "identity", title: "Profile", number: "01" },
  { id: "education", title: "Academics", number: "02" },
  { id: "experience", title: "Internship", number: "03" },
  { id: "skills", title: "Arsenal", number: "04" },
  { id: "certifications", title: "Certifications", number: "05" },
  { id: "extracurricular", title: "Athletics", number: "06" },
];