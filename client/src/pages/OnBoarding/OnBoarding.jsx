import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./OnBoarding.css";
import Navbar from "../../components/Navbar/Navbar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pills from "./Pills";

const OnBoarding = () => {
  const skills = [
    { id: 1, name: "Good Communication" },
    { id: 2, name: "Leadership" },
    { id: 3, name: "Teamwork" },
    { id: 4, name: "Adaptability" },
    { id: 5, name: "Decision-Making" },
    { id: 6, name: "Presentation" },
    { id: 7, name: "Java Programming" },
    { id: 8, name: "Python Programming" },
    { id: 9, name: "C++ Programming" },
    { id: 10, name: "JavaScript" },
    { id: 11, name: "HTML/CSS" },
    { id: 12, name: "React.js Framework" },
    { id: 13, name: "Angular Framework" },
    { id: 14, name: "Vue.js Framework" },
    { id: 15, name: "Node.js Development" },
    { id: 16, name: "PHP Development" },
    { id: 17, name: "Ruby on Rails" },
    { id: 18, name: "ASP.NET Development" },
    { id: 19, name: "Swift Programming" },
    { id: 20, name: "Kotlin Programming" },
    { id: 21, name: "Android Development" },
    { id: 22, name: "iOS Development" },
    { id: 23, name: "Unity Game Development" },
    { id: 24, name: "Unreal Engine Development" },
    { id: 25, name: "Git Version Control" },
    { id: 26, name: "Docker" },
    { id: 27, name: "Kubernetes" },
    { id: 28, name: "AWS Cloud Services" },
    { id: 29, name: "Azure Cloud Services" },
    { id: 30, name: "Google Cloud Platform" },
    { id: 31, name: "Machine Learning" },
    { id: 32, name: "Deep Learning" },
    { id: 33, name: "Artificial Intelligence" },
    { id: 34, name: "NLP" },
    { id: 35, name: "Computer Vision" },
    { id: 36, name: "Hadoop, Spark" },
    { id: 37, name: "Data Engineering" },
    { id: 38, name: "Data Warehousing" },
    { id: 39, name: "Data Mining" },
    { id: 40, name: "Tableau, Power BI" },
    { id: 41, name: "AWS, Microsoft Azure, Google Cloud" },
    { id: 42, name: "DevOps Practices" },
    { id: 43, name: "CI/CD" },
    { id: 44, name: "Containerization" },
    { id: 45, name: "Microservices Architecture" },
    { id: 46, name: "Serverless Computing" },
    { id: 47, name: "Blockchain Development" },
    { id: 48, name: "Smart Contract Development" },
    { id: 49, name: "Cybersecurity" },
    { id: 50, name: "Network Administration" },
    { id: 51, name: "Time Management" },
    { id: 52, name: "Problem Solving" },
    { id: 53, name: "Creativity" },
    { id: 54, name: "Critical Thinking" },
    { id: 55, name: "Attention to Detail" },
    { id: 56, name: "Emotional Intelligence" },
    { id: 57, name: "Redis" },
    { id: 58, name: "Conflict Resolution" },
    { id: 59, name: "Monorepo" },
    { id: 60, name: "Networking" },
    { id: 61, name: "Public Speaking" },
    { id: 62, name: "Vercel/AWS Deployment" },
    { id: 63, name: "Business Acumen" },
    { id: 64, name: "Financial Literacy" },
    { id: 65, name: "NGNIX" },
    { id: 66, name: "Sales Skills" },
    { id: 67, name: "Marketing Skills" },
    { id: 68, name: "Project Management" },
    { id: 69, name: "Time Management" },
    { id: 70, name: "Solana" },
    { id: 71, name: "Leadership Development" },
    { id: 72, name: "Team Management" },
    { id: 73, name: "Conflict Management" },
    { id: 74, name: "Mentoring" },
    { id: 75, name: "Coaching" },
    { id: 76, name: "Delegation" },
    { id: 77, name: "Risk Management" },
    { id: 78, name: "Strategic Planning" },
    { id: 79, name: "Decision-Making" },
    { id: 80, name: "Problem-Solving" },
    { id: 81, name: "Analytical Skills" },
    { id: 82, name: "Research Skills" },
    { id: 83, name: "Data Analysis" },
    { id: 84, name: "Statistical Analysis" },
    { id: 85, name: "Market Research" },
    { id: 86, name: "UX Design" },
    { id: 87, name: "UI Design" },
    { id: 88, name: "Graphic Design" },
    { id: 89, name: "Video Editing" },
    { id: 90, name: "Photography" },
    { id: 91, name: "Content Writing" },
    { id: 92, name: "Copywriting" },
    { id: 93, name: "Editing" },
    { id: 94, name: "MERN Stack" },
    { id: 95, name: "Social Media Management" },
    { id: 96, name: "SEO" },
    { id: 97, name: "Email Marketing" },
    { id: 98, name: "Content Marketing" },
    { id: 99, name: "Digital Marketing" },
    { id: 100, name: "Brand Management" },
    { id: 101, name: "AR Development" },
    { id: 102, name: "VR Development" },
    { id: 103, name: "MR Development" },
    { id: 104, name: "Unity, Unreal Engine" },
    { id: 105, name: "3D Animation" },
    { id: 106, name: "Character Animation" },
    { id: 107, name: "Motion Capture Technology" },
    { id: 108, name: "Virtual Set Design" },
    { id: 109, name: "3D Printing Technology" },
    { id: 110, name: "Computer-Aided Engineering" },
    { id: 111, name: "Computer-Aided Manufacturing" },
    { id: 112, name: "Product Lifecycle Management" },
    { id: 113, name: "MEAN Stack" },
    { id: 114, name: "Computational Fluid Dynamics" },
    { id: 115, name: "Simulation Modeling" },
    { id: 116, name: "Quantum Programming Languages" },
    { id: 117, name: "Quantum Circuit Design" },
    { id: 118, name: "SQL" },
    { id: 119, name: "Quantum Cryptography" },
    { id: 120, name: "Additive Manufacturing" },
    { id: 121, name: "3D Scanning Technology" },
    { id: 122, name: "Laser Cutting and Engraving" },
    { id: 123, name: "MongoDB" },
    { id: 124, name: "Robot Operating System" },
    { id: 125, name: "Computer Vision in Robotics" },
    { id: 126, name: "Human-Robot Interaction" },
    { id: 127, name: "Autonomous Navigation Systems" },
    { id: 128, name: "AI in Robotics" },
    { id: 129, name: "SLAM" },
    { id: 130, name: "Web3" },
    { id: 131, name: "AR/VR Content Creation" },
    { id: 132, name: "Game Design Principles" },
    { id: 133, name: "Game Mechanics" },
    { id: 134, name: "System Design" },
    { id: 135, name: "Gameplay Programming" },
    { id: 136, name: "Solidity" },
    { id: 137, name: "Game Engine Optimization" },
    { id: 138, name: "Network Programming for Games" },
    { id: 139, name: "Character AI" },
    { id: 140, name: "Game Asset Creation" },
    { id: 141, name: "Next.js" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkillsSet, setSelectedSkillsSet] = useState(new Set());
  const inputRef = useRef(null);
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredSkills = skills.filter((skill) =>
        skill.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSkills);
    }
  };

  const handleSelectSkills = (skill) => {
    if (!selectedSkillsSet.has(skill.name)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSelectedSkillsSet(new Set([...selectedSkillsSet, skill.name]));
    } else {
      const updatedSelectedSkills = selectedSkills.filter(
        (selectedSkill) => selectedSkill.name !== skill.name
      );
      setSelectedSkills(updatedSelectedSkills);
      setSelectedSkillsSet(new Set(updatedSelectedSkills.map((s) => s.name)));
    }
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = selectedSkills.filter(
      (selectedSkill) => selectedSkill.name !== skill.name
    );
    setSelectedSkills(updatedSkills);

    const updatedIds = new Set(selectedSkillsSet);
    updatedIds.delete(skill.name);
    setSelectedSkillsSet(updatedIds);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedSkills.length > 0
    ) {
      const lastSkill = selectedSkills[selectedSkills.length - 1];
      handleRemoveSkill(lastSkill);
      setSuggestions([]);
    }
  };

  //  const handlePhotoChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setFormData((prevState) => ({
  //           ...prevState,
  //           profile_photo: reader.result,
  //         }));
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  const [cookies, setCookie, removeCookie] = useCookies("[user]");
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gender_identity: "man",
    url: "",
    //profile_photo: "",
    git_url: "",
    linkedin_url: "",
    department: "",
    class: "",
    look_for: "",
    about: "",
    matches: [],
    selectedSkillsSet: [],
  });

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      skills: selectedSkills,
      selectedSkillsSet: [...selectedSkillsSet],
    }; // Include selectedSkillsSet in formData
    try {
      const response = await axios.put(
        "http://localhost:8000/user",
        updatedFormData
      ); // Send updatedFormData to backend
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required={true}
              value={formData.email}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="department">Department</label>
            <select
              className="drop_down department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="none">Select</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Robotics and Automation">
                Robotics and Automation
              </option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Electronics and Telecommunication Engineering">
                Electronics and Telecommunication Engineering
              </option>
              <option value="Master of Computer Applications (MCA)">
                Master of Computer Applications (MCA)
              </option>
              <option value="Computer Science and Design">
                Computer Science and Design
              </option>
            </select>

            <label htmlFor="class">Class</label>
            <select
              className="drop_down class"
              name="class"
              value={formData.class}
              onChange={handleChange}
            >
              <option value="none">Select</option>
              <option value="fe">First Year (FE)</option>
              <option value="se">Second Year (SE)</option>
              <option value="te">Third Year (TE)</option>
              <option value="be">Final Year (BE)</option>
            </select>

            <label htmlFor="looking_for">Looking For</label>
            <select
              className="drop_down look_for"
              name="look_for"
              value={formData.look_for}
              onChange={handleChange}
            >
              <option value="none">Select</option>
              <option value="Project Partners">Project Partners</option>
              <option value="Networking">Networking</option>
              <option value="Hackathon Teammates">Hackathon Teammates</option>
              <option value="Event Collaboration">Event Collaboration</option>
              <option value="Leadership Opportunities ">
                Leadership Opportunities
              </option>
              <option value="Volunteer Opportunities">
                Volunteer Opportunities
              </option>
            </select>

            <label htmlFor="git_url">GitHub link</label>
            <input
              type="url"
              name="git_url"
              id="git_url"
              onChange={handleChange}
              value={formData.git_url}
              required={true}
            />
            <label htmlFor="linkedin_url">LinkedIn link</label>
            <input
              type="url"
              name="linkedin_url"
              id="linkedin_url"
              onChange={handleChange}
              value={formData.linkedin_url}
              required={true}
            />
          </section>
          <section>
            <label htmlFor="skills">Skills</label>
            <div className="skill-search-container">
              <div className="skill-search-input">
                {selectedSkills.map((skill) => {
                  return (
                    <Pills
                      key={skill.id}
                      text={`${skill.name}`}
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  );
                })}

                <div className="input-field">
                  <input
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    id="skills"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Enter Skills here"
                  />
                  <ul className="suggestion_list">
                    {suggestions.map(
                      (skill, index) =>
                        !selectedSkillsSet.has(skill.id) && ( // Corrected syntax here
                          <li
                            key={index}
                            onClick={() => handleSelectSkills(skill)}
                            className={
                              selectedSkillsSet.has(skill.id) ? "selected" : ""
                            }
                          >
                            {skill.name}
                          </li>
                        ) // Added closing parentheses for map function
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <label htmlFor="about">About me</label>
            <textarea
              rows="6"
              cols="8"
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I am a front-end developer."
              value={formData.about}
              onChange={handleChange}
            />

            <label htmlFor="about">Profile </label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="Profile Pic Preview" />
              )}
            </div>

            <input type="submit" />
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
