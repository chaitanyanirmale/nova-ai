const generateRoadmap = async (goal) => {
  const roadmap = {
    title: `${goal.title} Roadmap`,

    summary: `A structured roadmap to help you achieve your goal: ${goal.title}.`,

    steps: [
      {
        title: "Understand the Fundamentals",
        description:
          "Learn the basic concepts and fundamentals required for this goal.",
        order: 1,
        completed: false,
      },
      {
        title: "Learn the Core Skills",
        description:
          "Develop the core technical skills required to make progress toward your goal.",
        order: 2,
        completed: false,
      },
      {
        title: "Build Practical Projects",
        description:
          "Apply your knowledge by building real-world projects.",
        order: 3,
        completed: false,
      },
      {
        title: "Practice and Improve",
        description:
          "Practice regularly, solve problems, and identify areas for improvement.",
        order: 4,
        completed: false,
      },
      {
        title: "Build a Portfolio",
        description:
          "Create a strong portfolio that demonstrates your skills and projects.",
        order: 5,
        completed: false,
      },
      {
        title: "Prepare for Opportunities",
        description:
          "Prepare your resume, interview skills, and practical knowledge.",
        order: 6,
        completed: false,
      },
    ],
  };

  return roadmap;
};


export default generateRoadmap