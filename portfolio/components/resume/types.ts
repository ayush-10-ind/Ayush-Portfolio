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
  category: string;
  number: string;
  tagline: string;
}

export const RESUME_SECTIONS: ResumeSectionMeta[] = [
  {
    id: "identity",
    title: "Identity & Focus",
    category: "01 / OVERVIEW",
    number: "01",
    tagline: "Software Engineer & CS Student at NIET Gr. Noida",
  },
  {
    id: "education",
    title: "Education & Academics",
    category: "02 / ACADEMICS",
    number: "02",
    tagline: "B.Tech CSE (8.4 CGPA) & Intermediate Education",
  },
  {
    id: "experience",
    title: "Industry Experience",
    category: "03 / INTERNSHIP",
    number: "03",
    tagline: "Python Developer Intern @ AICTE Code Technologies",
  },
  {
    id: "skills",
    title: "Technical Stack",
    category: "04 / COMPETENCIES",
    number: "04",
    tagline: "Java, Python, React.js, Oracle DBMS, Git & DSA",
  },
  {
    id: "certifications",
    title: "Certifications",
    category: "05 / CREDENTIALS",
    number: "05",
    tagline: "AICTE Python Developer & Infosys Certifications",
  },
  {
    id: "extracurricular",
    title: "Athletics & Problem Solving",
    category: "06 / DISCIPLINE",
    number: "06",
    tagline: "Football Player & Competitive Programmer (LeetCode)",
  },
];